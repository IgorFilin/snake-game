FROM node

WORKDIR /appDocker

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn","start"]

