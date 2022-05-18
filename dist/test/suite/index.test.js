"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
suite('Process Test Suite', async () => {
    await test('호출 테스트', async () => {
        try {
            const response = await (0, child_process_1.execSync)('node ./dist/index.js');
        }
        catch (e) {
            if (typeof e === "string") {
                e.toUpperCase(); // works, `e` narrowed to string
            }
            else if (e instanceof Error) {
                console.log(process.cwd());
                console.error(e.message);
                console.error("AAAAAA");
            }
        }
    });
    // test( 'compile 옵션 테스트', () => {
    //     exec( 'node ./dist/index.js --compile', (err, stdout, stderr) => {
    //         assert.ifError( err );
    //         console.log( stdout );
    //     } )
    // } );
    //**
    await test('compile target 옵션 테스트', async () => {
        try {
            await (0, child_process_1.execSync)('node ./dist/index.js --compile --target=./test-src/compile');
        }
        catch (e) {
            if (typeof e === "string") {
                e.toUpperCase(); // works, `e` narrowed to string
            }
            else if (e instanceof Error) {
                console.error(e.message);
            }
        }
    });
    //** */
});
//# sourceMappingURL=index.test.js.map