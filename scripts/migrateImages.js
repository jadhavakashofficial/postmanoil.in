// scripts/migrateImages.js
// Script to update all WordPress image URLs to local SEO-optimized images

const fs = require('fs');
const path = require('path');

// Mapping of WordPress URLs to local SEO-optimized filenames
const imageMapping = {
  // Product Images
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/1-1-580x580.png': '/images/products/postman-mustard-oil-kachi-ghani-1-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/61pg1v3I9zL._SL1080_-580x580.jpg': '/images/products/postman-mustard-oil-kachi-ghani-5-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/61rmnbqnBQL._SL1100_-580x580.jpg': '/images/products/postman-groundnut-oil-cold-pressed-1-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/61htcRuz9NL._SL1500_-580x580.jpg': '/images/products/postman-groundnut-oil-cold-pressed-5-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/516TDqUwbL._SL1080_-580x580.jpg': '/images/products/postman-refined-groundnut-oil-1-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/Untitled-18-1-scaled-e1750371753802-800x800.png': '/images/products/postman-refined-groundnut-oil-5-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/61rbdNGSMKL._SL1500_-580x580.jpg': '/images/products/postman-mustard-oil-kachi-ghani-15-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-20-at-3.41.07%E2%80%AFAM.png': '/images/products/postman-groundnut-oil-cold-pressed-15-litre.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/61ZEP9YlrRL._SL1100_-580x580.jpg': '/images/products/postman-refined-groundnut-oil-15-litre.jpg',
  
  // Hero/Banner Images
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/1.png': '/images/banners/postman-oils-hero-banner-premium-cooking-oil.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/2.png': '/images/banners/postman-oils-traditional-cold-pressed-process.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/3.png': '/images/banners/postman-oils-58-years-legacy-purity.jpg',
  
  // Factory/Process Images
  'https://www.zettafarms.com/wp-content/uploads/2024/01/blog-3.jpg': '/images/factory/cold-pressed-oil-extraction-process.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/1.png': '/images/factory/postman-oil-quality-control-testing.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8333-scaled.jpg': '/images/factory/postman-oil-manufacturing-plant-kekri.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8326-scaled.jpg': '/images/factory/automated-oil-bottling-packaging-line.jpg',
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8244-scaled.jpg': '/images/factory/raw-material-quality-inspection.jpg',
  
  // Logo
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png': '/images/postman-oil-logo.png',
  
  // Icons and other images
  'https://postmanoil.com/blog/wp-content/uploads/2025/07/gmp_logo.jpg': '/images/icons/gmp-certified-logo.png',
  'https://postmanoil.com/blog/wp-content/uploads/2025/07/iso_logo.jpg': '/images/icons/iso-certified-logo.png',
  'https://postmanoil.com/blog/wp-content/uploads/2025/07/haccp_logo.jpg': '/images/icons/haccp-certified-logo.png'
};

// Alt text mapping for better SEO
const altTextMapping = {
  '/images/products/postman-mustard-oil-kachi-ghani-1-litre.jpg': 'Postman Mustard Oil 1 Litre - Pure Kachi Ghani Cold Pressed Sarson Ka Tel',
  '/images/products/postman-mustard-oil-kachi-ghani-5-litre.jpg': 'Postman Mustard Oil 5 Litre Jar - Pure Kachi Ghani Cold Pressed',
  '/images/products/postman-groundnut-oil-cold-pressed-1-litre.jpg': 'Postman Groundnut Oil 1 Litre - Cold Pressed Moongfali Tel',
  '/images/products/postman-groundnut-oil-cold-pressed-5-litre.jpg': 'Postman Groundnut Oil 5 Litre - Pure Cold Pressed Peanut Oil',
  '/images/products/postman-refined-groundnut-oil-1-litre.jpg': 'Postman Refined Groundnut Oil 1 Litre - Premium Cooking Oil',
  '/images/products/postman-refined-groundnut-oil-5-litre.jpg': 'Postman Refined Groundnut Oil 5 Litre - Premium Quality',
  '/images/banners/postman-oils-hero-banner-premium-cooking-oil.jpg': 'Postman Oils - Premium Cooking Oil Manufacturer Since 1967',
  '/images/factory/postman-oil-manufacturing-plant-kekri.jpg': 'Postman Oil Manufacturing Plant - RIICO Industrial Area Kekri Rajasthan',
  '/images/postman-oil-logo.png': 'Postman Oils Logo - The Legacy of Purity Since 1967'
};

// Files to update
const filesToUpdate = [
  'components/FeaturedProducts.js',
  'components/HeroSection.js',
  'components/HowOilIsMade.js',
  'components/PostmanOilCategories.js',
  'components/AboutUsSection.js',
  'components/Footer.js',
  'components/Header.js',
  'components/WhyChoosePostman.js',
  'pages/groundnut-oil.js',
  'pages/mustard-oil.js',
  'pages/refined-groundnut-oil.js',
  'pages/product/[id].js'
];

function updateImageUrls() {
  filesToUpdate.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;
      
      // Replace WordPress URLs with local URLs
      Object.entries(imageMapping).forEach(([wpUrl, localUrl]) => {
        if (content.includes(wpUrl)) {
          content = content.replace(new RegExp(wpUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl);
          updated = true;
        }
      });
      
      // Update image tags to include proper alt text
      Object.entries(altTextMapping).forEach(([url, altText]) => {
        const regex = new RegExp(`(src="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*?)(?:alt="[^"]*")?`, 'g');
        content = content.replace(regex, `$1 alt="${altText}"`);
      });
      
      if (updated) {
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Updated: ${filePath}`);
      }
    }
  });
}

// Generate image download script
function generateDownloadScript() {
  const downloadScript = `#!/bin/bash
# Download images from WordPress and optimize for SEO

echo "Creating directories..."
mkdir -p public/images/{products,factory,recipes,banners,icons}

echo "Downloading and optimizing images..."

# Product Images
${Object.entries(imageMapping).map(([wpUrl, localPath]) => 
  `wget -O "public${localPath}" "${wpUrl}" 2>/dev/null || echo "Failed: ${localPath}"`
).join('\n')}

echo "Image migration complete!"
`;

  fs.writeFileSync('download-images.sh', downloadScript);
  console.log('✅ Created download-images.sh script');
}

console.log('🚀 Starting image URL migration...');
updateImageUrls();
generateDownloadScript();
console.log('✅ Migration complete!');
console.log('📌 Next steps:');
console.log('1. Run: chmod +x download-images.sh');
console.log('2. Run: ./download-images.sh');
console.log('3. Optimize images with: npm run optimize-images');