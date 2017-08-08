<?php

function theme_enqueue_styles() {
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'avada-stylesheet' ) );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles', 3 );

function avada_lang_setup() {
	$lang = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain( 'Avada', $lang );
}
add_action( 'after_setup_theme', 'avada_lang_setup' );

add_action( 'wp_enqueue_scripts', 'difDesign_core_js', 2 );
add_action( 'wp_enqueue_scripts', 'difDesign_main_js', 1 );

function difDesign_core_js() {
	$coreJsPath = get_stylesheet_directory_uri() . '/difdesigncoreutilities.js';
	wp_register_script( 'DIFDesignCoreJS', $coreJsPath );
	wp_localize_script( 'DIFDesignCoreJS', 'wpMeta', array( 'siteURL' => get_option('siteurl') ) );
	wp_enqueue_script( 'DIFDesignCoreJS', $coreJsPath, array(), get_file_version($coreJsPath), true);
}

function difDesign_main_js() {
	$mainJsPath = get_stylesheet_directory_uri() . '/main.js';
	wp_enqueue_script( 'DIFDesignMainJS', $mainJsPath, array(), get_file_version($mainJsPath), true);
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

/*
* Adds the option to hide Gravity form field labels.
*/
add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

/*
* Enables ajax for getting shortcodes dynamically
*/
add_action('wp_ajax_do_shortcode', 'ajax_do_shortcode');
add_action('wp_ajax_nopriv_do_shortcode', 'ajax_do_shortcode');

function ajax_do_shortcode()
{
	$output;
    switch( $_REQUEST['fn'] )
	{
		case 'do_shortcode':
			$output = do_shortcode( wp_unslash( $_REQUEST['shortcode'] ) );
			break;
		default:
			$output = 'Invalid shortcode';
			break;
	}
	$output = json_encode( $output );
	echo $output;
	wp_die();
}

add_action( 'after_setup_theme', 'my_child_theme_image_size', 11 );
function my_child_theme_image_size()
{
	 remove_image_size( 'recent-works-thumbnail' ); 
	 add_image_size( 'recent-works-thumbnail', 1000, '', false );
}










