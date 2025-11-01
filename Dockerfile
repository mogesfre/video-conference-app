# Dockerfile for Railway - NOT USED
# Railway deploys backend and frontend as separate services
# This file is kept for reference but Railway will use Nixpacks instead
#
# To deploy:
# 1. Create TWO separate services in Railway
# 2. Backend service: Root Directory = "server"
# 3. Frontend service: Root Directory = "client-nextjs"
# 4. Railway will auto-detect and use Nixpacks, ignoring this Dockerfile

FROM node:18-alpine

WORKDIR /app

# This Dockerfile is intentionally left incomplete
# Railway should use Nixpacks for each service separately
