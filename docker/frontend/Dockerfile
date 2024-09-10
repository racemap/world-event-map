# Stage 1: Build the application
FROM node:22-bookworm AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src/frontend src/frontend

# Build the application
RUN npm run build 

# Stage 2: Create the final image
FROM node:22-bookworm AS final

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json and package-lock.json for production dependencies
COPY package.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port 4000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]