# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY client-nextjs/package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd server && npm install

# Copy source code
COPY client-nextjs/ ./
COPY server/ ./server/

# Build the Next.js application
RUN npm run build

# Expose ports
EXPOSE 3000 5001

# Start both servers
CMD ["sh", "-c", "cd server && node index.js & cd .. && npm start"]
