FROM node

WORKDIR /appDocker

COPY package.json .

RUN yarn

COPY . .

ENV PORT 3001

EXPOSE $PORT

CMD ["yarn","start"]

