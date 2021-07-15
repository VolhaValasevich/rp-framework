pipeline {
    agent any
    stages {
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner';
                    withSonarQubeEnv() {
                        bat "${scannerHome}/bin/sonar-scanner.bat"
                    }
                }
                waitForQualityGate abortPipeline: true
            }
        }
        stage('Run tests') {
            steps {
                bat "npm i"
                bat "npm test"
            }
        }
    }
    post {
        always {
            junit 'reports/results.xml'
        }
    }
}
