"use strict";

const CACHE_NAME = "form-tracker-v2";
const PAGE_URLS = ["./", "./index.html"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PAGE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("form-tracker-") && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || request.mode !== "navigate" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    let response;
    try {
      response = await fetch(request);
    } catch (error) {
      const cached = await caches.match(request) || await caches.match(new URL("./", self.registration.scope));
      if (cached) return cached;
      throw error;
    }
    if (response.ok) {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      } catch (error) {
        console.error("Could not update the offline page cache.", error);
      }
    }
    return response;
  })());
});
