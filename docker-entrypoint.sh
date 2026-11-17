#!/bin/sh
set -e

echo "[entrypoint] applying migrations"
npx prisma migrate deploy

echo "[entrypoint] seeding database"
npx prisma db seed

echo "[entrypoint] starting application"
exec node dist/main.js
