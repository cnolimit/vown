pipeline {
    agent any
    environment {
        DOCKER_ENV = "ci"
        UNIQUE_BUILD_ID = "${GIT_COMMIT}".substring(0,7)
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    sh('make build')
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh('make test')
                }
            }
        }
    }
}