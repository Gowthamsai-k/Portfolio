# Step 1: Build
FROM node:20 AS build

WORKDIR /portfolio

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# Step 2: Serve
FROM nginx:alpine

COPY --from=build /portfolio/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]