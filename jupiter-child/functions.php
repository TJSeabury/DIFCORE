<?php

function dif_core_js () {
	wp_enqueue_script( 'DIFDesignCoreJS', 'https://rawgit.com/TJSeabury/DIFDesignEssentials/master/Development/DIFDesignCoreUtilities.js', array(), '0.3.1', true);
}
function dif_main_js () {
	wp_enqueue_script( 'DIFDesignMainJS', get_stylesheet_directory_uri() . '/main.js', array(), 1.0, true);
}

add_action('wp_enqueue_scripts', 'dif_core_js');
add_action('wp_enqueue_scripts', 'dif_main_js');

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );
