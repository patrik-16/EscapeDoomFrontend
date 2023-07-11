pipeline {
    agent any
    stages {
        stage('build Frontend') {
            steps {
                echo 'building...'
                sh 'npm install'
            }
        }

        stage('deploy') {
            steps {
                echo 'maven deploy...'

                sh 'chmod +x ./deployz1.sh'
                sh 'chmod +x ./deployz2.sh'

                sh './deployz1.sh'
                script {
                    sleep 5
                }

                sh './deployz2.sh &'
                script {
                    sleep 120
                }
            }
        }
    }
}
