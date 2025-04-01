# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Create upload directories
RUN mkdir -p /app/uploads/products /app/uploads/sellers
RUN chmod -R 755 /app/uploads

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the server using nodemon for hot reloading
CMD ["npm", "run", "dev"]

