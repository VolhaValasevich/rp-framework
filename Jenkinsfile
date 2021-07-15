pipeline {
    agent any
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner';
                    withSonarQubeEnv() {
                        bat "${scannerHome}/bin/sonar-scanner.bat"
                    }
                }
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
