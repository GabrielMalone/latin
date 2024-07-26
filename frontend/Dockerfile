# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the public directory to /app/public
COPY public /app/public

# Expose port 8080
EXPOSE 8080

# Command to run http-server
CMD ["npm", "start"]