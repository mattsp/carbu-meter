workbox
    .precaching
    .precacheAndRoute(self.__precacheManifest || []);
workbox.skipWaiting()
workbox.clientsClaim()
workbox
    .routing
    .registerRoute(new RegExp('https:.*min\.(css|js)'), workbox.strategies.staleWhileRevalidate({cacheName: 'cache'}))
workbox
    .routing
    .registerRoute('/manifest.json', workbox.strategies.staleWhileRevalidate({cacheName: 'cache'}))
workbox
    .routing
    .registerRoute('/favicon.ico', workbox.strategies.staleWhileRevalidate({cacheName: 'cache'}))
self.addEventListener('install', event => {
    console.log('install')
})
self.addEventListener('activate', event => {
    console.log('activate')
})