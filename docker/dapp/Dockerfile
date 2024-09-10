FROM node:22-bookworm

# Create a new directory in the working directory of the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./
COPY package-lock.json ./

# Copy tsconfig.json
COPY tsconfig.json /app/tsconfig.json

# Installing the packages
RUN npm install

# Copy the rest of the source files
COPY ./src ./src

EXPOSE 3000

# Run the application
CMD ["npm", "start"]

