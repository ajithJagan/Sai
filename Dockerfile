FROM nginx:1.21.0-alpine
COPY docker-files/nginx.conf /etc/nginx/
COPY docker-files/blockbots.conf /etc/nginx/conf/
COPY docker-files/botlimit.conf /etc/nginx/conf/
COPY /dist/flex-ui/ 


RUN touch /var/run/nginx.pid && \
  chown -R nobody:nobody /var/run/nginx.pid && \
  chown -R nobody:nobody /var/cache/nginx && \
  chown -R nobody:nobody /opt/www



EXPOSE 8080


USER 65534


CMD nginx
