FROM index.docker.io/library/node:20.11-buster-slim
WORKDIR "/backend"
COPY package.json /backend/package.json
RUN npm i
COPY --chown=backend:backend . /backend
EXPOSE 5000
CMD node index.js