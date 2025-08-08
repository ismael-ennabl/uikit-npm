#!/bin/bash

echo "🚀 Starting Storybook for Ennabl UI Kit Beta..."
echo "📖 Storybook will be available at: http://localhost:6006"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start Storybook
echo "🎨 Starting Storybook..."
npm run storybook
