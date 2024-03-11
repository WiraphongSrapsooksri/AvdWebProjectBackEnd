# Use an official Node runtime as a parent image
FROM node:18


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# If you're building your code for production
# RUN npm ci --only=production

# Bundle the app source inside the Docker image
COPY . .

# Make port available to the world outside this container
EXPOSE 4000

# Define the command to run your app
# This uses npm start which will typically run "node index.js"
CMD [ "npm", "start" ]
