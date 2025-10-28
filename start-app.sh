#!/bin/bash

echo "🚀 Video Conference Application Launcher"
echo "========================================"
echo ""
echo "Choose which version to start:"
echo "1) Vite (Recommended - Modern, Fast, No Errors)"
echo "2) Create React App (Legacy - Has React Refresh Issues)"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "Starting Vite application..."
        cd client-vite
        npm run dev
        ;;
    2)
        echo "Starting Create React App (may have errors)..."
        cd client
        npm start
        ;;
    *)
        echo "Invalid choice. Starting Vite application by default..."
        cd client-vite
        npm run dev
        ;;
esac
