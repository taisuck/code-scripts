import * as path from 'path';
import * as _ from 'lodash';

import { execSync } from 'child_process';
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { parse } from 'comment-json';

const OPTION_PACKAGE = 'package';
const OPTION_TARGET = 'target';
const OUTPUT_TMP_JS_FILE = 'out.tmp.js';
const CURRENT_DIR = process.cwd();

function readPackageFiles( directory: string, excludeFiles: string|Array<string> ) : Array<string>
{
    let packageFiles : Array<string> = [];

    readdirSync( directory ).forEach( (fileName) => {
        if( fileName.endsWith('.js') 
            && ( ( typeof excludeFiles === 'string' && fileName !== excludeFiles )
             || !excludeFiles.includes( fileName ) ) ) {
            packageFiles.push( path.join( directory, fileName ) );
        }
    } );

    return packageFiles;
}

const target_option_index = _.findIndex( process.argv, ( elem: string ) => {
    if( elem.startsWith(`--${OPTION_TARGET}`) ) {
        return true;
    }
    return false;
} );

let TARGET_DIR = CURRENT_DIR;
if( -1 !== target_option_index ) {
    TARGET_DIR = process.argv[ target_option_index ].replace(`--${OPTION_TARGET}=`, '');
}
const WORKING_DIR = TARGET_DIR;


const TYPESCRIPT_CONFIG_JSON = path.resolve( WORKING_DIR, "tsconfig.json" );
if( !existsSync( TYPESCRIPT_CONFIG_JSON ) ) {
    console.error(`Not exists file('tsconfig.json').`);
    process.exit( -1 );
}

try {
    execSync( `yarn tsc -p ${WORKING_DIR}` );
} catch( e ) {
    console.error( 'raised exception' );
    process.exit( 1001 );
}

const package_option_index = _.findIndex( process.argv, ( elem: string ) => {
    if( elem.startsWith( `--${OPTION_PACKAGE}` ) ) {
        return true;
    }
    return false;
} );

if( -1 !== package_option_index ) {
    const FILE_NAME = process.argv[ package_option_index ].replace(`--${OPTION_PACKAGE}=`, '');
    const tsconfig : any = parse( readFileSync( TYPESCRIPT_CONFIG_JSON ).toString() );
    const { outDir } = tsconfig['compilerOptions'];
    const OUTPUT_DIR = path.resolve( WORKING_DIR, outDir );

    let jsFileContents = '';
    const packageJsFiles = readPackageFiles( OUTPUT_DIR, [ OUTPUT_TMP_JS_FILE, FILE_NAME ] );
    packageJsFiles.forEach((fileName) => {
        jsFileContents += readFileSync(fileName).toString().replace('"use strict";\r\n', '') + '\r\n';
        unlinkSync(fileName);
    });

    writeFileSync(path.join( OUTPUT_DIR, OUTPUT_TMP_JS_FILE), '"use strict";\r\n(function(document, window){\r\n' + jsFileContents + '})(document, window);\r\n');
    execSync( `yarn uglifyjs ${path.join(OUTPUT_DIR, OUTPUT_TMP_JS_FILE)}  --output ${path.join( OUTPUT_DIR, FILE_NAME )}` )
    unlinkSync( path.join( OUTPUT_DIR, OUTPUT_TMP_JS_FILE ) );
}

