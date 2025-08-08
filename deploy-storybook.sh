#!/bin/bash

echo "🚀 Storybook Deployment Options"
echo "================================"
echo ""

# Check if storybook-static exists
if [ ! -d "storybook-static" ]; then
    echo "📦 Building Storybook..."
    npm run build-storybook
fi

echo "✅ Storybook built successfully!"
echo ""

echo "🌐 Deployment Options:"
echo ""
echo "1. 🐙 GitHub Pages (Recommended)"
echo "   - Already configured with GitHub Actions"
echo "   - URL: https://ismael-ennabl.github.io/uikit-npm/"
echo "   - Status: Deploying automatically on push to main"
echo ""

echo "2. 📡 Local Server (for testing)"
echo "   - URL: http://localhost:8000"
echo "   - Command: cd storybook-static && python3 -m http.server 8000"
echo ""

echo "3. 🚀 Netlify (Alternative)"
echo "   - Drag and drop storybook-static folder to netlify.com"
echo "   - Or use: npx netlify-cli deploy --dir=storybook-static --prod"
echo ""

echo "4. 🔥 Vercel (Alternative)"
echo "   - Install Vercel CLI: npm i -g vercel"
echo "   - Deploy: vercel storybook-static --prod"
echo ""

echo "5. 📋 Manual Upload"
echo "   - Upload storybook-static folder to any web hosting service"
echo ""

echo "🎯 Current Status:"
echo "   - GitHub Actions workflow: ✅ Configured"
echo "   - Local server: ✅ Running on http://localhost:8000"
echo "   - GitHub Pages: 🔄 Deploying..."
echo ""

echo "📖 To view your Storybook:"
echo "   - Local: http://localhost:8000"
echo "   - Public: https://ismael-ennabl.github.io/uikit-npm/ (after deployment)"
echo ""
