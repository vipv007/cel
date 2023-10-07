# # Use an official Node.js runtime as the base image
# FROM node:16

# # Create the application directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install Angular CLI globally
# RUN npm install -g @angular/cli

# # Install project dependencies
# RUN npm install

# # Copy the entire project's source code to the container
# COPY . .

# # Expose the default Angular development server port (4200)
# EXPOSE 4200

# # Start the Angular development server
# CMD ["ng", "serve", "--host", "0.0.0.0"]
FROM node:16 as build
ARG ENV

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN if [ "$ENV" = "dev" ]; then npm run build-dev ; fi
RUN if [ "$ENV" = "test" ]; then npm run build-test; fi
RUN if [ "$ENV" = "prod" ]; then npm run build-prod; fi

FROM node:12
WORKDIR /app
COPY --from=build /usr/local/app/dist/app /app
RUN npm i -g serve@13.0.0
CMD ["serve","-s","-l","80"]
EXPOSE 80