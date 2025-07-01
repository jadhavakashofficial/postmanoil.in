// migrate-urls.js
// Place this file in your project root folder (same level as package.json)

const fs = require('fs');
const path = require('path');

// Define all URL replacements
const URL_REPLACEMENTS = {
  // WordPress API endpoints
  'https://postmanoil.com/blog/wp-json/wp/v2/posts': 'https://postmanoil.com/blog/wp-json/wp/v2/posts',
  'https://postmanoil.com/blog/wp-json/wp/v2/': 'https://postmanoil.com/blog/wp-json/wp/v2/',
  'https://postmanoil.com/blog/wp-json/wc/v3/': 'https://postmanoil.com/blog/wp-json/wc/v3/',
  
  // WordPress content uploads (images)
  'https://postmanoil.com/blog/wp-content/uploads/': 'https://postmanoil.com/blog/wp-content/uploads/',
  'https://postmanoil.com/blog/wp-content/themes/': 'https://postmanoil.com/blog/wp-content/themes/',
  
  // WooCommerce base URL in components
  "const WC_BASE_URL = 'https://postmanoil.com/blog'": "const WC_BASE_URL = 'https://postmanoil.com/blog'",
  'WC_BASE_URL = "https://postmanoil.com/blog"': 'WC_BASE_URL = "https://postmanoil.com/blog"',
};

// Function to get all JavaScript and JSX files
function getAllJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next' && file !== 'out') {
        getAllJsFiles(filePath, fileList);
      }
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to replace URLs in a file
function replaceUrlsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply all replacements
    Object.entries(URL_REPLACEMENTS).forEach(([oldUrl, newUrl]) => {
      if (content.includes(oldUrl)) {
        content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
        modified = true;
        console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)} - ${oldUrl}`);
      }
    });
    
    // Write back if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Main migration function
function migrateUrls() {
  console.log('🚀 Starting URL migration...\n');
  
  // Get project root directory
  const projectRoot = process.cwd();
  console.log('📁 Project root:', projectRoot);
  
  // Get all JS/JSX files
  const jsFiles = getAllJsFiles(projectRoot);
  console.log(`📋 Found ${jsFiles.length} JavaScript/TypeScript files\n`);
  
  // Process each file
  jsFiles.forEach(replaceUrlsInFile);
  
  console.log('\n✨ Migration completed!');
  console.log('\n📋 Summary of changes:');
  console.log('• WordPress API: /wp-json/ → /blog/wp-json/');
  console.log('• Images: /wp-content/uploads/ → /blog/wp-content/uploads/');
  console.log('• WooCommerce base URL updated');
  
  console.log('\n🔧 Next steps:');
  console.log('1. Check the changes: git diff');
  console.log('2. Test locally: npm run dev');
  console.log('3. Build for production: npm run build');
  console.log('4. Export static files: npm run export');
}

// Run the migration
migrateUrls();