FROM node:alpine

ENV HOME=/usr/app

WORKDIR $HOME/calledanatel

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
