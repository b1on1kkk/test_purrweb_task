FROM postgres:latest

COPY ./docker/db/query/install.sql /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/install.sql