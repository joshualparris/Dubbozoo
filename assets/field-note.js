'use strict';
(async()=>{
 const $=id=>document.getElementById(id);
 const match=location.pathname.match(/\/field-notes\/(\d{1,4})(?:-|\/|$)/);
 const noteNumber=match?Number(match[1]):Number(new URLSearchParams(location.search).get('id')||0);
 const animalNumbers=[4,13,32,23,24,15];
 const slugs=['african-wild-dogs','giraffe-herd','siamang-islands','galapagos-giant-tortoise','asian-elephants','probable-meerkat'];
 const sourcePaths=['african-wild-dogs-undated.md','giraffes-undated.md','siamang-undated.md','galapagos-tortoise-undated.md','asian-elephants-undated.md','meerkat-undated.md'];
 const pageFor=i=>'/field-notes/'+String(i+1).padStart(3,'0')+'-'+slugs[i];
 const animalSlug=s=>String(s).toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,55);
 const load=async file=>{const r=await fetch('/data/'+file,{credentials:'omit'});if(!r.ok)throw Error(file+': '+r.status);return r.json();};
 const text=(tag,value,cls)=>{const e=document.createElement(tag);if(value!=null)e.textContent=String(value);if(cls)e.className=cls;return e;};
 const bool=v=>v?'Yes':'No';
 if(noteNumber<1||noteNumber>6){$('note-title').textContent='Field note not found';return;}
 try{
  const [data,photos,inventory]=await Promise.all([load('observations.json'),load('curated-wildlife-images.json'),load('all-time-animal-inventory.json')]);
  const index=noteNumber-1, note=data.observations[index], animalNo=animalNumbers[index], animal=inventory.entries.find(x=>x.number===animalNo), pic=(photos.entries||[]).find(x=>x.number===animalNo);
  if(!note)throw Error('Observation missing');
  const display=note.common_name.replace(/ \(probable\)$/,'');
  document.title=display+' field note | Dubbozoo';
  $('note-number').textContent=String(noteNumber).padStart(3,'0')+' / 006';
  $('note-title').textContent=display;
  $('note-breadcrumb').textContent=display;
  $('note-scientific').textContent=note.scientific_name||'Taxon unresolved';
  $('note-lead').textContent=note.venue_hypothesis+'. '+(note.observation_date_verified?'Capture date verified.':'Capture date remains unknown.');
  $('summary-id').textContent=note.id;
  $('summary-frames').textContent=String((note.photos||[]).length);
  const visible=note.subjects_visible??note.subjects_visible_minimum??note.subjects_visible_minimum_across_set;
  $('summary-subjects').textContent=visible==null?'Unknown':String(visible)+(note.subjects_visible_exact===null||note.subjects_visible_simultaneously===null?' minimum':'');
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
  if(note.venue_hypothesis) list.append(text('li','Likely venue: '+note.venue_hypothesis+(note.venue_verified?' (verified).':' (not independently geo-verified).')));
  direct.append(list);
  const frames=$('frame-list');
  (note.photos||[]).forEach((p,i)=>{
    const card=text('article','','frame-card'), title=text('strong','Frame '+(i+1)+' · '+p.original_filename), desc=text('p',p.description), meta=text('div','','frame-meta');
    meta.textContent=(p.width||'?')+' × '+(p.height||'?')+' · '+(p.exif_present?'EXIF retained':'No retained EXIF')+' · SHA-256 '+String(p.sha256||'').slice(0,14)+'…';
    card.append(title,desc,meta);
    if(p.recognisable_people_visible){const flag=text('span','Recognisable visitor(s) visible','privacy-flag');title.append(flag);}
    frames.append(card);
  });
  const unknowns=['individual identity','sex','age','exact capture date','GPS location'];
  if(!note.species_confirmed && note.species_confirmed!==undefined)unknowns.push('exact species / lineage');
  if(note.individual_names){}else unknowns.push('animal names');
  const ug=$('unknown-grid');[...new Set(unknowns)].forEach(v=>ug.append(text('span',v,'unknown-chip')));
  const sources=$('source-list');
  (note.sources||[]).forEach((s,i)=>{const a=document.createElement('a');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';a.append(text('span',(s.type||'source').replaceAll('_',' ')),text('span','Open ↗'));sources.append(a);});
  const people=(note.photos||[]).some(p=>p.recognisable_people_visible);
  $('privacy-detail').textContent=people?'At least one supplied frame contains recognisable visitors or children. Publication rights are also unverified, so the original binaries remain private.':'No recognisable visitor was flagged in some frames, but publication rights are still unverified, so the original binaries remain private.';
  if(pic){
    const fig=$('note-reference');fig.replaceChildren();
    const img=document.createElement('img');img.src=pic.image_url;img.alt='Public species-reference image for '+display+', not Josh\'s field photograph.';img.referrerPolicy='no-referrer';
    const cap=text('figcaption');const a=document.createElement('a');a.href=pic.file_page;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Public reference photo: '+pic.author;cap.append(a,document.createTextNode(' · '+pic.licence+' · not Josh\'s field photo'));fig.append(img,cap);
  }
  if(animal){$('related-animal').href='/animals/'+String(animalNo).padStart(3,'0')+'-'+animalSlug(animal.name);$('related-animal').textContent='Explore '+display+' research →';}
  $('real-media-link').href='/#real-media-'+String(noteNumber).padStart(3,'0');
  $('source-file-link').href='https://github.com/joshualparris/Dubbozoo/blob/main/observations/'+sourcePaths[index];
  $('previous-note').href=pageFor((index+5)%6);$('next-note').href=pageFor((index+1)%6);
  $('copy-note-url').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);$('copy-note-url').textContent='Copied ✓';}catch{window.prompt('Copy link',location.href);}};
 }catch(e){$('note-title').textContent='Field note unavailable';$('note-lead').textContent='The observation data could not be loaded.';}
})();