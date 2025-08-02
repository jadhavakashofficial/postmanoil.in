#!/bin/bash

# Script to download images from WordPress and optimize them for SEO
# This will help improve Google Image search rankings

echo "🖼️  Starting Postman Oils Image Optimization for SEO..."

# Create directories
echo "📁 Creating image directories..."
mkdir -p public/images/{products,factory,banners,benefits,recipes,icons}

# Product Images - SEO optimized filenames
echo "📥 Downloading product images..."

# Mustard Oil Products
wget -O "public/images/products/postman-mustard-oil-kachi-ghani-1-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/1-1-580x580.png" 2>/dev/null || echo "⚠️  Failed: mustard-1L"

wget -O "public/images/products/postman-mustard-oil-kachi-ghani-5-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/61pg1v3I9zL._SL1080_-580x580.jpg" 2>/dev/null || echo "⚠️  Failed: mustard-5L"

wget -O "public/images/products/postman-mustard-oil-kachi-ghani-15-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/61rbdNGSMKL._SL1500_-580x580.jpg" 2>/dev/null || echo "⚠️  Failed: mustard-15L"

# Groundnut Oil Products
wget -O "public/images/products/postman-groundnut-oil-cold-pressed-1-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/61rmnbqnBQL._SL1100_-580x580.jpg" 2>/dev/null || echo "⚠️  Failed: groundnut-1L"

wget -O "public/images/products/postman-groundnut-oil-cold-pressed-5-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/61htcRuz9NL._SL1500_-580x580.jpg" 2>/dev/null || echo "⚠️  Failed: groundnut-5L"

wget -O "public/images/products/postman-groundnut-oil-cold-pressed-15-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-20-at-3.41.07%E2%80%AFAM.png" 2>/dev/null || echo "⚠️  Failed: groundnut-15L"

# Refined Oil Products
wget -O "public/images/products/postman-refined-groundnut-oil-1-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/516TDqUwbL._SL1080_-580x580.jpg" 2>/dev/null || echo "⚠️  Failed: refined-1L"

wget -O "public/images/products/postman-refined-groundnut-oil-5-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/06/Untitled-18-1-scaled-e1750371753802-800x800.png" 2>/dev/null || echo "⚠️  Failed: refined-5L"

wget -O "public/images/products/postman-refined-groundnut-oil-15-litre.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/61ZEP9YlrRL._SL1100_-580x580.jpg" 2>/dev/null || echo "⚠️  Failed: refined-15L"

# Banner Images
echo "📥 Downloading banner images..."
wget -O "public/images/banners/postman-oils-hero-banner-premium-cooking-oil.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/1.png" 2>/dev/null || echo "⚠️  Failed: hero-banner"

wget -O "public/images/banners/postman-oils-traditional-cold-pressed-process.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/2.png" 2>/dev/null || echo "⚠️  Failed: process-banner"

wget -O "public/images/banners/postman-oils-58-years-legacy-purity.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/05/3.png" 2>/dev/null || echo "⚠️  Failed: legacy-banner"

# Factory Images
echo "📥 Downloading factory images..."
wget -O "public/images/factory/postman-oil-manufacturing-plant-kekri.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8333-scaled.jpg" 2>/dev/null || echo "⚠️  Failed: factory"

wget -O "public/images/factory/automated-oil-bottling-packaging-line.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8326-scaled.jpg" 2>/dev/null || echo "⚠️  Failed: packaging"

wget -O "public/images/factory/raw-material-quality-inspection.jpg" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8244-scaled.jpg" 2>/dev/null || echo "⚠️  Failed: quality"

# Logo
echo "📥 Downloading logo..."
wget -O "public/images/postman-oil-logo.png" \
  "https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png" 2>/dev/null || echo "⚠️  Failed: logo"

# Create placeholder images for missing ones
echo "🎨 Creating placeholder images for benefits..."
# These would need to be replaced with actual images
touch public/images/benefits/mustard-oil-heart-health-benefits.jpg
touch public/images/benefits/mustard-oil-antibacterial-properties.jpg
touch public/images/benefits/mustard-oil-vitamin-e-skin-benefits.jpg
touch public/images/benefits/cold-pressed-mustard-oil-nutrients.jpg
touch public/images/benefits/traditional-kachi-ghani-process.jpg

echo "✅ Image download complete!"
echo ""
echo "📋 Next steps:"
echo "1. Install image optimization tools: npm install -g sharp-cli imagemin-cli"
echo "2. Optimize images for web: ./scripts/optimizeImages.sh"
echo "3. Generate responsive images: ./scripts/generateResponsiveImages.sh"
echo "4. Update any remaining WordPress URLs in components"

# Make scripts executable
chmod +x scripts/*.sh