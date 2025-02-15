FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Build the project for production (output will be in the "build" directory)
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration file (ensure this file is present in your project)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


this-command-does-not-exist
