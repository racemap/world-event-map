FROM node:22-bookworm

# Create a new directory in the working directory of the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Installing the packages
RUN npm install

#Copy the rest of the source files

COPY src/server.ts /app/src/server.ts

# Run the application
CMD ["npm", "start"]

