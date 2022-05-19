#!/usr/bin/env node

"use strict";
const path = require('path');
const spawnSync = require('child_process').spawnSync;


const script = process.argv[2];
const args = process.argv.slice(3);

const CURRENT_WORK_DIR = path.resolve( __dirname, '../../..');

switch( script ) {
    case 'build':
    case 'test':
    // case 'start': 
    {
        const result = spawnSync( 
            'node', 
            [require.resolve(path.join('../dist', script))].concat(args),
            { 
                stdio: 'inherit',
                cwd: CURRENT_WORK_DIR
            } 
        );
        process.exit( result.status );
        break;
    }
    default:
        console.log(`Unknown option - ${script}.`);
        break;
}