FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g prisma

COPY . .

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
