"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const _ = require("lodash");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const comment_json_1 = require("comment-json");
if (2 === process.argv.length) {
    console.log('usage : [option] ');
    process.exit(0);
}
const CURRENT_DIR = process.cwd();
const OUTPUT_TMP_JS_FILE = 'out.tmp.js';
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
    }
    catch (e) {
        console.error('raised exception');
        process.exit(1001);
    }
}
function readPackageFiles(directory, excludeFiles) {
    let packageFiles = [];
    (0, fs_1.readdirSync)(directory).forEach((fileName) => {
        if (fileName.endsWith('.js')
            && ((typeof excludeFiles === 'string' && fileName !== excludeFiles)
                || !excludeFiles.includes(fileName))) {
            packageFiles.push(path.join(directory, fileName));
        }
    });
    return packageFiles;
}
const HAS_JS_OUT_FILE = process.argv.includes('--js_output_file');
let JS_OUT_FILE;
const js_option = _.findIndex(process.argv, (elem) => {
    if (elem.startsWith('--js_output_file')) {
        return true;
    }
    return false;
});
if (-1 !== js_option) {
    const FILE_NAME = process.argv[js_option].replace('--js_output_file=', '');
    const tsconfig = (0, comment_json_1.parse)((0, fs_1.readFileSync)(TYPESCRIPT_CONFIG_JSON).toString());
    const { outDir } = tsconfig['compilerOptions'];
    const OUTPUT_DIR = path.resolve(COMPILE_DIR, outDir);
    // console.log( 'outDir: ' + OUTPUT_DIR + '\\' + FILE_NAME );
    let jsFileContents = '';
    const packageJsFiles = readPackageFiles(OUTPUT_DIR, [OUTPUT_TMP_JS_FILE, FILE_NAME]);
    console.log(packageJsFiles);
    packageJsFiles.forEach((fileName) => {
        jsFileContents += (0, fs_1.readFileSync)(fileName).toString().replace('"use strict";\r\n', '') + '\r\n';
        (0, fs_1.unlinkSync)(fileName);
    });
    (0, fs_1.writeFileSync)(path.join(OUTPUT_DIR, OUTPUT_TMP_JS_FILE), '"use strict";\r\n(function(document, window){\r\n' + jsFileContents + '})(document, window);\r\n');
    console.log(`yarn uglifyjs ${path.join(OUTPUT_DIR, OUTPUT_TMP_JS_FILE)}  --output ${path.join(OUTPUT_DIR, FILE_NAME)}`);
    (0, child_process_1.execSync)(`yarn uglifyjs ${path.join(OUTPUT_DIR, OUTPUT_TMP_JS_FILE)}  --output ${path.join(OUTPUT_DIR, FILE_NAME)}`);
    (0, fs_1.unlinkSync)(path.join(OUTPUT_DIR, OUTPUT_TMP_JS_FILE));
}
//# sourceMappingURL=index.js.map