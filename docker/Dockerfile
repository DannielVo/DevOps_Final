# Use official lightweight Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files from source folder
COPY source/package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all source code
COPY source/ .

# Create uploads directory (match với volume)
RUN mkdir -p /app/public/uploads

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]