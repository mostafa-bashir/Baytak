FROM node:18-alpine

RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

# Start using production script
CMD ["npm", "run", "start:prod"]
