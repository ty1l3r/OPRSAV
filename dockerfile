//en cours de configuration


FROM php:7.3.23-apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN echo fr_FR.UTF-8 UTF-8 > /etc/locale.gen && locale-gen
RUN addgroup --system H4KH4 --gid 1000 && adduser --system H4KH4 --uid 1000 --ingroup H4KH4

ADD . /app/
WORKDIR /app

RUN composer install
RUN npm install

EXPOSE 8000
VOLUME /app/logs

CMD symfony serve --no-tls
CMD encore dev-server
