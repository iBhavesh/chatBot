FROM node:18.2-alpine3.15 AS BUILDER
WORKDIR /workspace
COPY ["package.json", "package-lock.json*", "yarn.lock*", "./"]
RUN yarn install 
COPY --chown=node:node . .
Run yarn build
RUN yarn install --production

FROM node:18.2-alpine3.15
WORKDIR /workspace
COPY --from=BUILDER  /workspace .
CMD ["yarn","start"]