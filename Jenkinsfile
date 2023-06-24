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
            echo 'deploying...'

            sh 'chmod +x ./deployz.sh'
            sh './deployz.sh &'

            echo 'Done!'
            }
        }
    }
}
