import * as path from 'path';
import * as _ from 'lodash';
import { ChildProcess, exec, execSync, spawn, spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { chdir } from 'process';

if( 2 === process.argv.length ) {
    console.log( 'usage : [option] ' );
    process.exit( 0 );
}

const CURRENT_DIR = process.cwd();
const IS_COMPILE = process.argv.includes( '--compile' );

let TARGET_DIR;
const index = _.findIndex( process.argv, ( elem: string ) => {
    if( elem.startsWith('--target') ) {
        return true;
    }
    return false;
} );

if( -1 !== index ) {
    const OPTION = process.argv[ index ].replace('--target=', '');
    // TARGET_DIR = path.resolve( CURRENT_DIR, OPTION );
    TARGET_DIR = OPTION;
    const TYPESCRIPT_CONFIG_JSON = path.resolve( CURRENT_DIR, OPTION, "tsconfig.json" );
    if( !existsSync( TYPESCRIPT_CONFIG_JSON ) ) {
        console.error('TypeScript 설정파일을 찾을수 없습니다.');
        process.exit( -1 );
    }
} else {
    TARGET_DIR = CURRENT_DIR;
}

const COMPILE_DIR = TARGET_DIR;

if( IS_COMPILE ) {
    try {
        execSync( `yarn tsc -p ${COMPILE_DIR}` );
        process.exit( 0 );
    } catch( e ) {
        console.error( 'raised exception' );
        process.exit( 1001 );
    }
} else {
    console.log( process.argv );
}

