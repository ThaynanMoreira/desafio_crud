FROM mhart/alpine-node:latest

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/api && cp -a /tmp/node_modules /usr/src/api/

WORKDIR /usr/src/api
COPY . /usr/src/api/

# RUN npm install
RUN npm run build
#RUN npm run migrate

EXPOSE 3000

#CMD ["npm", "start"]