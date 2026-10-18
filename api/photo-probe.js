export default async function handler(req,res) {
  const species=String(req.query?.species||'Lion').slice(0,80);
  const u=new URL('https://en.wikipedia.org/w/api.php');
  for (const [k,v] of Object.entries({action:'query',format:'json',formatversion:'2',prop:'pageimages',piprop:'name|thumbnail',pithumbsize:'720',titles:species}))u.searchParams.set(k,v);
  const out={species,via:'vercel-server-remote-mediawiki',checked_at:new Date().toISOString()};
  try{const response=await fetch(u,{headers:{'User-Agent':'DubbozooResearchBot/1.0 (https://github.com/joshualparris/Dubbozoo; open-license image source lookup)','Accept':'application/json'}});out.wikipedia_http=response.status;const data=await response.json();out.page=data.query?.pages?.[0];}
  catch(e){out.error=String(e).slice(0,500);}
  res.setHeader('Cache-Control','public,s-maxage=3600,stale-while-revalidate=86400');res.status(200).json(out);
}
