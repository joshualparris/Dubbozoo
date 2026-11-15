/* Dubbozoo safari journal — no network, no GPS in journal records. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const KEY='dubbozoo-safari-journal-v1';
  const records=new Map();
  let current=null,dirty=false;
  const safeText=t=>String(t||'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').slice(0,1000);
  const showMessage=t=>{$('visit-status').textContent=t};
  function getEntry(){
    if(!current)return null;
    const key=String(current.animalNumber);
    if(!records.has(key))records.set(key,{number:current.animalNumber,name:current.name,seen:false,seenAt:null,note:'',updatedAt:null});
    return records.get(key);
  }
  function persist(){
    try {
      const values=Array.from(records.values()).filter(x=>x.seen||x.note);
      localStorage.setItem(KEY,JSON.stringify({version:1,entries:values}));
      return true;
    } catch(err) {showMessage('Browser storage is unavailable. Export your notes before leaving.');return false}
  }
  function load(){
    try{
      const j=JSON.parse(localStorage.getItem(KEY)||'{}');
      if(!Array.isArray(j.entries))return;
      for(const x of j.entries){
        if(!x||!Number.isInteger(x.number)||x.number<1||x.number>200||typeof x.name!=='string')continue;
        if(records.size>=100)break;
        records.set(String(x.number),{number:x.number,name:safeText(x.name).slice(0,90),
          seen:x.seen===true,seenAt:typeof x.seenAt==='string'?x.seenAt.slice(0,50):null,
          note:safeText(x.note),updatedAt:typeof x.updatedAt==='string'?x.updatedAt.slice(0,50):null});
      }
    }catch(err){}
  }
  function render(){
    const found=Array.from(records.values()).filter(x=>x.seen);
    $('visit-count').textContent=found.length+' species seen';
    const root=$('visit-list');root.replaceChildren();
    if(!found.length){
      const p=document.createElement('p');p.className='hint';
      p.textContent='Your list is empty. Tap “I saw this animal” only when you actually see it.';
      root.append(p);
    }else{
      for(const x of found.sort((a,b)=>(a.seenAt||'').localeCompare(b.seenAt||''))){
        const card=document.createElement('article');card.className='visit-entry';
        const heading=document.createElement('strong');heading.textContent='✓ '+x.name;
        const date=document.createElement('span');date.className='hint';
        try{date.textContent=x.seenAt?new Date(x.seenAt).toLocaleString('en-AU'):'Date unknown'}
        catch(e){date.textContent='Date unknown'}
        card.append(heading,date);
        if(x.note){const note=document.createElement('p');note.textContent=x.note;card.append(note)}
        root.append(card);
      }
    }
    const entry=current?getEntry():null;
    $('visit-current').textContent=current?(entry.seen?'✓ Seen: ':'Current animal: ')+current.name:'Choose an animal';
    $('mark-seen').disabled=!current;
    $('mark-not-seen').disabled=!current||!entry.seen;
    $('save-visit-note').disabled=!current;
    if(entry && !dirty)$('visit-note').value=entry.note||'';
  }
  function changedSelection(e){
    const info=e.detail||{},num=Number(info.animalNumber);
    if(!Number.isInteger(num)||num<1)return;
    // Store unfinished notes before an automatic GPS card change.
    flushDraft();
    current={animalNumber:num,name:safeText(info.name).slice(0,90),stopId:safeText(info.id).slice(0,60)};
    dirty=false;
    render();
    showMessage('Journal is private to this browser. Nearby GPS alone never marks an animal seen.');
  }
  function flushDraft(){
    if(!dirty||!current)return;
    const entry=getEntry();entry.note=safeText($('visit-note').value).trim();
    entry.updatedAt=new Date().toISOString();
    dirty=false;persist();
  }
  function seen(){
    if(!current)return;
    flushDraft();
    const entry=getEntry();entry.seen=true;
    if(!entry.seenAt)entry.seenAt=new Date().toISOString();
    entry.updatedAt=new Date().toISOString();persist();render();showMessage('Marked as seen — saved only on this device.');
  }
  function notSeen(){
    if(!current)return;
    flushDraft();
    const entry=getEntry();entry.seen=false;entry.seenAt=null;entry.updatedAt=new Date().toISOString();
    persist();render();showMessage('Removed from seen list. Any notes remain saved.');
  }
  function exportJournal(){
    flushDraft();
    const data=Array.from(records.values()).filter(x=>x.seen||x.note).sort((a,b)=>a.name.localeCompare(b.name));
    if(!data.length){showMessage('Record a sighting or note before exporting.');return}
    const lines=['# My Dubbozoo safari field journal','','Exported '+new Date().toLocaleString('en-AU')+'.','','This is my personal observation notebook, not a verified current animal census. No GPS coordinates are included.',''];
    for(const x of data){
      lines.push('## '+x.name,'','Seen: '+(x.seen?'Yes':'Not recorded'));
      if(x.seenAt)lines.push('First marked seen: '+x.seenAt);
      if(x.note)lines.push('','My notes:',...x.note.split('\n').map(z=>'  '+z));
      lines.push('');
    }
    const blob=new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='dubbozoo-safari-'+new Date().toISOString().slice(0,10)+'.md';
    a.style.display='none';document.body.append(a);a.click();a.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),2000);
    showMessage('Export created on your device. Check Downloads for the Markdown journal.');
  }
  function clearAll(){
    if(!records.size)return;
    if(!window.confirm('Permanently erase your saved safari sightings and notes from this browser?'))return;
    records.clear();dirty=false;
    try{localStorage.removeItem(KEY)}catch(err){}
    $('visit-note').value='';render();showMessage('Saved safari journal cleared on this browser.');
  }
  load();
  $('mark-seen').addEventListener('click',seen);
  $('mark-not-seen').addEventListener('click',notSeen);
  $('save-visit-note').addEventListener('click',()=>{
    if(!current)return;dirty=true;flushDraft();render();showMessage('Note saved locally. It is not marked as a sighting unless you choose “I saw this animal”.');
  });
  $('visit-note').addEventListener('input',()=>{dirty=true;$('visit-status').textContent='Draft note — tap Save note, or it will be saved when you change animal.'});
  $('export-safari').addEventListener('click',exportJournal);
  $('clear-safari').addEventListener('click',clearAll);
  document.addEventListener('dubbozoo:stop-selected',changedSelection);
  window.addEventListener('pagehide',flushDraft);
  render();
})();