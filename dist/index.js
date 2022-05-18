"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const _ = require("lodash");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
// console.log('============= START ===============');
// console.log( process.argv );
// console.log('=============  END  ===============');
if (2 === process.argv.length) {
    console.log('usage : [option] ');
    process.exit(0);
}
const CURRENT_DIR = process.cwd();
const IS_COMPILE = process.argv.includes('--compile');
let TARGET_DIR;
const index = _.findIndex(process.argv, (elem) => {
    if (elem.startsWith('--target')) {
        return true;
    }
    return false;
});
if (-1 !== index) {
    const OPTION = process.argv[index].replace('--target=', '');
    // TARGET_DIR = path.resolve( CURRENT_DIR, OPTION );
    TARGET_DIR = OPTION;
    const TYPESCRIPT_CONFIG_JSON = path.resolve(CURRENT_DIR, OPTION, "tsconfig.json");
    if (!(0, fs_1.existsSync)(TYPESCRIPT_CONFIG_JSON)) {
        console.error('TypeScript 설정파일을 찾을수 없습니다.');
        process.exit(-1);
    }
}
else {
    TARGET_DIR = CURRENT_DIR;
}
const COMPILE_DIR = TARGET_DIR;
if (IS_COMPILE) {
    try {
        (0, child_process_1.execSync)(`yarn tsc -p ${COMPILE_DIR}`);
        // console.log( result.toString() );
    }
    catch (e) {
        console.error('raised exception');
    }
    // const tsc : ChildProcess = exec( `yarn1 tsc -p ${COMPILE_DIR}` );
    // const { stderr, stdout, exitCode } = tsc;
    // console.log( stdout );
    // console.log( 'exitCode: ' + exitCode );
    // tsc.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    // });
    // tsc.on('exit', (code) => {
    //     console.log(`child process exited with code ${code}`);
    //     process.exit();
    // });
    // tsc.on('error', (err) => {
    //     console.error('Failed to start subprocess.');
    //     console.error( err.message );
    // });
}
else {
    console.log(process.argv);
}
//# sourceMappingURL=index.js.map