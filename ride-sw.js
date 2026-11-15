/* Offline starter for the GPS Ride Guide. No caching or transmission of GPS position. */
const CACHE='dubbozoo-ride-v2-20261115';
const ASSETS=['/ride-guide.html','/assets/ride-guide.js','/assets/ride-visit.js','/assets/ride-guide.css','/data/ride-exhibits.json','/data/ride-audio-stories.json','/data/curated-wildlife-images.json','/data/official-dubbo-zoo-media.json','/ride.webmanifest','/assets/ride-icon.svg'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('dubbozoo-ride-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]));
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||!ASSETS.includes(url.pathname))return;
  event.respondWith(fetch(request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{})}
    return response;
  }).catch(()=>caches.match(request)));
});