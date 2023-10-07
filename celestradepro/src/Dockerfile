# Use an official Node.js runtime as the base image
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Angular CLI globally (if not already installed)
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the entire project's source code to the container
COPY . .

# Build the Angular application (you can adjust this command if needed)
RUN ng build --prod

# Use a lightweight Nginx image as the final base image
FROM nginx:alpine

# Copy the built Angular application from the builder stage to the Nginx directory
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
