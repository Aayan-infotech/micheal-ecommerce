# Kubernetes Deployment Guide for E-commerce Application

## Overview
This guide explains how to deploy a full-stack e-commerce application on a Kubernetes cluster using separate deployments for the backend and frontend, along with an Ingress for routing and SSL configuration using Cert-Manager.

## Prerequisites
- Kubernetes cluster (EKS, AKS, GKE, or Minikube)
- kubectl installed and configured
- Nginx Ingress Controller installed
- Cert-Manager installed for SSL certificate management
- Docker images for backend and frontend available in a container registry (Docker Hub in this case)

---

## 1. Deploying the Backend

### Why We Need This:
The backend handles API requests and connects to the database, serving business logic for the application.

### Backend Deployment (k8s-deploy.yml):
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: micheal-back-deployment
  labels:
    app: micheal-back
spec:
  replicas: 2
  selector:
    matchLabels:
      app: micheal-back
  template:
    metadata:
      labels:
        app: micheal-back
    spec:
      containers:
        - name: micheal-back
          image: amazingatul/ecom-backend:m2
          imagePullPolicy: Always
          ports:
            - containerPort: 3129
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  name: micheal-back-service
spec:
  selector:
    app: micheal-back
  ports:
    - protocol: TCP
      port: 3129
      targetPort: 3129
  type: ClusterIP
```

### Apply the Deployment:
```sh
kubectl apply -f k8s-deploy.yml
```

---

## 2. Deploying the Frontend

### Why We Need This:
The frontend is the user interface that interacts with the backend via API calls.

### Frontend Deployment (k8s-deploy.yml):
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: micheal-web-deployment
  labels:
    app: micheal-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: micheal-web
  template:
    metadata:
      labels:
        app: micheal-web
    spec:
      containers:
        - name: micheal-web
          image: amazingatul/ecom-web:m1
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: micheal-web-service
spec:
  selector:
    app: micheal-web
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

### Apply the Deployment:
```sh
kubectl apply -f k8s-deploy.yml
```

---

## 3. Configuring Ingress for Routing

### Why We Need This:
Ingress routes incoming traffic to the appropriate services based on path rules and enables HTTPS via TLS certificates.

### Ingress Configuration (ingress.yml):
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: micheal-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  rules:
  - host: ecom.atulrajput.tech
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: micheal-web-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: micheal-back-service
            port:
              number: 3129
  tls:
  - hosts:
    - ecom.atulrajput.tech
    secretName: atulecom
```

### Apply the Ingress:
```sh
kubectl apply -f ingress.yml
```

---

## 4. Configuring ClusterIssuer for SSL

### Why We Need This:
Cert-Manager automates the issuance and renewal of SSL certificates from Let's Encrypt, securing the website with HTTPS.

### ClusterIssuer Configuration (cluster-issuer.yaml):
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: atulrajput.work@gmail.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: atulecom
    solvers:
    - http01:
        ingress:
          class: nginx
```

### Apply the ClusterIssuer:
```sh
kubectl apply -f cluster-issuer.yaml
```

---

## 5. Verifying Deployment
### Check Pods and Services:
```sh
kubectl get pods
kubectl get svc
```
### Check Ingress:
```sh
kubectl get ingress
```

---

## 6. Debugging Common Issues

### 6.1 Ingress Not Working
- Ensure Nginx Ingress Controller is installed:
  ```sh
  kubectl get pods -n kube-system | grep ingress
  ```
- Verify that the Ingress resource is created correctly:
  ```sh
  kubectl describe ingress micheal-ingress
  ```

### 6.2 SSL Certificate Not Issued
- Check Cert-Manager logs:
  ```sh
  kubectl logs -n cert-manager -l app=cert-manager
  ```
- Verify that ClusterIssuer is created:
  ```sh
  kubectl get clusterissuer
  ```

### 6.3 Backend or Frontend Not Accessible
- Ensure services are running:
  ```sh
  kubectl get svc
  ```
- Verify that the correct ports are exposed in the service.

---

## Conclusion
This documentation provides a step-by-step process to deploy an e-commerce application on Kubernetes, including backend and frontend deployments, Ingress for routing, and SSL configuration using Cert-Manager.

