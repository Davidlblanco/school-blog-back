FROM node:22

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dockerseed && npm start"]