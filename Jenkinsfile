node {
  stage('Checkout SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv() {
      bat "${scannerHome}/bin/sonar-scanner.bat"
    }
  }
  stage('Install packages') {
    bat "npm i"
  }
  stage('Run tests') {
    bat "npm test || exit 0"
  }
  stage('Publish artifacts') {
    archiveArtifacts artifacts: 'reports/results.xml', followSymlinks: false
  }
}
