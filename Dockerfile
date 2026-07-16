# ------------------------------------------------------------
# Stage 1: Build the Angular app using Node
# ------------------------------------------------------------
# Angular CLI and npm run build require Node, so we start from
# an official Node image. Version 18 is stable and widely used.
FROM node:18 AS build

# Create a working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache npm install layers, making rebuilds faster.
COPY package*.json ./

# Install dependencies (Angular, TypeScript, etc.)
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Angular project for production
# This outputs static files into /app/dist/best-buy
RUN npm run build --prod


# ------------------------------------------------------------
# Stage 2: Serve the built Angular app using Nginx
# ------------------------------------------------------------
# Nginx is a lightweight, fast web server perfect for static files.
FROM nginx:alpine

# Copy the Angular build output from Stage 1 into Nginx's public folder
COPY --from=build /app/dist/best-buy /usr/share/nginx/html

# Expose port 80 so Docker or hosting providers can map it
EXPOSE 80

# Nginx starts automatically using its default command
# No CMD needed — the base image handles it.
