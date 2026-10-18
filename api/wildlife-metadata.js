// Same-origin, whitelisted Wikimedia/iNaturalist metadata proxy.
// Needed because Android/mobile browsers can block third-party API CORS calls.
// No tokens, user data, cookies, tracking, image uploads or untrusted outbound hosts.
export default async function handler(req,res) {
  const mode=String(req.query?.site||'').slice(0,20);
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const base=mode==='wiki'?'https://en.wikipedia.org/w/api.php':mode==='commons'?'https://commons.wikimedia.org/w/api.php':mode==='inat'?'https://api.inaturalist.org/v1/observations':null;
  if(!base)return res.status(400).json({error:'Invalid source'});
  const url=new URL(base);
  const allowedWiki=['action','format','formatversion','redirects','prop','piprop','pithumbsize','titles','generator','gsrsearch','gsrnamespace','gsrlimit','iiprop','iiurlwidth','iiextmetadatafilter'];
  const allowedInat=['taxon_name','photos','photo_license','quality_grade','per_page','order_by','order'];
  const allow=new Set(mode==='inat'?allowedInat:allowedWiki);
  for(const [key,value] of Object.entries(req.query||{})){
    if(!allow.has(key)||typeof value!=='string'||value.length>1900)continue;
    url.searchParams.set(key,value);
  }
  if(mode!=='inat'){
    if(url.searchParams.get('action')!=='query'||url.searchParams.get('format')!=='json')return res.status(400).json({error:'Only Wikimedia JSON image queries permitted'});
    url.searchParams.set('formatversion','2');
  } else url.searchParams.set('per_page',String(Math.min(20,Number(url.searchParams.get('per_page')||12)||12)));
  const timeout=AbortSignal.timeout(12500);
  try{
    const response=await fetch(url,{headers:{'Accept':'application/json','User-Agent':'DubbozooResearch/1.2 (https://github.com/joshualparris/Dubbozoo; publicly licensed animal imagery, contact via GitHub Issues)'},signal:timeout});
    if(!response.ok)return res.status(502).json({error:'Upstream image metadata unavailable',http:response.status,source:mode});
    const raw=await response.text();
    if(raw.length>420000)return res.status(502).json({error:'Upstream reply too large'});
    res.setHeader('Cache-Control','public,s-maxage=86400,stale-while-revalidate=604800');
    res.setHeader('Content-Type','application/json; charset=utf-8');
    return res.status(200).send(raw);
  }catch(e){return res.status(502).json({error:'External image lookup failed',source:mode,kind:e?.name||'network'});}
}
