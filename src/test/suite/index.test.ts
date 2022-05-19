import * as assert from 'assert';
import { exec, execSync } from 'child_process';

suite('Process Test Suite',  async () => {
    await test( '호출 테스트', async () => {
        try {
            const response = await execSync( 'node ./bin/code-scripts.js' );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
    });


    await test( 'build 옵션 테스트', async() => {
        try {
            await execSync( 'node ../../bin/code-scripts.js build', {
                cwd: 'D:\\workspace\\opensource\\code-scripts\\test-src\\foobar'
            } );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
        
    } );

    await test( 'build target 옵션 테스트', async () => {
        try {
            await execSync( 'node ./bin/code-scripts.js build --target=./test-src/compile' );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
    } );
    
    await test( 'build target package 옵션 테스트', async () => {
        try {
            await execSync( 'node ./bin/code-scripts.js build --target=./test-src/compile --package=out.min.js' );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
    } );

});