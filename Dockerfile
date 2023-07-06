
FROM node:18-alpine


RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo
 
WORKDIR /user/src/app
 
COPY . .

RUN apk --no-cache add curl

RUN npm install npm@latest -g

RUN npm install --global --force yarn
 
RUN yarn

ENV PORT 8080

EXPOSE 8080
 
CMD ["yarn", "start"]