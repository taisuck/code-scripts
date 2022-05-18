"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const _ = require("lodash");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
if (2 === process.argv.length) {
    console.log('usage : [option] ');
    process.exit(0);
}
const CURRENT_DIR = process.cwd();
// console.log( CURRENT_DIR );
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
}
else {
    TARGET_DIR = CURRENT_DIR;
}
const COMPILE_DIR = TARGET_DIR;
const TYPESCRIPT_CONFIG_JSON = path.resolve(COMPILE_DIR, "tsconfig.json");
if (!(0, fs_1.existsSync)(TYPESCRIPT_CONFIG_JSON)) {
    console.error(`Not exists file('tsconfig.json').`);
    process.exit(-1);
}
if (IS_COMPILE) {
    try {
        (0, child_process_1.execSync)(`yarn tsc -p ${COMPILE_DIR}`);
        process.exit(0);
    }
    catch (e) {
        console.error('raised exception');
        process.exit(1001);
    }
}
else {
    console.log(process.argv);
}
//# sourceMappingURL=index.js.map