'use strict';
(async()=>{
 const $=id=>document.getElementById(id);
 const match=location.pathname.match(/\/field-notes\/(\d{1,4})(?:-|\/|$)/);
 const noteNumber=match?Number(match[1]):Number(new URLSearchParams(location.search).get('id')||0);
 const animalNumbers=[4,13,32,23,24,15,24,3];
 const slugs=['african-wild-dogs','giraffe-herd','siamang-islands','galapagos-giant-tortoise','asian-elephants','probable-meerkat','asian-elephants-november','african-lion'];
 const pageFor=i=>'/field-notes/'+String(i+1).padStart(3,'0')+'-'+slugs[i];
 const animalSlug=s=>String(s).toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,55);
 const load=async file=>{const r=await fetch('/data/'+file,{credentials:'omit'});if(!r.ok)throw Error(file+': '+r.status);return r.json();};
 const loadText=async file=>{const r=await fetch('/data/'+file,{credentials:'omit'});if(!r.ok)throw Error(file+': '+r.status);return r.text();};
 const text=(tag,value,cls)=>{const e=document.createElement(tag);if(value!=null)e.textContent=String(value);if(cls)e.className=cls;return e;};
 const bool=v=>v?'Yes':'No';
 const domain=url=>{try{return new URL(url,location.origin).hostname.replace(/^www\./,'')||'Dubbozoo';}catch{return 'source';}};
 const copy=async(value,button)=>{try{await navigator.clipboard.writeText(new URL(value,location.origin).href);button.textContent='Copied ✓';setTimeout(()=>button.textContent='Copy source URL',1400);}catch{window.prompt('Copy source URL',value);}};
 const photoSets={
  2:{
   title:'Giraffe Boardwalk observation gallery',
   files:['giraffe-boardwalk-01.b64','giraffe-boardwalk-02.b64','giraffe-boardwalk-03.b64','giraffe-boardwalk-04.b64','giraffe-boardwalk-05.b64'],
   captions:[
    'Wide boardwalk view with multiple giraffes visible near the visitor platform and more animals in the wooded background.',
    'Two giraffes close to the boardwalk/feeder area; the image does not identify either individual.',
    'Close head-and-neck view showing ossicones, ears and coat pattern; appearance alone does not establish taxon, sex or name.',
    'Giraffe positioned at the elevated feeder area; an ibis-like wild bird is also visible. The bird is not evidence of zoo collection status.',
    'Profile head-and-neck view near the boardwalk, with coat pattern and ossicones clearly visible.'
   ],
   portrait:[false,true,true,true,true]
  },
  8:{
   title:'Lion Pride Lands observation gallery',
   files:['lion-field-01.b64','lion-field-02.b64','lion-field-03.b64','lion-field-04.b64','lion-field-05.b64','lion-field-06.b64'],
   captions:[
    'Mane-bearing lion lying on short grass in deep shade with forelegs extended; open habitat and fallen timber are visible behind.',
    'Second shaded resting frame with the lion still lying and the head turned left relative to the camera.',
    'Third shaded resting frame with a slightly different head position. The stills do not prove identity or capture time.',
    'Mane-bearing lion standing on a large elevated fallen trunk, body side-on and face oriented toward the camera; mouth visibly open.',
    'Second elevated-trunk frame with all four paws supported by the timber and tail hanging behind.',
    'Closer elevated-trunk view showing the face, developed mane, forequarters and open mouth; the still does not establish why the mouth is open.'
   ],
   portrait:[true,true,true,true,true,true]
  }
 };
 if(noteNumber<1||noteNumber>8){$('note-title').textContent='Field note not found';return;}
 try{
  const [data,photos,inventory,mediaData]=await Promise.all([
   load('observations.json'),load('curated-wildlife-images.json'),load('all-time-animal-inventory.json'),load('official-dubbo-zoo-media.json')
  ]);
  const index=noteNumber-1, note=data.observations[index], animalNo=animalNumbers[index], animal=inventory.entries.find(x=>x.number===animalNo), pic=(photos.entries||[]).find(x=>x.number===animalNo);
  const media=(mediaData.videos||[]).find(x=>Number(x.observation)===noteNumber);
  if(!note)throw Error('Observation missing');
  const display=note.common_name.replace(/ \(probable\)$/,'');
  document.title=display+' field note | Dubbozoo';
  $('note-number').textContent=String(noteNumber).padStart(3,'0')+' / 008';
  $('note-title').textContent=display;
  $('note-breadcrumb').textContent=display;
  $('note-scientific').textContent=note.scientific_name||'Taxon unresolved';
  $('note-lead').textContent=note.venue_hypothesis+'. '+(note.observation_date_verified?'Capture date verified.':'Capture date remains unknown; submission/upload date is not treated as capture date.');
  $('summary-id').textContent=note.id;
  $('summary-frames').textContent=String((note.photos||[]).length);
  const visible=note.subjects_visible??note.subjects_visible_minimum??note.subjects_visible_minimum_across_set??note.subjects_visible_simultaneously;
  $('summary-subjects').textContent=visible==null?'Unknown':String(visible)+(note.subjects_visible_exact===null?' minimum':'');
  $('summary-date').textContent=note.observed_at||'Unknown';
  $('evidence-exif').textContent=bool(note.exif_present);
  $('evidence-gps').textContent=bool(Boolean(note.gps));
  $('evidence-venue').textContent=bool(note.venue_verified);
  $('limits-text').textContent=note.behaviour_interpretation_limits||note.taxon_explanation||'No additional inference should be made beyond the visible evidence.';

  const direct=$('direct-observations'), list=text('ul','','direct-list');
  const behaviours=note.observable_behaviours||[];
  if(behaviours.length) behaviours.forEach(v=>list.append(text('li',v)));
  else list.append(text('li','The supplied still photographs establish visible animals and habitat context; no behaviour beyond the frame is inferred.'));
  if(note.subjects_visible_note) list.append(text('li',note.subjects_visible_note));
  if(note.sex_visual_hypothesis) list.append(text('li','Visual sex hypothesis: '+note.sex_visual_hypothesis));
  if(note.venue_hypothesis) list.append(text('li','Likely venue: '+note.venue_hypothesis+(note.venue_verified?' (verified).':' (not independently geo-verified).')));
  direct.append(list);

  const frames=$('frame-list');
  (note.photos||[]).forEach((p,i)=>{
    const card=text('article','','frame-card'), title=text('strong','Frame '+(i+1)+' · '+p.original_filename), desc=text('p',p.description), meta=text('div','','frame-meta');
    const batch=p.submission_batch?' · supplied '+p.submission_batch:'';
    meta.textContent=(p.width||'?')+' × '+(p.height||'?')+' · '+(p.exif_present?'EXIF retained':'No retained EXIF')+batch+' · SHA-256 '+String(p.sha256||'').slice(0,14)+'…';
    card.append(title,desc,meta);
    if(p.recognisable_people_visible){const flag=text('span','Recognisable visitor(s) visible','privacy-flag');title.append(flag);}
    frames.append(card);
  });

  const unknowns=['individual identity','age','exact capture date','GPS location'];
  if(note.sex==null)unknowns.push('keeper-verified sex');
  if(!note.species_confirmed && note.species_confirmed!==undefined)unknowns.push('exact species / lineage');
  if(!note.individual_names)unknowns.push('animal names');
  const ug=$('unknown-grid');[...new Set(unknowns)].forEach(v=>ug.append(text('span',v,'unknown-chip')));

  const sources=$('source-list');
  (note.sources||[]).forEach(s=>{
    const card=text('article','','source-card'), info=text('div'), name=text('strong',(s.type||'source').replaceAll('_',' ')), details=text('small');
    details.textContent=domain(s.url)+(s.published?' · '+s.published:'')+(s.checked?' · checked '+s.checked:'')+(s.report_year?' · '+s.report_year:'');
    const button=text('button','Copy source URL','source-copy');button.type='button';button.addEventListener('click',()=>copy(s.url,button));
    info.append(name,details);card.append(info,button);sources.append(card);
  });

  const people=(note.photos||[]).some(p=>p.recognisable_people_visible);
  $('privacy-detail').textContent=people
   ?'At least one supplied frame contains recognisable visitors or children. Those originals remain unpublished. Privacy-screened derivatives may be shown only where the image contains no recognisable people and Josh has supplied it for this site.'
   :'No recognisable visitor was flagged in these supplied frames. Privacy-screened web derivatives may be shown here while the original full-resolution files remain outside the public site.';

  let localPhotos=[];
  const set=photoSets[noteNumber];
  if(set){
   const loaded=await Promise.all(set.files.map(x=>loadText(x).catch(()=>null)));
   localPhotos=loaded.map((b64,i)=>b64?{src:'data:image/jpeg;base64,'+b64.trim(),caption:set.captions[i],portrait:set.portrait[i]}:null).filter(Boolean);
   if(localPhotos.length){
    const section=$('user-photo-section'), gallery=$('user-photo-gallery');
    section.hidden=false;
    if($('user-photo-title'))$('user-photo-title').textContent=set.title;
    if($('user-photo-note'))$('user-photo-note').textContent='Privacy-screened web copies of Josh\'s supplied photographs. Submission date is not treated as capture date because the copies contain no retained EXIF/GPS.';
    localPhotos.forEach((p,i)=>{
      const figure=text('figure','', 'user-photo-card'+(p.portrait?' portrait':'')), img=document.createElement('img'), cap=text('figcaption','Photo '+(i+1)+' · '+p.caption);
      img.src=p.src;img.alt='Josh-supplied '+display+' observation photo '+(i+1)+'. '+p.caption;img.loading=i?'lazy':'eager';img.decoding='async';
      figure.append(img,cap);gallery.append(figure);
    });
   }
  }

  if(localPhotos.length){
    const fig=$('note-reference');fig.replaceChildren();
    const img=document.createElement('img');img.src=localPhotos[0].src;img.alt='Josh-supplied '+display+' observation photo.';
    const cap=text('figcaption','Josh-supplied field photo · privacy-screened web copy · capture date/GPS not retained');
    fig.append(img,cap);
  }else if(pic){
    const fig=$('note-reference');fig.replaceChildren();
    const img=document.createElement('img');img.src=pic.image_url;img.alt='Public species-reference image for '+display+', not Josh\'s field photograph.';img.referrerPolicy='no-referrer';
    const cap=text('figcaption','Public wildlife reference · '+pic.author+' · '+pic.licence+' · not Josh\'s field photo');
    fig.append(img,cap);
  }

  if(media){
    $('field-media-heading').textContent=media.title;
    $('field-media-summary').textContent=media.audio_note+' Published '+media.published+' by '+media.channel+'.';
    const play=$('field-media-play');play.disabled=false;play.textContent='▶ Play real keeper video + audio';
    play.addEventListener('click',()=>{
      const iframe=document.createElement('iframe');
      iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(media.youtube_id)+'?rel=0&modestbranding=1&playsinline=1';
      iframe.title=media.title;iframe.allow='autoplay; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;
      iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation');
      $('field-media-stage').replaceChildren(iframe);
    },{once:true});
  }else{
    $('field-media-summary').textContent='No official Taronga keeper video is currently curated for this field note.';
  }

  if(animal){$('related-animal').href='/animals/'+String(animalNo).padStart(3,'0')+'-'+animalSlug(animal.name);$('related-animal').textContent='Explore '+display+' research →';}
  $('previous-note').href=pageFor((index+7)%8);$('next-note').href=pageFor((index+1)%8);
  $('copy-note-url').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);$('copy-note-url').textContent='Copied ✓';}catch{window.prompt('Copy link',location.href);}};
 }catch(e){$('note-title').textContent='Field note unavailable';$('note-lead').textContent='The observation data could not be loaded.';}
})();