"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const child_process_1 = require("child_process");
suite('Process Test Suite', async () => {
    await test('호출 테스트', async () => {
        try {
            const response = await (0, child_process_1.execSync)('node ./bin/code-scripts.js');
        }
        catch (e) {
            assert.ifError(e);
        }
    });
    await test('compile 옵션 테스트', async () => {
        try {
            await (0, child_process_1.execSync)('node ../../bin/code-scripts.js build', {
                cwd: 'D:\\workspace\\opensource\\code-scripts\\test-src\\foobar'
            });
        }
        catch (e) {
            assert.ifError(e);
        }
    });
    await test('compile target 옵션 테스트', async () => {
        try {
            await (0, child_process_1.execSync)('node ./bin/code-scripts.js build --target=./test-src/compile');
        }
        catch (e) {
            assert.ifError(e);
        }
    });
    await test('compile target js_output_file 옵션 테스트', async () => {
        try {
            await (0, child_process_1.execSync)('node ./bin/code-scripts.js build --target=./test-src/compile --package=out.min.js');
        }
        catch (e) {
            assert.ifError(e);
        }
    });
});
//# sourceMappingURL=index.test.js.map