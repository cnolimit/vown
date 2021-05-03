FROM node:10
COPY package.json app/package.json
COPY yarn.lock app/yarn.lock
WORKDIR app


COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build