const Jasmine = require('jasmine');
const JasmineReporters = require("jasmine-reporters");
const args = require('../utils/paramsHelper');

const jasmineRunner = new Jasmine();
const tags = args.getTags();

jasmineRunner.loadConfig({
    spec_dir: 'e2e/specs',
    spec_files: [
        '*.spec.js'
    ],
    helpers: [
        'hooks.js'
    ]
});

jasmineRunner.configureDefaultReporter({
    print: () => null
});

jasmineRunner.addReporter(new JasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: './reports/junit',
}));

jasmineRunner.addReporter(new JasmineReporters.TerminalReporter({
    verbosity: 3,
    color: true,
    showStack: true
}));

jasmine.getEnv().addReporter( {
    specStarted: result => jasmine.currentTest = result
});

jasmine.getEnv().specFilter = function (spec) {
    const grepMatch = !tags || spec.getFullName().match(new RegExp(tags)) != null;
    if (!grepMatch) {
        spec.disable();
    }
    return true;
}

jasmineRunner.execute();
