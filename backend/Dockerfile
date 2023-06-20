FROM php:8.2-alpine

RUN apk update && apk add -u \
    zlib-dev \
    libzip-dev

RUN docker-php-ext-install zip

RUN apk add postgresql-dev \
    && docker-php-ext-install pdo_pgsql pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY ./src .

RUN composer show

RUN composer install

EXPOSE 8080

# CMD ["php", "-S", "0.0.0.0:8080", "router.php"]
CMD ["tail", "-f", "/dev/null"]
