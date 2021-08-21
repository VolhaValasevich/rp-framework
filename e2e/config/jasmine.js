const Jasmine = require('jasmine');
const JasmineReporters = require("jasmine-reporters");

const jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'e2e/specs',
    spec_files: [
        'test.spec.js'
    ],
    helpers: [
        'hooks.js'
    ]
});

jasmine.configureDefaultReporter({
    print: () => null
});

jasmine.addReporter(new JasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: './reports/junit',
}));

jasmine.addReporter(new JasmineReporters.TerminalReporter({
    verbosity: 3,
    color: true,
    showStack: true
}));

jasmine.execute();
