<?php
/*
* !! THIS MUST BE SET TO 'LIVE' FOR DEPLOYMENT
*/
$GLOBALS['mode'] = 'development';
//$GLOBALS['mode'] = 'live';

add_action('wp_enqueue_scripts', 'difDesign_main_css', 420);
add_action('wp_enqueue_scripts', 'difDesign_core_js', 24);
add_action('wp_enqueue_scripts', 'difDesign_main_js', 16);

if ( $GLOBALS['mode'] === 'development') {
	add_action( 'admin_notices', 'devModeNotice' );
}

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

function difDesign_core_js() {
	$scriptURL = 'https://cdn.rawgit.com/TJSeabury/DIFDesignEssentials/31b20cbe/CoreUtilities/DIFDesignCoreUtilities.js';
	if ( $GLOBALS['mode'] === 'development' ) {
		$scriptURL = 'https://rawgit.com/TJSeabury/DIFDesignEssentials/master/CoreUtilities/DIFDesignCoreUtilities.js';
	}
	wp_enqueue_script( 'DIFDesignCoreJS', $scriptURL, array(), get_file_version($scriptURL), true);
}

function difDesign_main_js() {
	$mainJsPath = get_stylesheet_directory_uri() . '/main.js';
	wp_enqueue_script( 'DIFDesignMainJS', $mainJsPath, array(), get_file_version($mainJsPath), true);
}

function difDesign_main_css() {
	$mainCSSPath = get_stylesheet_directory_uri() . '/theme.css';
	wp_enqueue_style( 'DIFDesignChildTheme', $mainCSSPath, array(), get_file_version($mainCSSPath) );
}

function get_file_version( $url ) {
	$content_url = content_url();
	$filepath    = str_replace( $content_url, WP_CONTENT_DIR, $url );
	$filepath    = explode( '?', $filepath );
	$filepath    = array_shift( $filepath );
	// Ensure the file actually exists.
	if ( ! file_exists( $filepath ) ) {
		return;
	}
	// Attempt to read the file timestamp.
	try {
		$timestamp = filemtime( $filepath );
	} catch ( \Exception $e ) {
		return;
	}
	return $timestamp ? (string) $timestamp : null;
}

function devModeNotice() {
    ?>
    <div class="devMode error notice">
        <p><strong><?php _e( 'Development mode is enabled! This must be disabled in <em>'.__DIR__.'/functions.php</em> at deployment.' ); ?></strong></p>
    </div>
    <?php
}