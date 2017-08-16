<?php namespace \difdesign;

define( 'DIFDESIGNTHEMEROOT', get_stylesheet_directory_uri() );

/*
* @param string $class The fully-qualified class name.
* @return void
*/
spl_autoload_register( function( $class )
{
    //$relative_class = substr( $class, $len );
	var_dump( $class );
    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    /* $file = __DIR__ . str_replace( '\\', '/', $relative_class ) . '.php';
    if ( file_exists( $file ) )
	{
		var_dump( $file );
        include_once $file;
    } */
} );

class Difdesign
{
	protected $themePath = '';
	protected $themeUri = '';
	private $initTime = 0;
	
	public function __construct()
	{
		$this->themePath = __DIR__;
		$this->themeUri = basename( $_SERVER['PHP_SELF'] );
		$this->initTime = time();
		$this->initAdmin();
		$this->initStyles();
		$this->initScripts();
	}
	
	/*
	* Initializes Wordpress admin theme menu.
	*/
	private function initAdmin()
	{
		add_action( 'admin_init', function()
	    {
			add_settings_section( 
				'primary_settings',
				'Primary Settings',
				function( $arg )
			    {
					?>
					<p>Super important settings.</p>
					<?php
				},
				'difdesign'
			);
			
			/*
			* Theme Mode
			*/
			register_setting( 
				'difdesign_options', 
				'difdesign_theme_mode' 
			);
			add_settings_field(
				'difdesign_theme_mode',
				'Theme Mode',
				function( $args )
				{
				?>
					<span>LIVE </span><input type="checkbox" id="<?php echo $args['id']; ?>" name="<?php echo $args['id']; ?>" value="1" <?php checked( '1', get_option('difdesign_theme_mode') ); ?> />
				<?php
				},
				'difdesign',
				'primary_settings',
				array(
					'id' => 'difdesign_theme_mode'
				)
			);
			
			/*
			* Primary Color
			*/
			register_setting(
				'difdesign_options',
				'difdesign_primary_color'
			);
			add_settings_field(
				'difdesign_primary_color',
				'Primary Color',
				function( $args )
				{
				?>
					<div style="display:inline-block;width:25px;height:25px;margin:2px 0 0 0;background-color:<?php echo get_option('difdesign_primary_color'); ?>;vertical-align:top;"></div>
					<input type="text" id="<?php echo $args['id']; ?>" name="<?php echo $args['id']; ?>" value="<?php echo get_option('difdesign_primary_color'); ?>" />
				<?php
				},
				'difdesign',
				'primary_settings',
				array(
					'id' => 'difdesign_primary_color'
				)
			);
			
			/*
			* Minify css
			*/
			register_setting(
				'difdesign_options',
				'difdesign_minify_css'
			);
			add_settings_field(
				'difdesign_minify_css',
				'Minify CSS',
				function( $args )
				{
					?>
						<input type="checkbox" id="<?php echo $args['id']; ?>" name="<?php echo $args['id']; ?>" value="1" <?php checked( '1', get_option('difdesign_minify_css') ); ?> />
					<?php
				},
				'difdesign',
				'primary_settings',
				array(
					'id' => 'difdesign_minify_css'
				)
			);
			
		} );
		
		add_action( 'admin_menu', function()
		{
			add_menu_page(
				'DIF Design Theme Options',
				'Theme Options',
				'manage_options',
				'difdesign',
				function()
				{
					// check user capabilities
					if ( !current_user_can( 'manage_options' ) )
					{
						return;
					}
					?>
					<div class="wrap">
						<h1><?= esc_html( get_admin_page_title() ); ?></h1>
						<p>Various options to toggle theme functinos and components.</p>
						<form action="options.php" method="post">
							<?php
							// output security fields for the registered setting "difdesign_options"
							settings_fields( 'difdesign_options' );
							// output setting sections and their fields
							// (sections are registered for "difdesign", each field is registered to a specific section)
							do_settings_sections( 'difdesign' );
							// output save settings button
							submit_button( 'Save Settings' );
							?>
						</form>
					</div>
					<?php
				},
				$this->themeUri . '/admin/img/difdesign-logo.png',
				2
			);
		} );
		
	}
	
	/*
	* Initializes theme styles.
	*/
	private function initStyles()
	{
		add_action( 'after_setup_theme', function()
		{
			$path = $this->themePath . '/public/css/';
			$filename = 'aggregate.min.css';
			$this->difDesign_aggregate_minify( $path, $filename );
		} );
		
		add_action( 'wp_enqueue_scripts', function()
		{
			wp_enqueue_style( 'difdesign-aggregate-minified-styles', $this->themeUri . '/public/css/aggregate.min.css', array( 'avada-stylesheet' ) );
		}, 3 );
		
	}
	
	/*
	* Generate css
	*/
	public function difDesign_aggregate_minify( $path, $filename )
	{
		if ( is_writable( $path ) )
		{
			$r = array();
			$c = '';
			foreach( array_filter( glob( $this->themePath . '/public/css/modules/*.*' ), 'is_file' ) as $file )
			{
				$fn = pathinfo( $file );
				if ( $fn['extension'] == 'php' || $fn['extension'] == 'css'  )
				{
					$r[] = $this->difdesign_get_file_output( $file );
				}
			}
			
			$c = implode( "\n\n", $r );
			
			/*
			* Remove comments and minify aggregated css.
			*/
			if ( (bool)get_option( 'difdesign_minify_css' ) )
			{
				$c = str_replace( 
					array( ' {', ': ', ', ', ' >', '> ', ' > ', ' !', '( ', ' )' ), 
					array( '{', ':', ',', '>', '>', '>', '!', '(', ')' ) , 
					str_replace( 
						array( "\r\n", "\r", "\n", "\t", '  ', '    ', '    ' ),
						'',
						preg_replace( 
							'!/\*[^*]*\*+([^/][^*]*\*+)*/!', 
							'', 
							$c 
						) 
					) 
				);
			}
			$f = fopen( $path . $filename, 'wb' );
			fwrite( $f, $c );
			fclose( $f );
		}
	}
	
	private function difDesign_get_file_output( $file )
	{
		ob_start();
		include( $file );
		return ob_get_clean();
	}
	
	/*
	* Initialize theme scripts
	*/
	private function initScripts()
	{
		add_action( 'wp_enqueue_scripts', function()
		{
			$coreJsPath = $this->themeUri . '/public/js/difdesigncoreutilities.js';
			wp_register_script( 'DIFDesignCoreJS', $coreJsPath );
			wp_localize_script( 'DIFDesignCoreJS', 'wpMeta', array( 'siteURL' => get_option( 'siteurl' ) ) );
			wp_enqueue_script( 'DIFDesignCoreJS', $coreJsPath, array(), $this->get_file_version( $coreJsPath ), true);
		}, 2 );
		add_action( 'wp_enqueue_scripts', function()
		{
			$mainJsPath = $this->themeUri . '/public/js/main.js';
			wp_enqueue_script( 'DIFDesignMainJS', $mainJsPath, array(), $this->get_file_version( $mainJsPath ), true);
		}, 1 );
	}
	
	public function get_file_version( $url ) {
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
	
}

$difdesign = new Difdesign();




function avada_lang_setup() {
	$lang = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain( 'Avada', $lang );
}
add_action( 'after_setup_theme', 'avada_lang_setup' );



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










