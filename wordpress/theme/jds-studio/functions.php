<?php
/** WordPress host adapter for the existing JDS React storefront. */
defined('ABSPATH') || exit;

function jds_studio_shopify_domain($value) {
    $value = strtolower(trim((string) $value));
    $value = preg_replace('~^https?://~', '', $value);
    $value = rtrim($value, '/');
    return preg_match('/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/', $value) ? $value : '';
}

function jds_studio_public_token($value) {
    $value = trim((string) $value);
    return preg_match('/^[a-zA-Z0-9_-]{16,256}$/', $value) ? $value : '';
}

add_action('customize_register', function ($customizer) {
    $customizer->add_section('jds_catalogue', array(
        'title' => 'Catalogue Shopify JDS',
        'description' => 'Même catalogue Shopify que le site précédent. Utiliser uniquement un jeton Storefront public, jamais une clé Admin.',
        'priority' => 20,
    ));
    $customizer->add_setting('jds_shopify_domain', array(
        'type' => 'option', 'capability' => 'manage_options',
        'sanitize_callback' => 'jds_studio_shopify_domain', 'transport' => 'refresh',
    ));
    $customizer->add_control('jds_shopify_domain', array(
        'section' => 'jds_catalogue', 'label' => 'Domaine Shopify', 'type' => 'text',
        'input_attrs' => array('placeholder' => 'votre-boutique.myshopify.com', 'autocomplete' => 'off'),
    ));
    $customizer->add_setting('jds_storefront_token', array(
        'type' => 'option', 'capability' => 'manage_options',
        'sanitize_callback' => 'jds_studio_public_token', 'transport' => 'refresh',
    ));
    $customizer->add_control('jds_storefront_token', array(
        'section' => 'jds_catalogue', 'label' => 'Jeton Storefront public', 'type' => 'password',
        'description' => 'Ce jeton est conçu pour être utilisé par le navigateur des visiteurs.',
        'input_attrs' => array('autocomplete' => 'off'),
    ));
});

function jds_studio_is_app_path() {
    $path = wp_parse_url(wp_unslash($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
    $path = '/' . trim((string) $path, '/');
    return $path === '/' || in_array($path, array('/notre-histoire', '/contact', '/compte', '/recherche', '/services'), true)
        || preg_match('~^/(categorie|produit)/[^/]+$~', $path)
        || preg_match('~^/services/(corporate|evenements|jardins|sur-mesure)$~', $path);
}

add_filter('redirect_canonical', function ($url) {
    return jds_studio_is_app_path() ? false : $url;
});

// Serve all storefront paths through the new theme, retaining WordPress admin,
// media, REST, robots, and sitemaps. No old content or database rows are deleted.
add_action('template_redirect', function () {
    if (is_feed() || is_robots() || is_trackback() || get_query_var('sitemap')) return;
    if (jds_studio_is_app_path()) {
        global $wp_query;
        $wp_query->is_404 = false;
        status_header(200);
    }
    require get_template_directory() . '/index.php';
    exit;
}, 0);

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('html5', array('style', 'script'));
});
