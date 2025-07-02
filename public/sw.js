const CACHE_NAME = "reviveforge-v1.0.0"
const STATIC_CACHE_NAME = "reviveforge-static-v1.0.0"
const DYNAMIC_CACHE_NAME = "reviveforge-dynamic-v1.0.0"

const STATIC_ASSETS = [
  "/",
  "/marketplace",
  "/auth/login",
  "/auth/register",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
]

const API_CACHE_PATTERNS = [
  /^https:\/\/api\.reviveforge\.com\/projects/,
  /^https:\/\/api\.reviveforge\.com\/users/,
  /^https:\/\/api\.reviveforge\.com\/categories/,
]

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...")

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log("Service Worker: Static assets cached")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("Service Worker: Error caching static assets", error)
      }),
  )
})

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: Activated")
        return self.clients.claim()
      }),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== "GET") {
    return
  }

  if (!request.url.startsWith("http")) {
    return
  }

  if (request.destination === "document") {
    event.respondWith(handleDocumentRequest(request))
  } else if (isAPIRequest(request.url)) {
    event.respondWith(handleAPIRequest(request))
  } else if (isStaticAsset(request.url)) {
    event.respondWith(handleStaticAssetRequest(request))
  } else {
    event.respondWith(handleOtherRequest(request))
  }
})

async function handleDocumentRequest(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("Service Worker: Network failed, trying cache", error)

    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    return caches.match("/offline.html") || new Response("Offline", { status: 503 })
  }
}

async function handleAPIRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)

  try {
    const cachedResponse = await cache.match(request)

    const networkPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    })

    if (cachedResponse) {
      networkPromise.catch(() => {})
      return cachedResponse
    }

    return await networkPromise
  } catch (error) {
    console.log("Service Worker: API request failed", error)

    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    return new Response(JSON.stringify({ error: "Network unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    })
  }
}

async function handleStaticAssetRequest(request) {
  const cache = await caches.open(STATIC_CACHE_NAME)

  const cachedResponse = await cache.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log("Service Worker: Static asset request failed", error)
    return new Response("Asset unavailable", { status: 503 })
  }
}

async function handleOtherRequest(request) {
  try {
    return await fetch(request)
  } catch (error) {
    console.log("Service Worker: Other request failed", error)
    return new Response("Request failed", { status: 503 })
  }
}

function isAPIRequest(url) {
  return API_CACHE_PATTERNS.some((pattern) => pattern.test(url))
}

function isStaticAsset(url) {
  const staticExtensions = [".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".woff", ".woff2", ".ttf", ".eot"]
  return staticExtensions.some((ext) => url.includes(ext))
}

self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered", event.tag)

  if (event.tag === "background-sync-projects") {
    event.waitUntil(syncProjects())
  } else if (event.tag === "background-sync-favorites") {
    event.waitUntil(syncFavorites())
  }
})

async function syncProjects() {
  try {
    console.log("Service Worker: Syncing projects data")

    const pendingData = await getPendingSync("projects")

    for (const item of pendingData) {
      try {
        await fetch("/api/projects/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.data),
        })

        await removePendingSync("projects", item.id)
      } catch (error) {
        console.error("Service Worker: Failed to sync project", error)
      }
    }
  } catch (error) {
    console.error("Service Worker: Background sync failed", error)
  }
}

async function syncFavorites() {
  try {
    console.log("Service Worker: Syncing favorites data")

    const pendingData = await getPendingSync("favorites")

    for (const item of pendingData) {
      try {
        await fetch("/api/favorites/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.data),
        })

        await removePendingSync("favorites", item.id)
      } catch (error) {
        console.error("Service Worker: Failed to sync favorite", error)
      }
    }
  } catch (error) {
    console.error("Service Worker: Favorites sync failed", error)
  }
}

self.addEventListener("push", (event) => {
  console.log("Service Worker: Push notification received")

  let notificationData = {
    title: "ReviveForge",
    body: "You have a new notification",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    tag: "default",
    data: {},
  }

  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = { ...notificationData, ...data }
    } catch (error) {
      console.error("Service Worker: Error parsing push data", error)
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    tag: notificationData.tag,
    data: notificationData.data,
    actions: [
      {
        action: "view",
        title: "View",
        icon: "/icons/action-view.png",
      },
      {
        action: "dismiss",
        title: "Dismiss",
        icon: "/icons/action-dismiss.png",
      },
    ],
    vibrate: [200, 100, 200],
    requireInteraction: true,
  }

  event.waitUntil(self.registration.showNotification(notificationData.title, options))
})

self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked", event.action)

  event.notification.close()

  if (event.action === "view") {
    const urlToOpen = event.notification.data?.url || "/"

    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.navigate(urlToOpen)
            return client.focus()
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      }),
    )
  }
})

self.addEventListener("message", (event) => {
  console.log("Service Worker: Message received", event.data)

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  } else if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: CACHE_NAME })
  } else if (event.data && event.data.type === "CACHE_URLS") {
    event.waitUntil(caches.open(DYNAMIC_CACHE_NAME).then((cache) => cache.addAll(event.data.urls)))
  }
})

async function getPendingSync(storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ReviveForgeOffline", 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const getAllRequest = store.getAll()

      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true })
      }
    }
  })
}

async function removePendingSync(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ReviveForgeOffline", 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const deleteRequest = store.delete(id)

      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

console.log("Service Worker: Script loaded")
