FROM node:slim

WORKDIR /app

COPY ./app/package.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
# CMD ["tail", "-f", "/dev/null"]