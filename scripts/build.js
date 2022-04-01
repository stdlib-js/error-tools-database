#!/usr/bin/env node

/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var shell = require( 'child_process' ).execSync;
var logger = require( 'debug' );
var writeFile = require( '@stdlib/fs-write-file' ).sync;
var objectKeys = require( '@stdlib/utils-keys' );
var data = require( './../data/data.json' );


// VARIABLES //

var debug = logger( 'error:database:build' );
var RE_DOUBLE_QUOTE = /"/g;

// Output file paths:
var OUTPUT_JSON = resolve( __dirname, '..', 'data', 'data.json' );
var OUTPUT_CSV = resolve( __dirname, '..', 'data', 'data.csv' );


// FUNCTIONS //

/**
* Escapes double quotes in a string.
*
* @private
* @param {string} str - input string
* @returns {string} escaped string
*/
function escapeQuotes( str ) {
	return str.replace( RE_DOUBLE_QUOTE, '\\"' );
}

/**
* Returns the next code in the sequence of form `[a-zA-Z0-9]{2}` (in lexicographical order).
*
* @private
* @param {string} [prev=null] - previous code
* @returns {string} code
*/
function nextCode( prev ) {
	var i;
	var c;
	var n;
	if ( !prev ) {
		return '00';
	}

	// Iterate from the last character in the code:
	n = prev.length;
	for ( i = n-1; i >= 0; i-- ) {
		c = prev.charCodeAt( i );

		// If the last character is a digit between 0 and 8, increment it:
		if ( c >= 48 && c <= 56 ) {
			return ( prev.substring( 0, i ) +
				String.fromCharCode( c+1 ) +
				prev.substring( i+1 )
			);
		}
		// If the last character is equal to 9, set it to 'A':
		if ( c === 57 ) {
			return prev.substring( 0, i ) + 'A' + prev.substring( i+1 );
		}
		// If the last character is a letter between `A` and `Y`, increment it:
		if ( c >= 65 && c <= 89 ) {
			return ( prev.substring( 0, i ) +
				String.fromCharCode( c+1 ) +
				prev.substring( i+1 ) );
		}
		// If the last character is equal to `Z`, set it to `a`:
		if ( c === 90 ) {
			return prev.substring( 0, i ) + 'a' + prev.substring( i+1 );
		}
		// If the last character is a letter between `a` and `y`, increment it:
		if ( c >= 97 && c <= 121 ) {
			return ( prev.substring( 0, i ) +
				String.fromCharCode( c+1 ) +
				prev.substring( i+1 ) );
		}
		// If the last character is equal to `z`, set it to `0`:
		if ( c === 122 ) {
			prev = prev.substring( 0, i ) + '0' + prev.substring( i+1 );
		}
	}
}


// MAIN //

/**
* Main execution sequence.
*
* @private
*/
function main() {
	var messages;
	var command;
	var codes;
	var fopts;
	var code;
	var msgs;
	var next;
	var keys;
	var csv;
	var msg;
	var i;

	debug( 'Extracting errors and generate error codes if not yet present...' );
	messages = new Set();
	next = '00';
	codes = objectKeys( data );
	for ( i = 0; i < codes.length; i++ ) {
		code = codes[ i ];
		messages.add( data[ code ] );
		if ( code >= next ) {
			next = nextCode( code );
		}
	}

	// Extract error messages consisting of string literals:
	command = [
		'root_dir="$(git rev-parse --show-toplevel)"', // Determine the root project directory
		'\n',
		'base_dir="${root_dir}/lib/node_modules/@stdlib"', // Determine the base directory
		'\n',
		'find "${base_dir}" -type f -name \'*.js\' ',
		'! -path "**/test/*" ! -path "**/examples/*" ! -path "**/benchmark/*"  ! -path "**/scripts/*" ! -path "**/cli/*" ! -path "**/docs/*" ',
		'-exec grep -E "^[^*]+new [a-zA-Z]*Error\\( \'[^\']+\' \\)" {} \\;',
		'|',
		'sed -E "s/^.*Error\\( \'([^\']+)\' \\).*$/\\1/"'
	].join( '' );
	msgs = shell( command ).toString().split( '\n' );

	// Extract error messages using `@stdlib/string/format`:
	command = [
		'root_dir="$(git rev-parse --show-toplevel)"', // Determine the root project directory
		'\n',
		'base_dir="${root_dir}/lib/node_modules/@stdlib"', // Determine the base directory
		'\n',
		'find "${base_dir}" -type f -name \'*.js\' ',
		'! -path "**/test/*" ! -path "**/examples/*" ! -path "**/benchmark/*"  ! -path "**/scripts/*" ! -path "**/cli/*" ! -path "**/docs/*" ',
		'-exec grep -E "^[^*]+new [a-zA-Z]*Error\\( format\\( \'[^\']+\'" {} \\;',
		'|',
		'sed -E "s/^.*Error\\( format\\( \'([^\']+)\'.*$/\\1/"'
	].join( '' );
	msgs = msgs.concat( shell( command ).toString().split( '\n' ) );

	for ( i = 0; i < msgs.length; i++ ) {
		msg = msgs[ i ];
		if ( msg && !messages.has( msg ) ) {
			messages.add( msg );
			data[ next ] = msg;
			next = nextCode( next );
		}
	}

	debug( 'Writing to JSON file...' );
	fopts = {
		'encoding': 'utf8'
	};
	writeFile( OUTPUT_JSON, JSON.stringify( data ), fopts );

	debug( 'Writing to CSV file...' );
	fopts = {
		'encoding': 'utf8'
	};
	keys = objectKeys( data );
	csv = '';
	for ( i = 0; i < keys.length; i++ ) {
		csv += '"' + keys[ i ] + '","' + escapeQuotes( data[ keys[i] ] ) + '"\n'; // Note: ensures trailing newline
	}
	writeFile( OUTPUT_CSV, csv, fopts );
}


// MAIN //

main();
