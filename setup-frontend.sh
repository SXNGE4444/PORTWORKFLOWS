#!/bin/bash

# Exit immediately if any command fails
set -e

# Navigate into the frontend directory (create if it doesn't exist)
mkdir -p frontend
cd frontend

# Scaffold a new React + TypeScript project using Vite
npm create vite@latest portflow-frontend -- --template react-ts

# Navigate into the newly created project folder
cd portflow-frontend

# Install the initial project dependencies
npm install

echo "✅ Frontend scaffolding complete! Your project is ready at: frontend/portflow-frontend"