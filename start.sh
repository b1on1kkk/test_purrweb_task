#!/bin/sh

echo "Starting start.sh script..."

while ! nc -z postgres 5432; do   
  sleep 1
done

echo "Database server is ready."


cd /app/apps/prisma/models


prisma db push
prisma generate

echo "Migration completed."


npm run start:dev


echo "Nest server started."
