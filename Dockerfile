FROM node:22

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

# trocar o npm start por node 
CMD ["sh", "-c", "npx prisma generate && npm run dockerseed && node dist/src/main.js"]