self.addEventListener("install", event => {
    console.log("SW: Instalado");
    const promis = caches.open("cv").then((cache) => {
        cache.addAll([
            '/',
            '/index',
            '/manifest.json',
            '/images/icons/android-launchericon-48-48.png',
            '/images/icons/android-launchericon-72-72.png',
            '/images/icons/android-launchericon-96-96.png',
            '/images/icons/android-launchericon-144-144.png',
            '/images/icons/android-launchericon-192-192.png',
            '/images/icons/android-launchericon-512-512.png',
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKOVNTSMq4lYndQcIWb71xE1Il1M1OgkP2DBIUVay5QOftB1-ynsKWQtTq1CbPOnvQRc&usqp=CAU",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        ]);
    });
    event.waitUntil(promis);
})

//primero intento siempre ir a web y si no cache
self.addEventListener('fetch', (event) => {
    console.log(event.request);
    const res = fetch(event.request).then((respWeb) => {
        caches.open("dynamic").then((cacheDynamic) => {
            cacheDynamic.put(event.request, respWeb);
            //aqui va el cleane
        })
        return respWeb.clone();
    }).catch(() => {
        return caches.match(event.request)
    })

    event.respondWith(res);
})
