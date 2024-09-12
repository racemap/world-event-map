# Stage 1: Build the application
FROM node:latest AS build

# Set the working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json first for better caching
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./source/dapp ./source

COPY tsconfig.json /usr/app/tsconfig.json

# Build the application
RUN npx tsc

#Final image
FROM node:latest AS final

# Set the working directory

WORKDIR /usr/app

# Copy the built files from the builder stage
COPY --from=build /usr/app/dist ./source

COPY package*.json .

# Install dependencies
RUN npm install

WORKDIR /usr/app

EXPOSE 4000

CMD ["npm", "run", "startbs"]
