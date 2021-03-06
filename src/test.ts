import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

const OPTION_TARGET = 'target';

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true,
		timeout: 150000
	});

    const testsRoot = path.resolve( process.cwd() );

	return new Promise((c, e) => {
		glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
			if (err) {
				return e(err);
			}
            //**
			// Add files to the test suite
			
            files.forEach(f => {
                if( !f.startsWith( 'node_modules' ) ) {
                    console.log( f );
                    mocha.addFile(path.resolve(testsRoot, f))
                }
            } );

			try {
				// Run the mocha test
				mocha.run(failures => {
					if (failures > 0) {
						e(new Error(`${failures} tests failed.`));
					} else {
						c();
					}
				});
			} catch (err) {
				console.error(err);
				e(err);
			}
            //** */
		});
	});
}

run();