FROM node:22-alpine3.24
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
ENV BACKEND_URL=http://host.docker.internal:5000
CMD [ "node", "index.js" ]