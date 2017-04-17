<?php
/*
* !! THIS MUST BE SET TO FALSE FOR GO-LIVE
*/
$devMode = true;

add_action('wp_enqueue_scripts', 'dif_core_js');
add_action('wp_enqueue_scripts', 'dif_main_js');

function dif_core_js () {
	$scriptURL = null;
	if ( $devMode ) {
		$scriptURL = 'https://rawgit.com/TJSeabury/DIFDesignEssentials/master/CoreUtilities/DIFDesignCoreUtilities.js';
	} else {
		$scriptURL = 'https://cdn.rawgit.com/TJSeabury/DIFDesignEssentials/31b20cbe/CoreUtilities/DIFDesignCoreUtilities.js';
	}
	wp_enqueue_script( 'DIFDesignCoreJS', $scriptURL, array(), '0.3.1', true);
}
function dif_main_js () {
	wp_enqueue_script( 'DIFDesignMainJS', get_stylesheet_directory_uri() . '/main.js', array(), 1.0, true);
}

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );
