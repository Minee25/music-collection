# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build CSS
RUN npm run build:css

# Expose the port
EXPOSE 8080

# Start the application
CMD ["npm", "start"] 