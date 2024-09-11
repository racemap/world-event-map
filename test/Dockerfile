# Stage 1: Build the application
FROM node:22-bookworm AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./
COPY tsconfig.json ./tsconfig.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY source/dapp ./source

# Build the application
RUN npx tsc -p ./tsconfig.json

RUN ls -la /app

# Stage 2: Create the final image with SSH access
FROM node:22-bookworm AS final

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=build /app/source ./source

# Copy package.json and package-lock.json for production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Install SSH server and other necessary packages
RUN apt-get update && apt-get install -y openssh-server

# Create SSH directory
RUN mkdir /var/run/sshd

# Set root password
RUN echo 'root:root' | chpasswd

# Allow root login via SSH (not recommended for production)
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

# Expose ports
EXPOSE 22

# Create a startup script
RUN echo '#!/bin/bash/n/usr/sbin/sshd/npm run startbackendserver' > /start.sh && chmod +x /start.sh

CMD ["/usr/sbin/sshd", "-D"]