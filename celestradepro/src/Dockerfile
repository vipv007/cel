FROM node:latest as build
WORKDIR /usr/local/app
Copy ./ /usr/local/app/
RUN npm install
RUN npm run build


FROM ngnix:latest
COPY --from=build /usr/local/app/dist/app/usr/share/nginx/html
EXPOSE 80