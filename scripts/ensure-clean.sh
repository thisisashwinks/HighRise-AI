#!/bin/bash
# Ensures clean Next.js cache before any operation
# This script kills any running dev servers and cleans the cache

set -e

echo "🛑 Stopping any running Next.js processes..."
pkill -f "next dev" 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "🧹 Cleaning Next.js build cache..."
rm -rf .next

echo "✅ Cache cleaned and processes stopped"
