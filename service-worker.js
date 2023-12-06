const CACHE_NAME = 'battery-alert-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/krishna_flute.mp3',
  '/192.png', // Replace with the correct filename for your icon file (192.png)
  '/512.png'  // Replace with the correct filename for your icon file (512.png)
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

function showBatteryNotification() {
  self.registration.showNotification('Battery Alert', {
    body: 'Battery level reached 90% while charging!',
    icon: 'battery-icon.png' // Replace with your icon file name (battery-icon.png)
  });
}

function checkBatteryAndNotify() {
  navigator.getBattery().then(battery => {
    if (battery.charging && battery.level >= 0.9) {
      showBatteryNotification();
    }
  });
}

// Schedule the task to run periodically (adjust the interval as needed)
setInterval(checkBatteryAndNotify, 300000); // Check every 5 minutes (300,000 milliseconds)

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  // Add custom handling when the user clicks on the notification
  // For example, open a specific page or perform an action
});
