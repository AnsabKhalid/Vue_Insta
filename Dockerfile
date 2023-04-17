# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files into the Docker image
COPY . .

# Build the project
RUN npm run build

# Expose the port that the application will be running on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
