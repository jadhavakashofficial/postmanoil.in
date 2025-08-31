// Script to generate static paths for dynamic routes
const fs = require('fs');
const path = require('path');

// Product IDs that exist in the system
const productIds = [
  // Mustard Oil Products
  '1819', // Kacchi Ghani Mustard Oil 1Ltr
  '1855', // Kacchi Ghani Mustard Oil 5Ltr
  '1858', // Kacchi Ghani Mustard Oil 15Ltr
  // Groundnut Oil Products
  '1862', // Groundnut Filter Oil 1Ltr
  '1870', // Groundnut Filtered Oil 5 Ltr
  '1872', // Groundnut Filtered Oil 15Ltr
  // Refined Groundnut Oil Products
  '1882', // Refined Groundnut Oil 1Ltr
  '3011', // Refined Groundnut Oil 5Ltr
  '1897', // Refined Groundnut Oil 15Ltr
];

// Recipe slugs
const recipeSlugs = [
  'aloo-gobi',
  'dal-tadka',
  'vegetable-biryani',
  'paneer-tikka',
  'samosa',
  'pakora'
];

// Generate exportPathMap entries
const generatePaths = () => {
  const paths = {
    '/': { page: '/' },
    '/about-us': { page: '/about-us' },
    '/contact-us': { page: '/contact-us' },
    '/certifications': { page: '/certifications' },
    '/connect-for-dealership': { page: '/connect-for-dealership' },
    '/groundnut-oil': { page: '/groundnut-oil' },
    '/mustard-oil': { page: '/mustard-oil' },
    '/refined-groundnut-oil': { page: '/refined-groundnut-oil' },
    '/postman-recipes': { page: '/postman-recipes' },
    '/postman-supplements': { page: '/postman-supplements' },
    '/privacy-policy': { page: '/privacy-policy' },
    '/terms-and-conditions': { page: '/terms-and-conditions' },
    '/how-postman-oil-is-made': { page: '/how-postman-oil-is-made' },
  };

  // Add product pages
  productIds.forEach(id => {
    paths[`/product/${id}`] = { 
      page: '/product/[id]',
      query: { id }
    };
  });

  // Add recipe pages
  recipeSlugs.forEach(slug => {
    paths[`/recipes/${slug}`] = {
      page: '/recipes/[slug]',
      query: { slug }
    };
  });

  return paths;
};

console.log('Generated paths:', JSON.stringify(generatePaths(), null, 2));
module.exports = { generatePaths, productIds, recipeSlugs };