<?php
defined('ABSPATH') || exit;
$jds_assets = get_template_directory_uri() . '/dist';
$jds_config = array(
    'assetsUrl' => esc_url_raw($jds_assets),
    'shopifyDomain' => jds_studio_shopify_domain(get_option('jds_shopify_domain', '')),
    'storefrontToken' => jds_studio_public_token(get_option('jds_storefront_token', '')),
);
$jds_version = (string) wp_get_theme()->get('Version');
?><!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Studio JDS — Respirez votre intérieur</title>
<meta name="description" content="Compositions végétales, plantes d’intérieur et pots artisanaux. Cadeaux corporate, événements, sur-mesure et jardins au Maroc.">
<meta property="og:site_name" content="Les Jardins de Sofie">
<meta property="og:type" content="website">
<meta property="og:title" content="Studio JDS — Respirez votre intérieur">
<meta property="og:locale" content="fr_FR">
<link rel="icon" href="<?php echo esc_url($jds_assets . '/images/logo.png'); ?>">
<?php if (is_customize_preview()) wp_head(); ?>
<link rel="stylesheet" href="<?php echo esc_url($jds_assets . '/jds-app.css?v=' . $jds_version); ?>">
<script>window.__JDS_CONFIG__ = <?php echo wp_json_encode($jds_config, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;</script>
</head>
<body>
<div id="jds-root"><div style="min-height:50vh;padding:8rem 2rem;text-align:center;color:#735751">Les Jardins de Sofie — Chargement…</div></div>
<noscript>Veuillez activer JavaScript pour parcourir notre catalogue. Vous pouvez aussi nous contacter directement.</noscript>
<script type="module" src="<?php echo esc_url($jds_assets . '/jds-app.js?v=' . $jds_version); ?>"></script>
<?php if (is_customize_preview()) wp_footer(); ?>
</body>
</html>
