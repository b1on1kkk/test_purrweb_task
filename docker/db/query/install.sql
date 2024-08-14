\connect postgres

DROP DATABASE IF EXISTS SagTech;

DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_catalog.pg_user
      WHERE  usename = 'user') THEN
      CREATE USER "user" WITH PASSWORD 'user';
   END IF;
END
$$;

CREATE DATABASE SagTech OWNER "user";