<?php

function dif_core_js () {
	wp_enqueue_script( 'DIFDesignCoreJS', get_stylesheet_directory_uri() . '/core.js', array(), 0.2, true);
}

add_action('wp_enqueue_scripts', 'dif_core_js');
