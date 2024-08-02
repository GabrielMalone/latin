FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Ensure necessary binaries and dependencies are installed
RUN apt-get update && apt-get install -y \
    gnat \
    gprbuild

# Build the Whitaker's Words project
WORKDIR /app/whitakers-words
RUN make -f Makefile

# Move necessary files to a common directory
WORKDIR /app
RUN mv ./whitakers-words/bin/words /app/ && \
    cp /app/whitakers-words/ADDONS.LAT /app/ && \
    cp /app/whitakers-words/DICTFILE.GEN /app/ && \
    cp /app/whitakers-words/EWDSFILE.GEN /app/ && \
    cp /app/whitakers-words/INDXFILE.GEN /app/ && \
    cp /app/whitakers-words/INFLECTS.SEC /app/ && \
    cp /app/whitakers-words/STEMFILE.GEN /app/ && \
    cp /app/whitakers-words/UNIQUES.LAT /app/

# Expose port
EXPOSE 8000

# Run the server
CMD ["node", "server.js"]
