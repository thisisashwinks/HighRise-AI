#!/bin/bash
# Clean build script - ensures fresh build cache
# Usage: ./scripts/clean-build.sh

set -e

echo "🧹 Cleaning Next.js build cache..."
rm -rf .next

echo "🔨 Running production build..."
npm run build

echo "✅ Build completed successfully!"
