import * as assert from 'assert';
import { exec, execSync } from 'child_process';

suite('Process Test Suite',  async () => {
    await test( '호출 테스트', async () => {
        try {
            const response = await execSync( 'node ./dist/index.js' );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
    });


    await test( 'compile 옵션 테스트', async() => {
        try {
            await execSync( 'node ../../dist/index.js --compile', {
                cwd: 'D:\\workspace\\opensource\\code-scripts\\test-src\\foobar'
            } );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
        
    } );

    await test( 'compile target 옵션 테스트', async () => {
        try {
            await execSync( 'node ./dist/index.js --compile --target=./test-src/compile' );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
    } );
    
    await test( 'compile target js_output_file 옵션 테스트', async () => {
        try {
            await execSync( 'node ./dist/index.js --compile --target=./test-src/compile --js_output_file=out.min.js' );
        } catch( e: unknown ) {
            assert.ifError( e );
        }
    } );

});