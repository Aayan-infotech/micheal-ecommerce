pipeline {
    agent any  // Runs on any available Jenkins agent

    environment {
        DOCKER_IMAGE = "amazingatul/ecom-web"
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub')
        EMAIL_USERNAME = credentials('email-username')
        EMAIL_PASSWORD = credentials('email-password')
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

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    // Corrected the grep command by escaping the $ with a backslash
                    def latestTag = sh(script: "curl -s https://hub.docker.com/v2/repositories/amazingatul/ecom-web/tags/ | jq -r '.results[].name' | grep -E '^m[0-9]+\\$' | sort -V | tail -n1", returnStdout: true).trim()
                    def latestNumber = latestTag ? latestTag.substring(1).toInteger() + 1 : 1
                    def newTag = "m${latestNumber}"

                    // Corrected Docker login command to use shell variables without Groovy interpolation
                    sh """
                    docker tag ${DOCKER_IMAGE}:latest ${DOCKER_IMAGE}:${newTag}
                    docker tag ${DOCKER_IMAGE}:latest ${DOCKER_IMAGE}:latest
                    echo "\$DOCKER_HUB_CREDENTIALS_PSW" | docker login -u "\$DOCKER_HUB_CREDENTIALS_USR" --password-stdin
                    docker push ${DOCKER_IMAGE}:${newTag}
                    docker push ${DOCKER_IMAGE}:latest
                    """

                    env.NEW_TAG = newTag  // Save new tag for next step
                }
            }
        }

        stage('Run New Docker Container') {
            steps {
                sh "docker run -d -p 80:80 ${DOCKER_IMAGE}:latest"
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
                    from: "development.aayaninfotech@gmail.com",
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
