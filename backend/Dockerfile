FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Start the server using nodemon for hot reloading
CMD ["npm", "run", "dev"]
