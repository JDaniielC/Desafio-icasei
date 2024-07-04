FROM node:latest

RUN apt-get update && apt-get install -y nginx

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled/

RUN cp -r dist/* /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]