# rp-framework
test framework for ReportPortal

## Installation
```
npm i
```
After the installation it will update webdriver-manager.

## Usage

### Run all tests
```
npm test
```

#### Tags
To run only selected tests, pass a string with tags as a command line argument. 
- Several tags shouldbe separated with commas.
```
npm test -- --tags "@login, @dashboard"
npm test -- -t @smoke
```

#### Environments
To run tests on a certain environment, pass the env as a command line argument.

Available environments:
- local: http://localhost:8080/ (default)
- epam: https://rp.epam.com/

```
npm test -- --env local
npm test -- -e epam
```

#### Capabilities
To run tests with certain capabilities, pass them as command line arguments.

Available capabilities:

--browser (-b): defines what browser will be used for running tests. Default: 'chrome'.
--instances (-i): defines the number of WebDriver instances. Use this to run tests in parallel. Default: 1.

```
npm test -- --browserName "chrome" --maxInstances 5
npm test -- -b "chrome" -i 5
```
