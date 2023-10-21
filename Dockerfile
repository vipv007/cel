# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular app source code to the container
COPY . .

# Build the Angular app
RUN npm run build

# Use a smaller base image for the final image
FROM nginx:alpine

# Copy the built Angular app from the build stage to the nginx web server's directory
COPY --from=build /app/dist/celestradepro /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]
