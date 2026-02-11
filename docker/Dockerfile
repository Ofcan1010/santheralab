# Hafif ve güvenli base image
FROM nginx:alpine

# Varsayılan nginx config'i siliyoruz
RUN rm /etc/nginx/conf.d/default.conf

# Kendi configimizi kopyalıyoruz
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Sadece yayınlanacak site klasörünü kopyalıyoruz
COPY site/ /usr/share/nginx/html/

# Port expose (Traefik internal kullanacak)
EXPOSE 80

# Nginx'i foreground'da çalıştır
CMD ["nginx", "-g", "daemon off;"]
