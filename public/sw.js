// Service Worker for Postman Oils
const CACHE_NAME = 'postman-oils-v1';
const urlsToCache = [
  '/',
  '/styles/globals.css',
  '/styles/performance.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png',
  'https://postmanoil.com/blog/wp-content/uploads/2025/05/Postman.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache error:', err))
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              // Cache images and fonts
              if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp|svg|woff|woff2)$/)) {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Update Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for visitor counter
self.addEventListener('sync', event => {
  if (event.tag === 'sync-visitor-count') {
    event.waitUntil(syncVisitorCount());
  }
});

async function syncVisitorCount() {
  try {
    const response = await fetch('https://postmanoil.com/blog/visitor-api.php', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors'
    });
    
    if (response.ok) {
      console.log('Visitor count synced');
    }
  } catch (error) {
    console.log('Sync failed:', error);
  }
}