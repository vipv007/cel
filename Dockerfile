# Use an official Node.js runtime as the base image
FROM node:16

# Create the application directory
WORKDIR /celestradepro/src/app/package.json

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI globally
# RUN npm install -g @angular/cli

# # Install project dependencies
# RUN npm install

# Copy the entire project's source code to the container
COPY . .

# Expose the default Angular development server port (4200)
EXPOSE 4200

# Start the Angular development server
CMD ["npm", "start"]
