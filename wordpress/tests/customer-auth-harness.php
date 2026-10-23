<?php
// Isolated PHP unit harness. No database, live credentials, or e-mails are used.
define('ABSPATH', __DIR__);
define('DAY_IN_SECONDS', 86400);
define('MINUTE_IN_SECONDS', 60);
class WP_Error { public $code; function __construct($code = '', $message = '') { $this->code = $code; } }
class WP_User { public $ID = 17; public $user_email = 'customer@example.test'; public $user_login = 'fixture'; public $first_name = 'Sofie'; public $last_name = 'Test'; public $display_name = 'Sofie Test'; }
class Redirected extends Exception {}
class JsonSent extends Exception {}
$hooks = array();
function add_action($name, $callback, $priority = 10) { $GLOBALS['hooks'][$name][] = $callback; }
function add_filter($name, $callback, $priority = 10) { $GLOBALS['hooks'][$name][] = $callback; }
function home_url($path = '') { return 'https://shop.example.test' . $path; }
function add_query_arg($args, $url) { return $url . '?' . http_build_query($args); }
function wp_safe_redirect($url, $status = 302) { $GLOBALS['redirect'] = array($url, $status); throw new Redirected(); }
function wp_parse_url($url, $component = -1) { return parse_url($url, $component); }
function wp_unslash($value) { return stripslashes($value); }
function is_ssl() { return $GLOBALS['ssl']; }
function is_user_logged_in() { return $GLOBALS['signed_in']; }
function wp_create_nonce($action) { return hash('sha256', $action . ':fixture'); }
function wp_verify_nonce($nonce, $action) { return hash_equals(wp_create_nonce($action), $nonce); }
function wp_salt($scheme) { return 'isolated-unit-test-salt'; }
function get_transient($key) { return $GLOBALS['transients'][$key] ?? false; }
function set_transient($key, $value, $duration) { $GLOBALS['transients'][$key] = $value; }
function sanitize_email($value) { return trim($value); }
function is_email($value) { return filter_var($value, FILTER_VALIDATE_EMAIL); }
function sanitize_text_field($value) { return trim(strip_tags($value)); }
function is_wp_error($value) { return $value instanceof WP_Error; }
function wp_signon($credentials, $secure) { $GLOBALS['signon'] = array($credentials, $secure); return new WP_User(); }
function wp_generate_password($length, $special = true, $extra = false) { return str_repeat('x', $length); }
function email_exists($email) { return $GLOBALS['existing'] ? 17 : false; }
function wp_insert_user($data) { $GLOBALS['insert'] = $data; return 17; }
function get_user_by($field, $value) { return $field === 'id' || $GLOBALS['existing'] ? new WP_User() : false; }
function get_password_reset_key($user) { return 'fixture-reset-key'; }
function wp_mail($to, $subject, $message) { $GLOBALS['mail'] = array($to, $subject, $message); return $GLOBALS['mail_ok']; }
function check_password_reset_key($key, $login) { return $key === 'fixture-reset-key' && $login === 'fixture' ? new WP_User() : new WP_Error('invalid_key'); }
function reset_password($user, $password) { $GLOBALS['reset'] = array($user->ID, $password); }
function delete_user_meta($id, $key) { $GLOBALS['deleted_meta'] = array($id, $key); }
function get_user_meta($id, $key, $single) { return $GLOBALS['pending']; }
function user_can($user, $capability) { return $GLOBALS['staff']; }
function wp_logout() { $GLOBALS['logout'] = true; }
function wp_get_current_user() { return new WP_User(); }
function nocache_headers() {}
function untrailingslashit($value) { return rtrim($value, '/'); }
function wp_send_json_success($data) { $GLOBALS['json'] = $data; throw new JsonSent(); }
require __DIR__ . '/../theme/jds-studio/inc/customer-auth.php';

function fresh() {
    $_SERVER = array('REQUEST_METHOD' => 'POST', 'REMOTE_ADDR' => '192.0.2.10', 'HTTP_ORIGIN' => home_url());
    $_COOKIE = array('__Host-jds_customer_form' => str_repeat('a', 64));
    $_POST = array('email' => 'customer@example.test', 'first_name' => 'Sofie', 'last_name' => 'Test', 'password' => 'fixture-password', 'remember' => '1');
    $GLOBALS['ssl'] = true; $GLOBALS['signed_in'] = false; $GLOBALS['existing'] = false; $GLOBALS['pending'] = false; $GLOBALS['mail_ok'] = true; $GLOBALS['staff'] = false;
    foreach (array('redirect', 'json', 'signon', 'insert', 'mail', 'reset', 'deleted_meta', 'logout') as $key) unset($GLOBALS[$key]);
    $GLOBALS['transients'] = array();
    $_POST['jds_nonce'] = wp_create_nonce(jds_customer_nonce_action());
}
function run_action($action) { try { call_user_func('jds_customer_' . $action); } catch (Redirected $e) {} catch (JsonSent $e) {} }
function check($condition, $message) { if (!$condition) throw new Exception($message); }
function status_message() { parse_str(parse_url($GLOBALS['redirect'][0], PHP_URL_QUERY) ?? '', $q); return $q['message'] ?? ''; }
$passed = array();
function scenario($name, $callback) { fresh(); $callback(); $GLOBALS['passed'][] = $name; }

scenario('native secure sign-in and persistent remember option', function () {
    run_action('login');
    check($GLOBALS['signon'][0]['remember'] === true && $GLOBALS['signon'][1] === true, 'Sign-in must use native secure cookies with persistence');
    check(status_message() === 'welcome' && $GLOBALS['redirect'][1] === 303, 'Sign-in must return to account with a POST-safe redirect');
});
scenario('session-only option is respected', function () { unset($_POST['remember']); run_action('login'); check($GLOBALS['signon'][0]['remember'] === false, 'Unchecked remember must not persist'); });
scenario('staff cannot bypass their admin sign-in through the customer form', function () { $GLOBALS['existing'] = true; $GLOBALS['staff'] = true; run_action('login'); check(!isset($GLOBALS['signon']) && status_message() === 'invalid-login', 'Staff allowed through customer login'); });
scenario('foreign-origin login is rejected before authentication', function () { $_SERVER['HTTP_ORIGIN'] = 'https://attacker.invalid'; run_action('login'); check(!isset($GLOBALS['signon']) && status_message() === 'origin-expired', 'Foreign origin accepted'); });
scenario('opaque-origin forms cannot mutate authentication', function () { $_SERVER['HTTP_ORIGIN'] = 'null'; run_action('logout'); check(!isset($GLOBALS['logout']) && status_message() === 'origin-expired', 'Opaque origin accepted'); });
scenario('missing nonce cannot log a user out', function () { unset($_POST['jds_nonce']); run_action('logout'); check(!isset($GLOBALS['logout']), 'Logout CSRF accepted'); });
scenario('nonce from another anonymous browser is rejected', function () { $_COOKIE['__Host-jds_customer_form'] = str_repeat('b', 64); run_action('login'); check(!isset($GLOBALS['signon']), 'Anonymous nonce was reusable'); });
scenario('GET cannot mutate authentication', function () { $_SERVER['REQUEST_METHOD'] = 'GET'; run_action('login'); check(!isset($GLOBALS['signon']), 'GET sign-in accepted'); });
scenario('non-HTTPS credentials are rejected', function () { $GLOBALS['ssl'] = false; run_action('login'); check(!isset($GLOBALS['signon']), 'Insecure sign-in accepted'); });
scenario('registration ignores privileged roles and supplied passwords', function () {
    $_POST['role'] = 'administrator'; $_POST['user_pass'] = 'attacker-selected'; run_action('register');
    check($GLOBALS['insert']['role'] === 'subscriber', 'Privilege escalation in registration');
    check($GLOBALS['insert']['user_pass'] !== $_POST['user_pass'] && $GLOBALS['insert']['meta_input']['jds_customer_pending'] === 1, 'Unverified credentials activated');
    check(!isset($GLOBALS['signon']) && str_contains($GLOBALS['mail'][2], home_url('/compte')), 'Unverified user signed in or link left site');
});
scenario('existing address registration does not overwrite profile or password', function () { $GLOBALS['existing'] = true; run_action('register'); check(!isset($GLOBALS['insert']) && status_message() === 'email-sent', 'Existing account overwritten or enumerated'); });
scenario('invalid fields cannot create a customer', function () { $_POST['email'] = 'not-an-email'; run_action('register'); check(!isset($GLOBALS['insert']), 'Invalid registration accepted'); });
scenario('forgotten-password response does not reveal address existence', function () { run_action('forgot'); $missing = status_message(); fresh(); $GLOBALS['existing'] = true; run_action('forgot'); check($missing === status_message(), 'Recovery reveals address existence'); });
scenario('mail transport failures are surfaced honestly', function () { $GLOBALS['mail_ok'] = false; run_action('register'); check(status_message() === 'mail-failed', 'Mail failure reported as success'); });
scenario('invalid reset key never changes credentials', function () { $_POST['key'] = 'wrong'; $_POST['login'] = 'fixture'; run_action('reset'); check(!isset($GLOBALS['reset']) && status_message() === 'expired-link', 'Invalid key accepted'); });
scenario('short and mismatched reset passwords are rejected', function () { $_POST['key'] = 'fixture-reset-key'; $_POST['login'] = 'fixture'; $_POST['password'] = 'short'; $_POST['password_confirm'] = 'different'; run_action('reset'); check(!isset($GLOBALS['reset']) && status_message() === 'invalid-password', 'Invalid password accepted'); });
scenario('verified password setup uses WordPress reset and clears pending state', function () { $_POST['key'] = 'fixture-reset-key'; $_POST['login'] = 'fixture'; $_POST['password_confirm'] = $_POST['password']; run_action('reset'); check(isset($GLOBALS['reset']) && $GLOBALS['deleted_meta'] === array(17, 'jds_customer_pending') && status_message() === 'password-saved', 'Password setup failed'); });
scenario('unverified accounts are blocked by native authentication filter', function () { $GLOBALS['pending'] = true; $filter = $GLOBALS['hooks']['authenticate'][0]; check($filter(new WP_User()) instanceof WP_Error, 'Pending account authentication accepted'); });
scenario('repeated login attempts are throttled', function () { for ($i = 0; $i < 8; $i++) run_action('login'); unset($GLOBALS['signon']); run_action('login'); check(!isset($GLOBALS['signon']) && status_message() === 'rate-limited', 'Rate limit not enforced'); });
scenario('anonymous state never includes a customer profile', function () { run_action('state'); check($GLOBALS['json']['user'] === null && is_string($GLOBALS['json']['csrf']), 'Anonymous profile disclosure'); });
scenario('signed-in state returns only the current customer', function () { $GLOBALS['signed_in'] = true; run_action('state'); check($GLOBALS['json']['user']['email'] === 'customer@example.test' && count($GLOBALS['json']['user']) === 4, 'Incorrect or excessive profile disclosure'); });
echo json_encode(array('passed' => $passed), JSON_PRETTY_PRINT) . "\n";
