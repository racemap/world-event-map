# Stage 1: Build the application
FROM node:22-bookworm AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./
COPY tsconfig.json app/tsconfig.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY source/dapp app/source

# Build the application
# RUN npm build
RUN npx tsc -p app/tsconfig.json

RUN ls -la /app

# Stage 2: Create the final image
FROM node:22-bookworm AS final

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=build /app/dist ./dist

# Copy package.json and package-lock.json for production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Test
RUN echo "File system at build time:" && ls -R /

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["npm", "run", "startbackendserver"]