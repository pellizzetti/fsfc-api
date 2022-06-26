FROM node:16-alpine AS dependencies
WORKDIR /var/app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install

FROM node:16-alpine AS runtime
WORKDIR /home/node/app
COPY --chown=node:node --from=dependencies /var/app/node_modules node_modules/
COPY . .
ENTRYPOINT ["sh", ".docker/entrypoint.sh"]