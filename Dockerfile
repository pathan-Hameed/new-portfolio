# Stage 1: Build the React app
# Give me a machine with Node installed
FROM node:20-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build the React/Vite app → creates dist/ folder
RUN npm run build

# Stage 2: Serve with NGINX
# Give me a lightweight NGINX server
FROM nginx:alpine

# Copy built files from Stage 1 into NGINX's serving folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (NGINX default port)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]