# Stage 1: Build the Angular app
FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Use NGINX for serving the Angular app
FROM nginx:alpine

COPY --from=build /app/dist/celestradepro /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 4200

# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]
