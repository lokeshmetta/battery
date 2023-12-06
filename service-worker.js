const CACHE_NAME = 'battery-alert-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/krishna_flute.mp3',
  '/192.png',
   '/512.png'// Replace with your audio file path
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

function checkBatteryAndNotify() {
  navigator.getBattery().then(battery => {
    if (battery.charging && battery.level >= 0.85) {
      self.registration.showNotification('Battery Alert', {
        body: 'Battery level reached 85% while charging!',
        icon: 'battery-icon.png' // Replace with your icon path
      });
    }
  });
}

// Schedule the task to run periodically (adjust the interval as needed)
setInterval(checkBatteryAndNotify, 60000); // Check every minute

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
