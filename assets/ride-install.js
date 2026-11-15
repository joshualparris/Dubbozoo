/* Optional installation guidance and offline pack checks. Does not access GPS. */
(() => {
  'use strict';
  const install=document.getElementById('install-app');
  const message=document.getElementById('install-message');
  const offline=document.getElementById('offline-state');
  let pending=null;
  function installed(){
    return window.matchMedia && window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone===true;
  }
  function manual(){
    if(/iPad|iPhone|iPod/.test(navigator.userAgent||''))
      return 'In Safari, tap Share and choose Add to Home Screen.';
    return 'In Chrome on Android, open the three-dot browser menu and choose Add to Home screen or Install app. If neither appears, try again after the website is fully loaded.';
  }
  function status(s){message.textContent=s}
  window.addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();pending=event;
    if(!installed())status('Install is available. Tap the button to add the guide to your home screen.');
  });
  window.addEventListener('appinstalled',()=>{
    pending=null;install.disabled=true;status('Added to your home screen. The animal guide can now be launched like an app.');
  });
  install.addEventListener('click',async()=>{
    if(installed()){status('You are already using the installed app.');return}
    if(!pending){status(manual());return}
    const p=pending;pending=null;
    try {
      await p.prompt();
      const choice=await p.userChoice;
      status(choice&&choice.outcome==='accepted'?'Installation accepted. Look for Dubbozoo on your home screen.':manual());
    } catch(err) {status(manual())}
  });
  async function offlineCheck(){
    if(!('caches' in window)){offline.textContent='Offline downloads are not supported in this browser.';return}
    try{
      const keys=['/ride-guide.html','/assets/ride-guide.js','/assets/ride-visit.js','/data/ride-audio-stories.json','/data/ride-exhibits.json'];
      const found=await Promise.all(keys.map(key=>caches.match(key)));
      const ready=found.every(Boolean);
      offline.textContent=ready?'Core guide files are stored for offline use. Photos and Taronga videos still need internet.':
        'Offline pack is not ready yet. Open the guide online and refresh after its first successful installation.';
    }catch(err){offline.textContent='Offline pack could not be checked on this device.'}
  }
  if(installed()){install.disabled=true;status('App mode is active.')}
  else status('Add this guide to your Android home screen for easy access.');
  offlineCheck();
  if('serviceWorker' in navigator){
    navigator.serviceWorker.ready.then(offlineCheck).catch(offlineCheck);
    navigator.serviceWorker.addEventListener('controllerchange',offlineCheck);
  }
  window.addEventListener('online',offlineCheck);
  window.addEventListener('offline',()=>{
    offlineCheck();
    status('Your internet connection appears offline. Saved guide text may still work; GPS requires your device location services.');
  });
})();