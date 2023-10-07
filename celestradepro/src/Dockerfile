# Stage 1: Build the application
FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:latest
COPY --from=build /usr/local/app/dist/app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
