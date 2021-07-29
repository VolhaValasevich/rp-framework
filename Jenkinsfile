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
        stage('Docker-compose') {
            steps {
                bat "docker-compose up -d"
            }
        }
        stage('Run tests in docker') {
            steps {
                bat "docker exec rp-framework npm test -- -e local-docker"
            }
        }
    }
    post {
        always {
            junit 'reports/results.xml'
            bat "docker-compose down"
            bat "docker rmi rp-framework_e2e"
        }
    }
}
