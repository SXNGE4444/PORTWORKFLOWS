#!/bin/bash

# Usage: ./auto-commit.sh "Your commit message"

# Check for commit message argument
if [ -z "$1" ]; then
  echo "Usage: $0 \"Your commit message\""
  exit 1
fi

# Stage all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Push to the main branch
git push origin main
