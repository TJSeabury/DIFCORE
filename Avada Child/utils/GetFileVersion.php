<?php namespace DIFDesign\utils;

/*
* @param string $url The full file url.
* @return int
*/
class GetFileVersion
{
	public static function getVersion( $url )
	{
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
		return $timestamp;
	}
	
	/*
	* 
	*/
	public static function comparator( string $r1, array $r2 )
	{
		
	}
}