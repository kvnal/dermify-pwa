const cacheName = "cache1"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				"/",
				"css/skin.css",
				"css/skin1.css",
				"css/tailwind",
				"css/w3.css",
				"css/w3-1.css",
				"css/woza.css",
				"jscript/app_batch_prediction_code.js",
				"jscript/app_startup_code.js",
				"model/model.json",
				"model/group1-shard1of4",
				"model/group1-shard2of4",
				"model/group1-shard3of4",
				"model/group1-shard4of4",
				"index.html", // Main HTML file
				"manifest.json"// Manifest file
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});