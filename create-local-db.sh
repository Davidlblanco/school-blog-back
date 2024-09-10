#!/bin/bash

# Wait until PostgreSQL is ready
until docker run --name blog-psql -p 5432:5432 -e POSTGRES_PASSWORD=education -d postgres; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Execute the commands
docker exec -it blog-psql-docker psql -U postgres -c "CREATE DATABASE blog;"
npm run localseed
npm run localstudio