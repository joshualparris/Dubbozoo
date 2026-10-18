"use strict";
/**
 * Open-licence wildlife references, NOT photographs of the historic Dubbo animals.
 * Wikimedia Wikipedia lead image -> Commons copyright metadata -> Commons search ->
 * freely licensed iNaturalist species photo. Never use images with unknown/nonfree terms.
 * No credentials, analytics, persistent browser storage, uploads, or private repo calls.
 */
(() => {
  const cards = new Map([...document.querySelectorAll('.animal-card[data-photo-id]')].map(el => [Number(el.dataset.photoId), el]));
  if (!cards.size) return;
  const api = {
    wikipedia: 'https://en.wikipedia.org/w/api.php',
    commons: 'https://commons.wikimedia.org/w/api.php',
    inat: 'https://api.inaturalist.org/v1/observations'
  };
  const normalize = v => String(v || '').replace(/_/g, ' ').replace(/^File:/i, '').trim().toLowerCase();
  const strip = v => {
    const doc = new DOMParser().parseFromString(String(v || ''), 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  };
  const allowedPhoto = v => {
    try {
      const u = new URL(v);
      return u.protocol === 'https:' &&
        (u.hostname === 'upload.wikimedia.org' ||
         u.hostname === 'commons.wikimedia.org' ||
         u.hostname === 'inaturalist-open-data.s3.amazonaws.com' ||
         u.hostname.endsWith('.inaturalist.org'));
    } catch { return false; }
  };
  const ccLicense = (label, url) => {
    const name = strip(label).replace(/\s+/g, ' ');
    const plain = name.toUpperCase();
    if (/CC.*BY.*NC|CC.*BY.*ND|\bNON-?COMMERCIAL\b|\bNO.?DERIVATIVES\b|ALL RIGHTS RESERVED/.test(plain)) return null;
    if (/CC0|PUBLIC DOMAIN|PUBLIC DOMAIN MARK|^PD\b/.test(plain)) return {text:name || 'Public domain / CC0',url:/^https:\/\//.test(url || '')?url:'https://creativecommons.org/publicdomain/zero/1.0/'};
    if (/CC BY-SA|CC-BY-SA|CREATIVE COMMONS ATTRIBUTION.SHAREALIKE/i.test(name))
      return {text:name || 'CC BY-SA',url:/^https:\/\//.test(url || '')?url:'https://creativecommons.org/licenses/by-sa/4.0/'};
    if (/CC BY\b|CC-BY\b|CREATIVE COMMONS ATTRIBUTION(?!.*NONCOMMERCIAL)/i.test(name))
      return {text:name || 'CC BY',url:/^https:\/\//.test(url || '')?url:'https://creativecommons.org/licenses/by/4.0/'};
    return null;
  };
  async function query(endpoint, params, timeout = 14000) {
    const u = new URL(endpoint);
    Object.entries(params).forEach(([k,v]) => u.searchParams.set(k,String(v)));
    const abort = new AbortController();
    const handle = setTimeout(() => abort.abort(),timeout);
    try {
      const res = await fetch(u.toString(), {mode:'cors',credentials:'omit',signal:abort.signal,cache:'default'});
      if (!res.ok) throw new Error(res.status + ' ' + endpoint);
      return await res.json();
    } finally {clearTimeout(handle);}
  }
  const fields = page => page?.imageinfo?.[0] || null;
  function commonsCandidate(page, fallbackName) {
    const info = fields(page);
    if (!info || !(info.mime === 'image/jpeg' || info.mime === 'image/png' || info.mime === 'image/webp')) return null;
    if (info.width < 260 || info.height < 180) return null;
    const rawName = (page.title || fallbackName || '').replace(/^File:/i, '');
    if (/skull|skeleton|taxidermy|illustration|drawing|painting|engraving|statue|logo|poster|coat.of.arms|diagram|signboard|anatomy|fossil|map.of|flag|cartoon|clipart|stamp|specimen|museum.display/i.test(rawName)) return null;
    const m = info.extmetadata || {};
    const licence = ccLicense(m.LicenseShortName?.value || m.License?.value || m.UsageTerms?.value, m.LicenseUrl?.value);
    const image = info.thumburl || info.url;
    if (!licence || !allowedPhoto(image)) return null;
    const artist = strip(m.Artist?.value || m.Credit?.value || '').slice(0,160) || 'See source file for creator';
    const filePage = info.descriptionurl || 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(rawName.replace(/ /g,'_'));
    return {url:image,artist,licence,filePage,repository:'Wikimedia Commons',width:info.thumbwidth || info.width,height:info.thumbheight || info.height};
  }
  let matchedPhotos = [...cards.values()].filter(c => c.querySelector('.animal-photo-slot')?.dataset.photoStatus === 'curated').length, unavailablePhotos = 0;
  const photoStatus=document.getElementById('photo-status');
  function countProgress() {
    if (!photoStatus) return;
    const pending=Math.max(0,cards.size-matchedPhotos-unavailablePhotos);
    photoStatus.textContent=matchedPhotos+' / '+cards.size+' open-licence photo sources matched'
      +(pending?' · '+pending+' being checked':'')
      +(unavailablePhotos?' · '+unavailablePhotos+' without a verified match':'')
      +'. All photos are species references, not verified Dubbo animal portraits.';
  }
  function upgradeHero(entry,info) {
    if(entry.number!==4)return;
    const hero=document.querySelector('.plate');
    if(!hero||hero.querySelector('.plate-real-photo'))return;
    const cover=document.createElement('img');cover.className='plate-real-photo';
    cover.src=info.url;cover.alt='Openly licensed African wild dog reference photograph';
    cover.decoding='async';cover.loading='eager';cover.referrerPolicy='no-referrer';
    cover.addEventListener('load',()=>{hero.classList.add('has-real-photo');hero.setAttribute('aria-label','African wild dog reference photograph, credited to its original creator; not a verified photograph of Dubbo Zoo animals.');});
    cover.addEventListener('error',()=>{cover.remove();hero.querySelector('.plate-photo-credit')?.remove();});
    hero.insertBefore(cover,hero.firstChild);
    const footer=hero.querySelector('.plate-bottom div');
    if(footer){const credit=document.createElement('small');credit.className='plate-photo-credit';
      const link=document.createElement('a');link.href=info.filePage;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Photo: '+info.artist;
      const lic=document.createElement('a');lic.href=info.licence.url;lic.target='_blank';lic.rel='noopener noreferrer';lic.textContent=info.licence.text;
      credit.append(link,document.createTextNode(' · '),lic,document.createTextNode(' · display cropped'));
      footer.append(credit);
    }
  }
  function putImage(entry, info) {
    const card = cards.get(entry.number);
    const slot = card?.querySelector('.animal-photo-slot');
    if (!slot || !info) return;
    const figure = document.createElement('figure'); figure.className='animal-photo';
    const image = document.createElement('img');
    image.src=info.url;
    image.alt='Reference photograph for '+entry.name+'. This is not verified as an animal at Dubbo Zoo.';
    image.loading='lazy';image.decoding='async';image.referrerPolicy='no-referrer';
    if (info.width && info.height) {image.width=info.width;image.height=info.height;}
    image.addEventListener('error',()=>failPhoto(entry));
    const fig = document.createElement('figcaption');
    const credit = document.createElement('a');credit.href=info.filePage;credit.target='_blank';credit.rel='noopener noreferrer';credit.textContent='Photo: '+info.artist;
    const licence = document.createElement('a');licence.href=info.licence.url;licence.target='_blank';licence.rel='noopener noreferrer';licence.textContent=info.licence.text;
    fig.append(credit, document.createTextNode(' · '),licence,document.createTextNode(' · cropped to fit'));
    const note = document.createElement('span');note.className='photo-reference';note.textContent='Species reference · not a Dubbo sighting';
    figure.append(image, fig,note);slot.replaceChildren(figure);
    slot.dataset.photoStatus='licensed-reference';
    matchedPhotos++;countProgress();upgradeHero(entry,info);
  }
  function failPhoto(entry) {
    const card=cards.get(entry.number);
    const slot=card?.querySelector('.animal-photo-slot');
    if (!slot || slot.dataset.photoStatus === 'unavailable') return;
    const target='https://commons.wikimedia.org/w/index.php?search='+encodeURIComponent(entry.commons_search)+'&title=Special:MediaSearch&type=image';
    const a=document.createElement('a');a.href=target;a.target='_blank';a.rel='noopener noreferrer';a.className='photo-fallback';
    const span=document.createElement('span');span.textContent='Browse Wikimedia Commons photos ↗';
    const small=document.createElement('small');small.textContent='No licence-verified match loaded for this animal';
    a.append(span,small);slot.replaceChildren(a);
    if(slot.dataset.photoStatus==='licensed-reference')matchedPhotos=Math.max(0,matchedPhotos-1);
    slot.dataset.photoStatus='unavailable';unavailablePhotos++;countProgress();
  }
  async function getCommonsImages(imageNames) {
    if(!imageNames.length)return new Map();
    const data=await query(api.commons,{action:'query',format:'json',formatversion:2,prop:'imageinfo',iiprop:'url|size|mime|extmetadata',iiurlwidth:880,iiextmetadatafilter:'Artist|Credit|LicenseShortName|LicenseUrl|License|UsageTerms',titles:imageNames.map(x=>'File:'+x).join('|'),origin:'*'});
    const matches=new Map();
    for(const page of data?.query?.pages||[]) {
      const candidate=commonsCandidate(page);
      if(candidate)matches.set(normalize(page.title),candidate);
    }
    return matches;
  }
  async function wikiLeadBatch(batch) {
    const original=batch.map(x=>x.wikipedia_title);
    const data=await query(api.wikipedia,{action:'query',format:'json',formatversion:2,redirects:1,prop:'pageimages',piprop:'name|thumbnail',pithumbsize:880,titles:original.join('|'),origin:'*'});
    const alias=new Map();
    for(const p of data.query?.normalized||[])alias.set(normalize(p.from),p.to);
    for(const p of data.query?.redirects||[])alias.set(normalize(p.from),p.to);
    const canonical=t=>{
      for(let i=0;i<5;i++) {const mapped=alias.get(normalize(t));if(!mapped||normalize(mapped)===normalize(t))break;t=mapped;}
      return normalize(t);
    };
    const pages=new Map((data.query?.pages||[]).map(x=>[normalize(x.title),x]));
    const matched=batch.map(item=>({entry:item,page:pages.get(canonical(item.wikipedia_title))}));
    const names=[...new Set(matched.filter(x=>x.page?.pageimage).map(x=>x.page.pageimage))];
    const files=await getCommonsImages(names);
    const failed=[];
    for(const r of matched){
      const photo=r.page?.pageimage ? files.get(normalize(r.page.pageimage)):null;
      if(photo)putImage(r.entry,photo);
      else failed.push(r.entry);
    }
    return failed;
  }
  async function commonsSearch(item,word) {
    const data=await query(api.commons,{action:'query',format:'json',formatversion:2,generator:'search',gsrsearch:word,gsrnamespace:6,gsrlimit:12,prop:'imageinfo',iiprop:'url|size|mime|extmetadata',iiurlwidth:880,iiextmetadatafilter:'Artist|Credit|LicenseShortName|LicenseUrl|License|UsageTerms',origin:'*'},17000);
    const scored=(data?.query?.pages||[])
      .map(page=>({photo:commonsCandidate(page),name:normalize(page.title)}))
      .filter(x=>x.photo)
      .map(x=>({...x,score:(x.name.includes(normalize(word))?100:0) + (/\.jpe?g$/i.test(x.name)?20:0) - (/juvenile specimen|description|collage|poster/i.test(x.name)?100:0)}))
      .sort((a,b)=>b.score-a.score);
    return scored[0]?.photo||null;
  }
  async function fromINaturalist(item){
    const data=await query(api.inat,{taxon_name:item.commons_search,photos:true,photo_license:'cc0,cc-by,cc-by-sa',quality_grade:'research',per_page:16,order_by:'created_at',order:'desc'},17000);
    const scientific=normalize(item.commons_search).split(/\s+/).slice(0,2).join(' ');
    for(const observation of data.results||[]){
      const taxon=normalize(observation.taxon?.name);
      if(!taxon || !(taxon===scientific || taxon.startsWith(scientific+' ')))continue;
      for(const p of observation.photos||[]){
        const photoLicense=String(p.license_code||'').toLowerCase();
        const titles={'cc0':'CC0','cc-by':'CC BY','cc-by-sa':'CC BY-SA'};
        const path=photoLicense==='cc0'?'https://creativecommons.org/publicdomain/zero/1.0/':'https://creativecommons.org/licenses/'+photoLicense.replace(/^cc-/,'')+'/4.0/';
        const license=titles[photoLicense]?ccLicense(titles[photoLicense],path):null;
        const url=(p.url||'').replace(/\/square\./,'/medium.');
        if(!license||!allowedPhoto(url))continue;
        const artist=String(p.attribution||observation.user?.login||'See observation for creator').slice(0,160);
        return {url,artist,licence:license,filePage:'https://www.inaturalist.org/observations/'+observation.id,repository:'iNaturalist'};
      }
    }
    return null;
  }
  async function fallback(item){
    try{
      const photo=await commonsSearch(item,item.commons_search);
      if(photo){putImage(item,photo);return;}
    }catch(e){}
    if(normalize(item.commons_search)!==normalize(item.wikipedia_title)){
      try{const photo=await commonsSearch(item,item.wikipedia_title);if(photo){putImage(item,photo);return;}}catch(e){}
    }
    try{
      const photo=await fromINaturalist(item);
      if(photo){putImage(item,photo);return;}
    }catch(e){}
    failPhoto(item);
  }
  async function run(){
    countProgress();
    let manifest;
    try{
      const r=await fetch('data/wildlife-photo-queries.json',{credentials:'omit'});
      if(!r.ok)throw new Error('photo manifest '+r.status);
      manifest=await r.json();
    }catch(e){cards.forEach((c,id)=>{if(c.querySelector('.animal-photo-slot')?.dataset.photoStatus !== 'curated')failPhoto({number:id,commons_search:c.dataset.photoQuery||c.dataset.photoName||'animal'});});return;}
    if(!Array.isArray(manifest.image_queries)||manifest.image_queries.length!==cards.size) {
      if(photoStatus)photoStatus.textContent='Photo list is incomplete. Open the research photo manifest on GitHub for details.';
      return;
    }
    // Hand-curated licensed images are embedded directly in HTML for reliability.
    // Never overwrite them with the API lookup that failed on some Android browsers.
    const curatedIds = new Set([...cards].filter(([id,c])=>c.querySelector('.animal-photo-slot')?.dataset.photoStatus==='curated').map(([id])=>id));
    if(curatedIds.has(4)){
      fetch('data/curated-wildlife-images.json',{credentials:'omit'}).then(r=>r.json()).then(d=>{
        const image=d.entries?.find(x=>x.number===4);
        if(image)upgradeHero({number:4},{url:image.image_url,artist:image.author,licence:{text:image.licence,url:image.license_url},filePage:image.file_page});
      }).catch(()=>{});
    }
    const pending = manifest.image_queries.filter(item=>!curatedIds.has(item.number));
    // A fixed reference image that fails to load can still try automated lookup.
    for(const item of manifest.image_queries.filter(x=>curatedIds.has(x.number))){
      const slot=cards.get(item.number)?.querySelector('.animal-photo-slot');
      const photo=slot?.querySelector('img');
      if(photo)photo.addEventListener('error',()=>{
        if(slot.dataset.photoStatus!=='curated')return;
        slot.dataset.photoStatus='loading';
        matchedPhotos=Math.max(0,matchedPhotos-1);countProgress();
        fallback(item);
      },{once:true});
    }
    const batches=[];
    for(let n=0;n<pending.length;n+=18)batches.push(pending.slice(n,n+18));
    const fallbackQueue=[];
    // One batch at a time avoids flooding MediaWiki. All 89 get a chance at a licensed photograph.
    for(const batch of batches){
      try{fallbackQueue.push(...await wikiLeadBatch(batch));}
      catch(e){fallbackQueue.push(...batch);}
    }
    // Limit search requests if a title has no freely reusable article thumbnail.
    for(let n=0;n<fallbackQueue.length;n+=3){
      await Promise.all(fallbackQueue.slice(n,n+3).map(item=>fallback(item)));
    }
  }
  run();
})();
