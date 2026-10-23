<?php
/** Customer sign-in using WordPress users and native authentication cookies. */
defined('ABSPATH') || exit;

function jds_customer_redirect($message = '', $view = '') {
    $args = array_filter(array('message' => $message, 'view' => $view));
    wp_safe_redirect(add_query_arg($args, home_url('/compte')), 303);
    exit;
}

function jds_customer_guest() {
    $name = '__Host-jds_customer_form';
    $value = $_COOKIE[$name] ?? '';
    if (!is_string($value) || !preg_match('/^[a-f0-9]{64}$/', $value)) {
        $value = bin2hex(random_bytes(32));
        setcookie($name, $value, array(
            'expires' => time() + DAY_IN_SECONDS, 'path' => '/',
            'secure' => true, 'httponly' => true, 'samesite' => 'Lax',
        ));
        $_COOKIE[$name] = $value;
    }
    return $value;
}

function jds_customer_nonce_action() {
    return 'jds_customer_' . (is_user_logged_in() ? 'session' : jds_customer_guest());
}

function jds_customer_guard() {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') jds_customer_redirect('post-required');
    if (!is_ssl()) jds_customer_redirect('https-required');
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '') {
        $expected = wp_parse_url(home_url());
        $actual = wp_parse_url($origin);
        if (!$actual || strtolower($actual['host'] ?? '') !== strtolower($expected['host'] ?? '')
            || ($actual['scheme'] ?? '') !== ($expected['scheme'] ?? '')
            || ($actual['port'] ?? null) !== ($expected['port'] ?? null)) {
            jds_customer_redirect('origin-expired');
        }
    }
    $nonce = $_POST['jds_nonce'] ?? '';
    if (!is_string($nonce) || !wp_verify_nonce(wp_unslash($nonce), jds_customer_nonce_action())) {
        jds_customer_redirect('session-expired');
    }
}

function jds_customer_value($key) {
    $value = $_POST[$key] ?? '';
    return is_string($value) ? wp_unslash($value) : '';
}

function jds_customer_throttle($action, $email = '') {
    // Trust the server's remote address, never a caller-supplied forwarded header.
    $identities = array('ip:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    if ($email !== '') $identities[] = 'email:' . strtolower($email);
    foreach ($identities as $identity) {
        $key = 'jds_auth_' . hash_hmac('sha256', $action . ':' . $identity, wp_salt('auth'));
        $count = (int) get_transient($key);
        if ($count >= ($action === 'login' ? 8 : 4)) jds_customer_redirect('rate-limited');
        set_transient($key, $count + 1, 15 * MINUTE_IN_SECONDS);
    }
}

function jds_customer_state() {
    nocache_headers();
    header('Cache-Control: no-store, private, max-age=0');
    header('Vary: Cookie', false);
    $profile = null;
    if (is_user_logged_in()) {
        $user = wp_get_current_user();
        $profile = array(
            'name' => $user->display_name, 'email' => $user->user_email,
            'firstName' => $user->first_name, 'lastName' => $user->last_name,
        );
    }
    wp_send_json_success(array(
        'csrf' => wp_create_nonce(jds_customer_nonce_action()), 'user' => $profile,
    ));
}
add_action('wp_ajax_jds_customer_state', 'jds_customer_state');
add_action('wp_ajax_nopriv_jds_customer_state', 'jds_customer_state');

function jds_customer_send_password_link($user) {
    $key = get_password_reset_key($user);
    if (is_wp_error($key)) return false;
    $url = add_query_arg(array('view' => 'reset', 'login' => $user->user_login, 'key' => $key), home_url('/compte'));
    $message = "Bonjour,\n\nChoisissez votre mot de passe pour votre espace Les Jardins de Sofie :\n\n" . $url
        . "\n\nCe lien est personnel et valable 24 heures. Si vous n’avez pas demandé ce message, ignorez-le.\n\nLes Jardins de Sofie";
    return wp_mail($user->user_email, 'Votre mot de passe — Les Jardins de Sofie', $message);
}

function jds_customer_register() {
    jds_customer_guard();
    if (is_user_logged_in()) jds_customer_redirect();
    $email = sanitize_email(jds_customer_value('email'));
    jds_customer_throttle('register', $email);
    $first = sanitize_text_field(jds_customer_value('first_name'));
    $last = sanitize_text_field(jds_customer_value('last_name'));
    if (!is_email($email) || $first === '' || strlen($first) > 100 || strlen($last) > 100) {
        jds_customer_redirect('invalid-details', 'register');
    }
    // Setting the password through the emailed link proves address ownership.
    // A visitor can never choose credentials for an existing unverified email.
    if (!email_exists($email)) {
        $id = wp_insert_user(array(
            'user_login' => 'jds_' . wp_generate_password(24, false, false),
            'user_pass' => wp_generate_password(48, true, true),
            'user_email' => $email, 'first_name' => $first, 'last_name' => $last,
            'display_name' => trim($first . ' ' . $last), 'role' => 'subscriber',
            'meta_input' => array('jds_customer_account' => 1, 'jds_customer_pending' => 1),
        ));
        if (is_wp_error($id)) jds_customer_redirect('unavailable', 'register');
        if (!jds_customer_send_password_link(get_user_by('id', $id))) {
            jds_customer_redirect('mail-failed', 'forgot');
        }
    }
    // Identical public response for existing and new addresses.
    jds_customer_redirect('email-sent');
}

function jds_customer_login() {
    jds_customer_guard();
    if (is_user_logged_in()) jds_customer_redirect();
    $email = sanitize_email(jds_customer_value('email'));
    jds_customer_throttle('login', $email);
    $password = jds_customer_value('password');
    if (!is_email($email) || $password === '' || strlen($password) > 4096) jds_customer_redirect('invalid-login');
    $candidate = get_user_by('email', $email);
    if ($candidate && (user_can($candidate, 'manage_options') || user_can($candidate, 'edit_posts'))) {
        // Staff keep using their existing admin sign-in and its security plugins.
        jds_customer_redirect('invalid-login');
    }
    $user = wp_signon(array('user_login' => $email, 'user_password' => $password,
        'remember' => jds_customer_value('remember') === '1'), true);
    if (is_wp_error($user)) jds_customer_redirect('invalid-login');
    jds_customer_redirect('welcome');
}

function jds_customer_forgot() {
    jds_customer_guard();
    $email = sanitize_email(jds_customer_value('email'));
    jds_customer_throttle('forgot', $email);
    if (!is_email($email)) jds_customer_redirect('invalid-details', 'forgot');
    $user = get_user_by('email', $email);
    if ($user && !jds_customer_send_password_link($user)) jds_customer_redirect('mail-failed', 'forgot');
    jds_customer_redirect('email-sent');
}

function jds_customer_reset() {
    jds_customer_guard();
    jds_customer_throttle('reset');
    $user = check_password_reset_key(jds_customer_value('key'), jds_customer_value('login'));
    if (is_wp_error($user)) jds_customer_redirect('expired-link', 'forgot');
    $password = jds_customer_value('password');
    if (strlen($password) < 12 || strlen($password) > 128 || $password !== jds_customer_value('password_confirm')) {
        // Keep the single-use key only in this same-origin redirect when correcting a form.
        wp_safe_redirect(add_query_arg(array('view' => 'reset', 'message' => 'invalid-password',
            'key' => jds_customer_value('key'), 'login' => jds_customer_value('login')), home_url('/compte')), 303);
        exit;
    }
    reset_password($user, $password);
    delete_user_meta($user->ID, 'jds_customer_pending');
    jds_customer_redirect('password-saved');
}

function jds_customer_logout() {
    jds_customer_guard();
    wp_logout();
    jds_customer_redirect('signed-out');
}

add_filter('authenticate', function ($user) {
    if ($user instanceof WP_User && get_user_meta($user->ID, 'jds_customer_pending', true)) {
        return new WP_Error('jds_email_pending', 'Définissez votre mot de passe avec le lien reçu par e-mail.');
    }
    return $user;
}, 99);

foreach (array('register', 'login', 'forgot', 'reset', 'logout') as $operation) {
    add_action('admin_post_jds_customer_' . $operation, 'jds_customer_' . $operation);
    add_action('admin_post_nopriv_jds_customer_' . $operation, 'jds_customer_' . $operation);
}

add_action('template_redirect', function () {
    if (untrailingslashit(wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH)) === '/compte') {
        if (!defined('DONOTCACHEPAGE')) define('DONOTCACHEPAGE', true);
        nocache_headers();
        header('Cache-Control: no-store, private, max-age=0');
        // Keep reset-link query strings off other origins while preserving the
        // Origin header on our native same-origin POST forms.
        header('Referrer-Policy: same-origin');
    }
}, -1);

add_action('admin_init', function () {
    global $pagenow;
    if (in_array($pagenow, array('admin-post.php', 'admin-ajax.php'), true)) return;
    if (is_user_logged_in() && get_user_meta(get_current_user_id(), 'jds_customer_account', true)
        && !current_user_can('edit_posts')) jds_customer_redirect();
});
add_filter('show_admin_bar', function ($show) {
    return is_user_logged_in() && get_user_meta(get_current_user_id(), 'jds_customer_account', true)
        && !current_user_can('edit_posts') ? false : $show;
});
