/* Dubbozoo private safari journal — local browser storage only. */
(() => {
  'use strict';
  const el=id=>document.getElementById(id);
  const KEY='dubbozoo-private-safari-v1';
  const S={selected:null,records:{}};
  const safeText=(v,max=1000)=>String(v??'').trim().slice(0,max);
  const load=()=>{
    try{
      const data=JSON.parse(localStorage.getItem(KEY)||'{}');
      if(data&&typeof data==='object'&&!Array.isArray(data)){
        for(const [id,r] of Object.entries(data)){
          if(!/^[a-z0-9-]{1,60}$/.test(id)||!r||typeof r!=='object')continue;
          S.records[id]={
            id,
            name:safeText(r.name,120)||id,
            animalNumber:Number.isFinite(Number(r.animalNumber))?Number(r.animalNumber):null,
            seen:Boolean(r.seen),
            note:safeText(r.note),
            updatedAt:safeText(r.updatedAt,40)
          };
        }
      }
    }catch(e){}
  };
  const save=()=>{
    try{localStorage.setItem(KEY,JSON.stringify(S.records));return true}catch(e){return false}
  };
  const fmtDate=s=>{
    if(!s)return'';
    const d=new Date(s);return Number.isNaN(d.getTime())?'':d.toLocaleString('en-AU',{dateStyle:'medium',timeStyle:'short'});
  };
  const selectedRecord=()=>S.selected?S.records[S.selected.id]||null:null;
  const status=msg=>{const n=el('visit-status');if(n)n.textContent=msg};
  function render(){
    const records=Object.values(S.records).sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
    const seen=records.filter(r=>r.seen);
    if(el('visit-count'))el('visit-count').textContent=seen.length+' animal'+(seen.length===1?'':'s')+' seen · '+records.length+' recorded';
    if(el('visit-current'))el('visit-current').textContent=S.selected?'Selected: '+S.selected.name:'Choose an animal first';
    const rec=selectedRecord();
    if(el('visit-note'))el('visit-note').value=rec?.note||'';
    if(el('mark-seen'))el('mark-seen').setAttribute('aria-pressed',String(Boolean(rec?.seen)));
    if(el('mark-not-seen'))el('mark-not-seen').setAttribute('aria-pressed',String(Boolean(rec&&!rec.seen)));
    for(const id of ['mark-seen','mark-not-seen','save-visit-note'])if(el(id))el(id).disabled=!S.selected;
    const list=el('visit-list');if(!list)return;
    list.replaceChildren();
    if(!records.length){
      const p=document.createElement('p');p.className='hint';p.textContent='Nothing recorded yet. Select an animal, then mark what you actually saw.';list.append(p);return;
    }
    for(const r of records){
      const item=document.createElement('article');item.className='visit-item';
      const h=document.createElement('strong');h.textContent=(r.seen?'✓ ':'○ ')+r.name;
      const meta=document.createElement('small');meta.textContent=(r.seen?'Seen':'Not seen')+(fmtDate(r.updatedAt)?' · '+fmtDate(r.updatedAt):'');
      item.append(h,meta);
      if(r.note){const p=document.createElement('p');p.textContent=r.note;item.append(p)}
      list.append(item);
    }
  }
  function ensureRecord(seen){
    if(!S.selected)return null;
    const old=S.records[S.selected.id]||{};
    const r=S.records[S.selected.id]={
      id:S.selected.id,
      name:S.selected.name,
      animalNumber:S.selected.animalNumber,
      seen:Boolean(seen),
      note:safeText(old.note),
      updatedAt:new Date().toISOString()
    };
    return r;
  }
  function mark(seen){
    if(!S.selected){status('Choose an animal first.');return}
    ensureRecord(seen);const ok=save();render();
    status(ok?(seen?'Marked as seen on this device.':'Marked as not seen yet on this device.'):'Browser storage is unavailable; this may not persist.');
  }
  function saveNote(){
    if(!S.selected){status('Choose an animal first.');return}
    const old=S.records[S.selected.id];
    const r=ensureRecord(old?.seen||false);r.note=safeText(el('visit-note')?.value);r.updatedAt=new Date().toISOString();
    const ok=save();render();status(ok?'Safari note saved on this device.':'Browser storage is unavailable; this may not persist.');
  }
  function exportMarkdown(){
    const records=Object.values(S.records).sort((a,b)=>(a.name||'').localeCompare(b.name||''));
    if(!records.length){status('Nothing to export yet.');return}
    const lines=['# My Dubbo Zoo Safari','','Exported '+new Date().toLocaleString('en-AU')+'.',''];
    for(const r of records){
      lines.push('## '+(r.seen?'✓ ':'○ ')+r.name,'',r.seen?'Status: Seen':'Status: Not seen yet');
      if(r.note)lines.push('',r.note);
      lines.push('');
    }
    const blob=new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='my-dubbo-zoo-safari.md';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    status('Safari journal exported.');
  }
  function clearAll(){
    if(!Object.keys(S.records).length)return;
    if(!window.confirm('Erase your safari journal from this browser?'))return;
    S.records={};try{localStorage.removeItem(KEY)}catch(e){}
    render();status('Safari journal erased from this browser.');
  }
  function select(detail){
    if(!detail||typeof detail.id!=='string')return;
    S.selected={id:detail.id,name:safeText(detail.name,120)||detail.id,animalNumber:Number(detail.animalNumber)||null};
    render();status(selectedRecord()?'Loaded your saved record for this animal.':'Ready to record what you actually saw.');
  }
  load();
  document.addEventListener('dubbozoo:stop-selected',e=>select(e.detail));
  el('mark-seen')?.addEventListener('click',()=>mark(true));
  el('mark-not-seen')?.addEventListener('click',()=>mark(false));
  el('save-visit-note')?.addEventListener('click',saveNote);
  el('export-safari')?.addEventListener('click',exportMarkdown);
  el('clear-safari')?.addEventListener('click',clearAll);
  render();
})();