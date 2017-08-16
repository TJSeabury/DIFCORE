<?php namespace DIFDesign\admin\css;

class Aggregator
{
	/*
	* Generate css
	*/
	public static function aggregate_minify( $readPath, $writePath, $filename, $minify )
	{
		if ( is_writable( $readPath ) )
		{
			$r = array();
			$c = '';
			foreach( array_filter( glob( $readPath . '/*.*' ), 'is_file' ) as $file )
			{
				$fn = pathinfo( $file );
				if ( $fn['extension'] == 'php' || $fn['extension'] == 'css' && $fn['filename'] !== 'index' )
				{
					$r[] = self::get_file_output( $file );
				}
			}
			
			$c = implode( "\n\n", $r );

			/*
			* Remove comments and minify aggregated css.
			*/
			if ( $minify )
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
			if ( is_writeable( $writePath ) )
			{
				$f = fopen( $writePath . $filename, 'wb' );
				fwrite( $f, $c );
				fclose( $f );
			}
		}
	}
	
	private function get_file_output( $file )
	{
		ob_start();
		include( $file );
		return ob_get_clean();
	}
}