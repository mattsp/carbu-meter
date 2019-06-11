workbox
    .precaching
    .precacheAndRoute(self.__precacheManifest || []);
workbox.core.skipWaiting()
workbox.core.clientsClaim()
workbox
    .routing
    .registerRoute(new RegExp('https:.*min\.(css|js)'), new workbox.strategies.StaleWhileRevalidate({cacheName: 'cache'}))
workbox
    .routing
    .registerRoute('/manifest.json', new workbox.strategies.StaleWhileRevalidate({cacheName: 'cache'}))
workbox
    .routing
    .registerRoute('/favicon.ico', new workbox.strategies.StaleWhileRevalidate({cacheName: 'cache'}))
self.addEventListener('install', event => {
    console.log('install')
})
self.addEventListener('activate', event => {
    console.log('activate')
})