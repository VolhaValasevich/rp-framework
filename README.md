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
