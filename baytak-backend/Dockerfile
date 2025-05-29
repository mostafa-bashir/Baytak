# Use Node official image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all backend source files
COPY . .

# Expose the port backend listens on (e.g., 3000)
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "start:prod"]
