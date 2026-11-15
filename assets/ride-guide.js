/* Dubbozoo GPS Ride Guide — all position calculations run in this browser. */
(() => {
  'use strict';
  const el = id => document.getElementById(id);
  const KEY = 'dubbozoo-ride-viewing-pins-v1';
  const S = {stops:[], photos:new Map(), videos:new Map(), saved:{}, gps:null, accuracy:Infinity, watch:null, demo:false, selected:null, expanded:false};
  const radians = n => n * Math.PI / 180;
  function metres(a,b,c,d) {
    const deltaLat=radians(c-a),deltaLon=radians(d-b);
    const h=Math.sin(deltaLat/2)**2+Math.cos(radians(a))*Math.cos(radians(c))*Math.sin(deltaLon/2)**2;
    return 12742000*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
  }
  function valid(p) {
    return !!p && Number.isFinite(p.lat) && Number.isFinite(p.lon) &&
      p.lat > -32.35 && p.lat < -32.20 && p.lon > 148.50 && p.lon < 148.65;
  }
  function loadSaved() {
    try {
      const obj=JSON.parse(localStorage.getItem(KEY)||'{}');
      if (!obj || typeof obj!=='object' || Array.isArray(obj)) return;
      for (const [id,p] of Object.entries(obj)) {
        if (/^[a-z0-9-]{1,60}$/.test(id) && valid(p))
          S.saved[id]={lat:p.lat,lon:p.lon,accuracy:Number(p.accuracy)||null,savedAt:String(p.savedAt||'').slice(0,40)};
      }
    } catch(e) {}
  }
  function saveSaved() {try{localStorage.setItem(KEY,JSON.stringify(S.saved));return true}catch(e){return false}}
  function point(stop) {
    if (valid(S.saved[stop.id])) return {...S.saved[stop.id],from:'my saved viewing spot'};
    if (Number.isFinite(stop.lat)&&Number.isFinite(stop.lon)) return {lat:stop.lat,lon:stop.lon,from:'OpenStreetMap exhibit point'};
    return null;
  }
  function distanceTo(stop) {const p=point(stop);return p&&S.gps?metres(S.gps.lat,S.gps.lon,p.lat,p.lon):null}
  function fmt(d) {return d<1000?Math.round(d/10)*10+' m':(d/1000).toFixed(1)+' km'}
  function setStatus(title, detail) {el('gps-state').textContent=title;el('gps-detail').textContent=detail}
  function stopVoice() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    el('stop-audio').disabled=true;
  }
  function renderMap() {
    const svg=el('geo-plot'),ns='http://www.w3.org/2000/svg';
    svg.replaceChildren();
    const make=(tag,props,text)=>{
      const e=document.createElementNS(ns,tag);
      for(const [k,v] of Object.entries(props||{})) e.setAttribute(k,String(v));
      if(text)e.textContent=text;
      svg.append(e);
      return e;
    };
    // North-up latitude/longitude plot; deliberately NOT a traversable path map.
    const minLat=-32.285,maxLat=-32.270,minLon=148.574,maxLon=148.592;
    const xy=(lat,lon)=>({x:40+(lon-minLon)/(maxLon-minLon)*620,y:40+(maxLat-lat)/(maxLat-minLat)*390});
    for(let i=0;i<=4;i++){
      make('line',{x1:40+i*155,y1:28,x2:40+i*155,y2:435,class:'plot-grid'});
      make('line',{x1:30,y1:40+i*97.5,x2:670,y2:40+i*97.5,class:'plot-grid'});
    }
    make('text',{x:48,y:24,class:'map-small'},'N ↑  Real positions; paths not shown');
    let shown=0;
    for(const stop of S.stops){
      const p=point(stop);if(!p)continue;
      const c=xy(p.lat,p.lon);if(!Number.isFinite(c.x)||!Number.isFinite(c.y))continue;
      const marker=make('circle',{cx:c.x,cy:c.y,r:stop.id===S.selected?10:6,class:stop.id===S.selected?'map-pin active':'map-pin',role:'button',tabindex:'0','aria-label':'Open '+stop.name});
      marker.addEventListener('click',()=>selectStop(stop.id));
      marker.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectStop(stop.id)}});
      shown++;
    }
    if(S.gps){
      const p=xy(S.gps.lat,S.gps.lon);
      if(p.x>=0&&p.x<=700&&p.y>=0&&p.y<=470){
        const scale=111200*(maxLat-minLat)/390;
        make('circle',{cx:p.x,cy:p.y,r:Math.min(170,Math.max(8,S.accuracy/scale)),class:'map-accuracy'});
        make('circle',{cx:p.x,cy:p.y,r:9,class:'map-me'});
        make('text',{x:Math.min(625,p.x+14),y:p.y+4,class:'map-me-label'},'You');
      }
    }
    el('map-note').textContent=S.demo?'SIMULATED location — this is not your GPS.':
      S.gps?'Your green dot represents phone GPS; the ring shows reported uncertainty.':
      'Activate GPS to place your location on this plot.';
    el('map-count').textContent=shown+' point markers';
  }
  function renderList() {
    const list=el('nearby');list.replaceChildren();
    const sorted=S.stops.filter(s=>point(s)).sort((a,b)=>{
      const da=distanceTo(a),db=distanceTo(b);
      return (da===null?1e9:da)-(db===null?1e9:db)||a.name.localeCompare(b.name);
    });
    const near=S.gps&&S.accuracy<=130?sorted.filter(s=>distanceTo(s)<=Math.max(250,150+S.accuracy)):sorted;
    const candidates=S.expanded?sorted:(S.gps&&near.length?near:sorted).slice(0,6);
    el('list-count').textContent=sorted.length+' mapped stops';
    el('list-help').textContent=!S.gps?'Turn on GPS to sort by distance, or pick a mapped stop.':
      S.accuracy>130?'GPS is imprecise. Distances are only rough guides.':
      near.length?'Possible nearby exhibits — animal visibility is not guaranteed.':
      'No mapped point is close yet. Showing the closest known stops.';
    for(const stop of candidates) {
      const b=document.createElement('button');b.className='stop';b.type='button';
      b.setAttribute('aria-pressed',String(stop.id===S.selected));
      const left=document.createElement('span'),title=document.createElement('strong'),hint=document.createElement('small'),right=document.createElement('span');
      title.textContent=stop.name;
      hint.textContent=S.saved[stop.id]?'Your saved viewing spot':'Community-mapped exhibit';
      right.className='dist';const d=distanceTo(stop);right.textContent=d===null?'Explore':fmt(d);
      left.append(title,hint);b.append(left,right);b.addEventListener('click',()=>selectStop(stop.id));list.append(b);
    }
    if(!candidates.length){const p=document.createElement('p');p.textContent='No map points loaded. Explore the animal list below.';list.append(p)}
    el('show-all').textContent=S.expanded?'Show nearest stops':'Show all mapped stops';
    el('saved-count').textContent=Object.keys(S.saved).length+' saved viewing positions';
  }
  function renderUnmapped() {
    const root=el('unmapped-items');root.replaceChildren();
    for(const stop of S.stops.filter(s=>!Number.isFinite(s.lat))) {
      const b=document.createElement('button');b.className='small-stop';b.type='button';
      b.textContent=stop.name;b.addEventListener('click',()=>selectStop(stop.id));root.append(b);
    }
  }
  function selectStop(id) {
    const stop=S.stops.find(s=>s.id===id);if(!stop)return;
    S.selected=id;stopVoice();
    el('animal-title').textContent=stop.name;
    el('animal-fact').textContent=stop.fact;
    el('animal-prompt').textContent=stop.prompt;
    el('profile-link').href=stop.profile;
    const p=point(stop),dist=distanceTo(stop);
    el('animal-distance').textContent=dist===null?'Explore this stop':fmt(dist)+' straight-line';
    el('animal-place').textContent=p?p.from+' · not a verified public gate':'Official map: '+(stop.mapRef||'no published grid');
    el('map-source').textContent=S.saved[id]?'You saved this point locally on this phone.':
      stop.osmNode?'Community-mapped OpenStreetMap node '+stop.osmNode+'. Exhibit or viewing position may have changed.':
      'There is no verified GPS point for this stop. You can save one when you arrive.';
    el('save-point').disabled=!S.gps||S.demo||S.accuracy>75;
    el('remove-point').hidden=!S.saved[id];
    el('save-message').textContent=S.saved[id]?'This viewing point is only stored in your browser.':
      'Stop beside the signed exhibit and enable GPS to save an accurate viewing point.';
    el('play-audio').disabled=!('speechSynthesis' in window);
    const pic=S.photos.get(stop.animalNumber),img=el('animal-image');
    img.hidden=true;img.removeAttribute('src');
    el('image-empty').hidden=false;
    el('image-empty').textContent=pic?'Loading licensed species-reference photo…':'No licensed image found in the curated gallery.';
    el('image-credit').textContent=pic?'Species reference: '+pic.author+' · '+pic.licence+' · Wikimedia Commons. Not an identified Dubbo Zoo individual.':'No image credit available.';
    if(pic){
      img.alt='Species reference photograph of '+stop.name+', not the individual at this exhibit';
      img.onload=()=>{if(S.selected===id){img.hidden=false;el('image-empty').hidden=true}};
      img.onerror=()=>{el('image-empty').textContent='Photo unavailable; the research guide still works.'};
      img.src=pic.image_url;
    }
    const media=S.videos.get(stop.animalNumber),video=el('video-link');
    video.hidden=!media;
    if(media)video.href='https://www.youtube.com/watch?v='+encodeURIComponent(media.youtube_id);
    renderList();renderMap();
    el('animal-section').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  function updatePosition() {
    const stop=S.stops.find(s=>s.id===S.selected);
    if(stop){
      const d=distanceTo(stop);
      el('animal-distance').textContent=d===null?'Explore this stop':fmt(d)+' straight-line';
      el('save-point').disabled=!S.gps||S.demo||S.accuracy>75;
    }
    renderList();renderMap();
  }
  function onPosition(pos) {
    const lat=pos.coords.latitude,lon=pos.coords.longitude,accuracy=pos.coords.accuracy;
    if(!Number.isFinite(lat)||!Number.isFinite(lon))return;
    S.gps={lat,lon};S.accuracy=Number.isFinite(accuracy)?accuracy:9999;S.demo=false;
    const within=metres(lat,lon,-32.279,148.582)<2500;
    setStatus(within?'GPS active — exhibit distances updating':'GPS active — apparently outside the zoo',
      'Approximate accuracy '+Math.round(S.accuracy)+' m. The phone locates you, not individual animals.');
    updatePosition();
  }
  function stopGPS() {
    if(S.watch!==null&&navigator.geolocation) navigator.geolocation.clearWatch(S.watch);
    S.watch=null;S.gps=null;S.accuracy=Infinity;S.demo=false;
    el('start-gps').disabled=false;el('stop-gps').disabled=true;
    setStatus('Location switched off','No position is sent to this site. You can explore animals manually.');
    updatePosition();
  }
  function onGeoError(err) {
    const m=err.code===1?'Location permission was denied in your browser.':
      err.code===2?'GPS is unavailable; try outside or near a clearer sky.':
      'GPS timed out; try again in an open area.';
    stopGPS();setStatus('Could not get your location',m+' Animal guide still works without GPS.');
  }
  function startGPS() {
    if(!window.isSecureContext||!navigator.geolocation){setStatus('GPS is unavailable','Open the HTTPS site in a browser with location permissions.');return}
    if(S.watch!==null)navigator.geolocation.clearWatch(S.watch);
    S.watch=null;S.demo=false;
    setStatus('Finding your GPS position…','Allow precise location when your browser asks.');
    el('start-gps').disabled=true;el('stop-gps').disabled=false;
    S.watch=navigator.geolocation.watchPosition(onPosition,onGeoError,{enableHighAccuracy:true,timeout:20000,maximumAge:8000});
  }
  function listen() {
    const stop=S.stops.find(s=>s.id===S.selected);
    if(!stop||!('speechSynthesis' in window))return;
    stopVoice();
    const u=new SpeechSynthesisUtterance('At the '+stop.name+' exhibit. '+stop.fact+
      ' Here is something to look out for. '+stop.prompt+
      ' This audio describes the species and does not confirm which animal is visible right now.');
    u.lang='en-AU';u.rate=.94;
    u.onend=()=>{el('stop-audio').disabled=true};
    u.onerror=()=>{el('stop-audio').disabled=true};
    el('stop-audio').disabled=false;
    window.speechSynthesis.speak(u);
  }
  function savePoint() {
    const stop=S.stops.find(s=>s.id===S.selected);
    if(!stop||!S.gps||S.demo||S.accuracy>75){
      el('save-message').textContent='Please stop at a signed viewing area, enable live GPS and get accuracy of 75 m or better.';
      return;
    }
    S.saved[stop.id]={lat:S.gps.lat,lon:S.gps.lon,accuracy:Math.round(S.accuracy),savedAt:new Date().toISOString()};
    const worked=saveSaved();updatePosition();selectStop(stop.id);
    el('save-message').textContent=worked?'GPS viewing spot saved on this phone only.':'Device storage blocked; the spot may not persist.';
  }
  async function init() {
    loadSaved();
    try {
      const [r,p,m]=await Promise.all([
        fetch('/data/ride-exhibits.json',{credentials:'omit'}),
        fetch('/data/curated-wildlife-images.json',{credentials:'omit'}),
        fetch('/data/official-dubbo-zoo-media.json',{credentials:'omit'})
      ]);
      if(!r.ok)throw new Error('Animal map data was not available.');
      const data=await r.json();
      if(!Array.isArray(data.points)||data.points.length<15)throw new Error('Animal map data was incomplete.');
      S.stops=data.points.filter(s=>typeof s.id==='string'&&typeof s.name==='string');
      if(p.ok){const imgs=await p.json();for(const x of imgs.entries||[])if(x.image_url&&x.licence)S.photos.set(x.number,x)}
      if(m.ok){const vids=await m.json();for(const x of vids.videos||[])if(x.youtube_id)S.videos.set(x.animal_number,x)}
      renderUnmapped();renderList();renderMap();selectStop('giraffe-north');
    } catch(e) {
      el('nearby').textContent='Could not load the animal map. Please check your connection and reload.';
      setStatus('Animal map failed to load',String(e.message||e));
    }
    if('serviceWorker' in navigator&&window.isSecureContext)navigator.serviceWorker.register('/ride-sw.js').catch(()=>{});
  }
  el('start-gps').addEventListener('click',startGPS);
  el('stop-gps').addEventListener('click',stopGPS);
  el('preview').addEventListener('click',()=>{
    stopGPS();S.demo=true;S.gps={lat:-32.27817,lon:148.58550};S.accuracy=12;
    setStatus('Demo preview — not actual GPS','This is a simulated position near a mapped giraffe point. Use Start GPS for your location.');
    selectStop('giraffe-north');
  });
  el('show-all').addEventListener('click',()=>{S.expanded=!S.expanded;renderList()});
  el('play-audio').addEventListener('click',listen);
  el('stop-audio').addEventListener('click',stopVoice);
  el('save-point').addEventListener('click',savePoint);
  el('remove-point').addEventListener('click',()=>{
    if(!S.selected)return;delete S.saved[S.selected];saveSaved();updatePosition();selectStop(S.selected);
  });
  el('clear-points').addEventListener('click',()=>{
    if(!Object.keys(S.saved).length)return;
    if(!window.confirm('Erase all saved viewing spots from this browser?'))return;
    S.saved={};try{localStorage.removeItem(KEY)}catch(e){}
    updatePosition();if(S.selected)selectStop(S.selected);
  });
  window.addEventListener('pagehide',()=>{stopVoice();if(S.watch!==null)stopGPS()});
  init();
})();