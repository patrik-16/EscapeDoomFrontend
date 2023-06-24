pipeline {
    agent any

    stages {
        stage('build Frontend') {
            steps {
                echo 'building...'
                sh 'npm install'
            }
        }

        stage('run Frontend') {
            steps {
                echo 'running...'
                sh 'npm run build'
            }
        }

        stage('deploy') {
            steps {
            echo 'deploying...'

            sh 'chmod +x ./deployz.sh'
            sh './deployz.sh &'

            echo 'Done!'
            }
        }
    }
}
