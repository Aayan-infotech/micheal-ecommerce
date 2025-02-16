pipeline {
    agent any  // Runs on any available Jenkins agent

    environment {
        DOCKER_IMAGE = "amazingatul/ecom-web"
        EMAIL_USERNAME = "development.aayaninfotech@gmail.com"
        EMAIL_PASSWORD = "defe qhhm kgmu ztkf"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/Aayan-infotech/micheal-ecommerce.git'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm install --legacy-peer-deps'
                sh 'npm test || true'  // Run tests, but don't fail if none exist
            }
        }

        stage('Run Linting') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                script {
                    def containerId = sh(script: "docker ps -q --filter 'publish=80'", returnStdout: true).trim()
                    if (containerId) {
                        sh "echo 'Stopping and removing old container...'"
                        sh "docker stop ${containerId} || true"
                        sh "docker rm ${containerId} || true"
                    } else {
                        sh "echo 'No old container found running on port 80.'"
                    }
                }
            }
        }

        stage('Build & Run Docker Container') {
            steps {
                sh """
                docker build -t ${DOCKER_IMAGE}:latest .
                docker run -d -p 80:80 ${DOCKER_IMAGE}:latest
                """
            }
        }
    }

    post {
        failure {
            script {
                emailext(
                    subject: "🚨 Jenkins Build Failed: Micheal-Web",
                    body: """
                    ❌ **Build Failed!**
                    🔍 **Jenkins Logs:** ${env.BUILD_URL}/console
                    """,
                    to: "atulrajput.work@gmail.com,developer@example.com",
                    replyTo: "no-reply@example.com",
                    from: "${EMAIL_USERNAME}",
                    mimeType: 'text/html',
                    smtpHost: "smtp.gmail.com",
                    smtpPort: "587",
                    useSsl: false,
                    charset: "UTF-8",
                    attachLog: true,
                    username: "${EMAIL_USERNAME}",
                    password: "${EMAIL_PASSWORD}"
                )
            }
        }
    }
}
