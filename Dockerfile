FROM node:16 as build-step
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Build step #2: build an nginx container
FROM nginx:1.19.1-alpine
COPY --from=build-step /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]