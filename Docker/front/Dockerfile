FROM mhart/alpine-node:latest

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app
COPY . /usr/src/app/

ARG API_HOST=$API_HOST
ARG PORT=$PORT
ENV API_HOST=$API_HOST
ENV PORT=$PORT

# RUN npm install
RUN npm run build
#RUN npm run migrate

EXPOSE $PORT

#CMD ["npm", "start"]