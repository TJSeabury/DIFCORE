<?php

function difdesign_main_js () {
	wp_enqueue_script( 'DIFDesignMainJS', get_stylesheet_directory_uri() . '/main.js', array(), 0.9, true);
}

add_action('wp_enqueue_scripts', 'difdesign_main_js');
