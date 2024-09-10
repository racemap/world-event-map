# Use the latest Node.js LTS version as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package*.json to the src directory
COPY ./website ./

COPY tsconfig.json /app/tsconfig.json

# Install dependencies
RUN npm install

COPY ./src/server.ts ./src/server.ts

# Expose the port the app runs on
EXPOSE 3050

# Command to run your application
CMD ["npm", "start"]