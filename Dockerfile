FROM node
WORKDIR /energy-consumption-and-charging-app-server
COPY package.json /energy-consumption-and-charging-app-server
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]