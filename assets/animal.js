'use strict';
(async()=>{
 const $=id=>document.getElementById(id);
 const path=location.pathname.match(/\/animals\/(\d{1,3})(?:-|\/|$)/);
 const number=path?Number(path[1]):Number(new URLSearchParams(location.search).get('id')||0);
 const root='https://github.com/joshualparris/Dubbozoo/blob/main/';
 const slug=s=>String(s).toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,55);
 const pageURL=x=>'/animals/'+String(x.number).padStart(3,'0')+'-'+slug(x.name);
 const el=(tag,txt='',cls='')=>{const e=document.createElement(tag);if(txt)e.textContent=String(txt);if(cls)e.className=cls;return e;};
 const href=(txt,url)=>{const a=el('a',txt);try{const x=new URL(url,location.origin);if(x.protocol==='https:'||x.origin===location.origin){a.href=x.href;if(x.origin!==location.origin){a.target='_blank';a.rel='noopener noreferrer';}}}catch{}return a;};
 const label=s=>{
  if(['unverified','historical_visitor_photo_unverified_accession','historical_visitor_history_unverified_accession','primary_plan_secondary_visit_not_confirmed_arrival'].includes(s))return 'Formal Dubbo holding unverified';
  if(s==='on_site_rehabilitation_only_verified')return 'Temporary rescue care only';
  if(s==='historical_aviary_photographic_evidence')return 'Historical aviary photo evidence';
  if(/government|confirmed_national/.test(s||''))return 'Government-verified historic programme';
  if(/historical|historic/.test(s||''))return 'Documented historical zoo record';
  return 'Zoo map / historical research source';
 };
 const codes={CR:'Critically Endangered',EN:'Endangered',VU:'Vulnerable',NT:'Near Threatened',LC:'Least Concern',EW:'Extinct in the Wild',EX:'Extinct'};
 const tabs=['overview','research','conservation','questions','notes'];
 const tabBtns=[...document.querySelectorAll('[data-tab]')];
 let animal=null,scientific=null,species=[],guideSections=[],qReady=false;
 const load=async file=>{const r=await fetch('/data/'+file,{credentials:'omit'});if(!r.ok)throw Error(file+': '+r.status);return r.json();};
 const error=message=>{$('animal-title').textContent='Animal page unavailable';$('animal-intro').textContent=message;$('overview-text').textContent='Return to the animal catalogue and select a research profile.';};
 function tab(name,write=true){
   if(!tabs.includes(name))name='overview';
   for(const n of tabs)$('panel-'+n).hidden=n!==name;
   tabBtns.forEach(b=>{const on=b.dataset.tab===name;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;});
   if(write)history.replaceState(null,'','#'+name);
   if(name==='questions')showQuestions();
 }
 tabBtns.forEach(b=>{
   b.addEventListener('click',()=>tab(b.dataset.tab));
   b.addEventListener('keydown',event=>{
     if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
     event.preventDefault();const i=tabs.indexOf(b.dataset.tab);
     const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length;
     tabBtns[next].focus();tab(tabs[next]);
   });
 });
 $('go-research').onclick=()=>tab('research');
 $('go-questions').onclick=()=>tab('questions');
 $('expand-sections').onclick=()=>document.querySelectorAll('.detail-section').forEach(e=>e.open=true);
 $('collapse-sections').onclick=()=>document.querySelectorAll('.detail-section').forEach(e=>e.open=false);
 $('copy-page-url').onclick=async()=>{
   try{await navigator.clipboard.writeText(location.href);$('copy-page-url').textContent='Copied ✓';}
   catch{window.prompt('Copy link',location.href);}
 };
 function inline(target,content,guide){
   const text=String(content||'');
   const re=/\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|\*([^*\n]+)\*/g;
   let m,pos=0;while((m=re.exec(text))){
     target.append(document.createTextNode(text.slice(pos,m.index)));
     if(m[1]!==undefined){let address=m[2];if(!/^https?:\/\//.test(address)){
       const base=root+guide.slice(0,guide.lastIndexOf('/')+1);
       try{address=new URL(address,base).href;}catch{address=root+guide;}
     }target.append(href(m[1],address));}
     else target.append(el(m[3]!==undefined?'strong':'em',m[3]||m[4]));
     pos=re.lastIndex;
   }target.append(document.createTextNode(text.slice(pos)));
 }
 function markdown(source,guide){
   const frag=document.createDocumentFragment();let paragraph=[],list=null;
   const flush=()=>{if(paragraph.length){const p=el('p');inline(p,paragraph.join(' '),guide);frag.append(p);paragraph=[];}};
   for(const raw of String(source||'').split(/\r?\n/)){
     const line=raw.trim();
     if(!line){flush();list=null;continue;}
     const h=line.match(/^#{3,5}\s+(.+)/);
     if(h){flush();list=null;const head=el('h3');inline(head,h[1],guide);frag.append(head);continue;}
     const bullet=line.match(/^[-*]\s+(.+)$/)||line.match(/^\d+[.)]\s+(.+)$/);
     if(bullet){flush();if(!list){list=el(/^\d/.test(line)?'ol':'ul');frag.append(list);}const item=el('li');inline(item,bullet[1],guide);list.append(item);continue;}
     if(line.startsWith('|')){flush();list=null;const item=el('p');inline(item,line.replace(/^\||\|$/g,'').replace(/\|/g,' · '),guide);frag.append(item);continue;}
     if(line.startsWith('>')){flush();list=null;const quote=el('blockquote');inline(quote,line.replace(/^>\s*/,''),guide);frag.append(quote);continue;}
     paragraph.push(line);
   }flush();return frag;
 }
 if(number<1||number>89){error('No valid animal number was supplied.');return;}
 try{
   const [inventory,audit,photoData]=await Promise.all([load('all-time-animal-inventory.json'),load('iucn-assessment-audit-2026-10-18.json'),load('curated-wildlife-images.json')]);
   species=inventory.entries;animal=species.find(x=>x.number===number);
   scientific=audit.entries.find(x=>x.number===number);
   if(!animal)throw Error('This animal is not in the catalogue.');
   const pic=(photoData.entries||[]).find(x=>x.number===number);
   const slot=document.querySelector('#animal-portrait .animal-photo-slot');
   if(pic&&slot){
      const figure=el('figure','','animal-photo'),img=el('img');
      img.src=pic.image_url;img.alt='Wildlife reference photo of '+animal.name+'; not a confirmed photograph of an animal at Dubbo Zoo.';
      img.loading='eager';img.decoding='async';img.referrerPolicy='no-referrer';
      const caption=el('figcaption');
      caption.append(href('Photo: '+pic.author,pic.file_page),document.createTextNode(' · '),href(pic.licence,pic.license_url),document.createTextNode(' · cropped for display'));
      const note=el('span','Reference photo · not a Dubbo zoo animal ID','photo-reference');
      figure.append(img,caption,note);slot.replaceChildren(figure);slot.dataset.photoStatus='curated';
      img.addEventListener('error',()=>{
         slot.dataset.photoStatus='unavailable';
         slot.replaceChildren(href('Photo unavailable — inspect Wikimedia source ↗',pic.file_page));
      });
   }
 }catch(e){error(String(e));return;}
 const fullURL=pageURL(animal);
 document.title=animal.name+' | Dubbozoo Animal Research';
 document.querySelector('meta[name="description"]').content='Research '+animal.name+': species ecology, Dubbo historical evidence, conservation and interactive notes.';
 $('animal-title').textContent=animal.name;
 $('animal-breadcrumb').textContent=animal.name;
 $('animal-number').textContent=String(number).padStart(3,'0')+' / 089';
 $('animal-scientific').textContent=scientific?.assessed_taxon||animal.scientific_name||'Precise historical taxon not yet confirmed';
 $('animal-meta').append(el('span',animal.region),el('span',label(animal.holding_evidence_status)));
 $('overview-heading').textContent='Meet '+animal.name;
 $('quick-evidence').textContent=label(animal.holding_evidence_status)+'. Historical research does not establish a current 2026 zoo census.';
 $('quick-source').href=animal.source_url||root+animal.guide;
 $('original-research').href=root+animal.guide;
 const cat=scientific?.iucn_category;
 $('quick-conservation').append(el('div',codes[cat]||'Not individually verified','detail-status-value'));
 if(cat)$('quick-conservation').append(el('p','IUCN '+cat+' · source year '+(scientific.publication_year||'not recorded'),'detail-small'));
 [['IUCN category',cat?(codes[cat]+' ('+cat+')'):'Not independently verified'],
  ['Wild population trend',scientific?.population_trend||'Not independently verified'],
  ['Taxon assessed',scientific?.assessed_taxon||'Taxon-matched assessment missing'],
  ['Assessment date',scientific?.assessment_date||'Not recorded'],
  ['Publication year',scientific?.publication_year||'Not recorded'],
  ['Evidence grade',String(scientific?.assessment_status||'not_checked').replaceAll('_',' ')]].forEach(([k,v])=>{
     const c=el('div','','detail-fact');c.append(el('span',k,'eyebrow'),el('strong',v));$('conservation-facts').append(c);
  });
 $('conservation-caution').textContent=scientific?.evidence_note||'A current taxon-matched IUCN assessment has not been independently verified. Old numbers must not be presented as current.';
 [['IUCN assessment / source',scientific?.source_url],['Historical Dubbo site evidence',animal.source_url],['Original species guide',root+animal.guide],['Full Red List provenance audit',root+'docs/iucn-assessment-audit-2026-10-18.md']].forEach(([name,url])=>{
   if(url)$('conservation-sources').append(href(name+' ↗',url));
 });
 try{
   const r=await fetch('/'+animal.guide,{credentials:'omit'});
   if(!r.ok)throw Error('HTTP '+r.status);
   const content=await r.text();const parts=content.split(/(?=^## [^\n]+\r?$)/gm);
   const intro=(parts.shift()||'').replace(/^#[^\n]+\r?\n/,'').trim();
   guideSections=parts.map(part=>{const match=part.match(/^## ([^\n]+)\r?\n/);return match?{title:match[1].trim(),body:part.slice(match[0].length).trim()}:null;}).filter(Boolean);
   const highlight=guideSections.find(x=>/identity|ecology|feeding|species|natural history|description/i.test(x.title));
   const snippet=(highlight?.body||intro).slice(0,2200);
   $('overview-text').replaceChildren(markdown(snippet,animal.guide));
   const plain=snippet.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'$1').replace(/[*#]/g,'').replace(/\s+/g,' ').trim();
   $('animal-intro').textContent=plain.slice(0,270)+(plain.length>270?'…':'');
   if(!guideSections.length)guideSections=[{title:'Full species guide',body:intro}];
   $('research-sections').replaceChildren();
   guideSections.forEach((part,i)=>{
     const card=el('details','','detail-section');card.open=i===0;
     const summary=el('summary',part.title),body=el('div','','detail-section-body');
     body.append(markdown(part.body,animal.guide));card.append(summary,body);$('research-sections').append(card);
   });
 }catch(e){
   $('animal-intro').textContent='Original research text is not available from this deployment, but the research guide can be opened on GitHub.';
   $('overview-text').replaceChildren(el('p','Guide text unavailable: '+String(e)));
   $('research-sections').replaceChildren(el('p','Please read the guide on GitHub.'),href('Open original research ↗',root+animal.guide));
 }
 const sameRegion=species.filter(x=>x.region===animal.region&&x.number!==number);
 const prefix=(scientific?.assessed_taxon||animal.scientific_name||'').split(' ')[0];
 const close=sameRegion.filter(x=>prefix&&String(x.scientific_name||'').startsWith(prefix+' '));
 [...close,...sameRegion].filter((x,i,a)=>a.findIndex(y=>x.number===y.number)===i).slice(0,6).forEach(x=>{
   const card=el('a','','related-card');card.href=pageURL(x);
   card.append(el('span',x.region+' / '+String(x.number).padStart(3,'0')),el('strong',x.name),el('span','Read profile →'));
   $('related-animals').append(card);
 });
 const idx=species.findIndex(x=>x.number===number),prev=species[(idx+species.length-1)%species.length],next=species[(idx+1)%species.length];
 $('previous-animal').href=pageURL(prev);$('previous-animal').textContent='← '+prev.name;
 $('next-animal').href=pageURL(next);$('next-animal').textContent=next.name+' →';
 async function showQuestions(){
   if(qReady)return;qReady=true;const node=$('animal-questions');node.replaceChildren();
   if(number>61){
     const sections=guideSections.filter(x=>/question|unknown|verification|archive|unresolved|research gap|still need|future/i.test(x.title));
     if(sections.length){
       sections.forEach(section=>{
         const d=el('details','','animal-question'),s=el('summary',section.title),body=el('div');
         body.append(markdown(section.body,animal.guide));d.append(s,body);node.append(d);
       });
       node.append(el('p','These questions and evidence gaps come from this species research guide. They are not unrelated questions borrowed from the old 61-species atlas.','detail-small'));
     } else {
       const state=el('div','','animal-blank-state');
       state.append(el('p','The source guide predates a separately numbered question set for this historical entry. Open the detailed source sections to see remaining research and archival evidence gaps.'));
       state.append(href('Read full guide on GitHub ↗',root+animal.guide));
       node.append(state);
     }
     return;
   }
   try{
     const ledger=await load('question-verification-ledger-2026-10-18.json');
     const relevant=ledger.questions.filter(q=>{const id=Number(q.id.replace(/[^0-9]/g,''));return id>(number-1)*4&&id<=number*4;});
     if(!relevant.length)throw Error('No linked questions');
     relevant.forEach(q=>{
       const d=el('details','','animal-question'),s=el('summary',q.id+' · '+q.question),b=el('div');
       b.append(el('p',q.current_atlas_answer||q.previous_ai_answer||'Answer not established.'));
       b.append(el('p',q.source_review_status==='not_freshly_verified'?'Not independently source-checked.':'Dated AI source-text check recorded, not human peer reviewed.','detail-small'));
       d.append(s,b);node.append(d);
     });
   }catch(e){node.append(el('p','Question data unavailable.'),href('Open full question atlas ↗',root+'docs/UNANSWERED_QUESTIONS_ATLAS_2026-10-18.md'));}
 }
 const key='dubbozoo:field-note:'+number+':v1';
 const get=()=>{try{return JSON.parse(localStorage.getItem(key)||'null');}catch{return null;}};
 const store=obj=>{try{localStorage.setItem(key,JSON.stringify(obj));return true;}catch{return false;}};
 const date=$('field-date');
 const now=new Date();date.value=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
 const saved=get();if(saved){date.value=saved.date||date.value;$('field-count').value=saved.count??'';$('field-notes').value=saved.text||'';$('note-result').textContent='A note is saved privately on this device.';}
 function note(){return {schema:1,animal_number:number,animal_name:animal.name,date:date.value||null,count:$('field-count').value===''?null:Number($('field-count').value),text:$('field-notes').value.trim(),saved_at:new Date().toISOString()};}
 $('field-form').addEventListener('submit',event=>{event.preventDefault();$('note-result').textContent=store(note())?'Saved on this device only.':'Browser storage unavailable. Please export your note.';});
 $('export-note').onclick=()=>{
   const file=new Blob([JSON.stringify(get()||note(),null,2)],{type:'application/json'});
   const url=URL.createObjectURL(file),a=el('a');a.href=url;a.download='dubbozoo-'+number+'-notes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
 $('delete-note').onclick=()=>{if(!confirm('Delete this private note from this browser?'))return;try{localStorage.removeItem(key);}catch{}$('field-notes').value='';$('field-count').value='';$('note-result').textContent='Private note deleted.';};
 tab(tabs.includes(location.hash.slice(1))?location.hash.slice(1):'overview',false);
 window.addEventListener('hashchange',()=>tab(location.hash.slice(1),false));
})();