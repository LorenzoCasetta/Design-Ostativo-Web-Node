let sourceTab=null,snapshot=null,signature='',busy=false,epoch=0;
const pinnedTab=Number(new URLSearchParams(location.search).get('sourceTab'))||null;
window.sourceTabId=()=>sourceTab;
const notice=document.getElementById('notice'),frame=document.getElementById('map');
window.mapSnapshot=()=>snapshot;
window.navigateNode=async url=>{
 if(!sourceTab||!snapshot)return;
 const allowed=new Set([snapshot.url,...snapshot.links.map(l=>l.url)]);
 if(!allowed.has(url)||!/^https?:/.test(url))return;
 if(url===snapshot.url)return;
 try{await chrome.tabs.update(sourceTab,{url});}catch{notice.textContent='Scheda chiusa. Apri una pagina e premi Web Node.';}
};
async function refresh(force=false){
 if(busy)return;busy=true;const ticket=epoch;
 try{
  const tab=pinnedTab?await chrome.tabs.get(pinnedTab):(await chrome.tabs.query({active:true,currentWindow:true}))[0];
  if(!tab)throw Error('Nessuna scheda attiva.');
  const [{result:d}]=await chrome.scripting.executeScript({target:{tabId:tab.id},func:collectPage});
  if(ticket!==epoch)return;
  if(!d||!/^https?:/.test(d.url))throw Error('Pagina non supportata.');
  const sig=JSON.stringify([tab.id,d.url,d.links]);
  sourceTab=tab.id;
  if(sig===signature){if(force)notice.textContent=d.host+' · Link riletti, nessuna modifica.';return;}
  snapshot=d;signature=sig;
  snapshot.tree=buildPageTree(d);
  let count=0;function countNodes(n){count++;(n.children||[]).forEach(countNodes);}countNodes(snapshot.tree);
  notice.textContent=d.host+' · '+count+' nodi · '+d.links.length+' link rilevati'+(d.limited?' (limite raggiunto)':'')+'.';
  if(!d.links.length)notice.textContent+=' Nessun collegamento interno trovato.';
  notice.hidden=true;frame.hidden=false;frame.src='map.html?revision='+Date.now();
 }catch(e){
  snapshot=null;signature='';sourceTab=null;frame.hidden=true;notice.hidden=false;
  notice.textContent='Apri una pagina web e premi l’icona Web Node nella barra di Chrome per consentirne la lettura. Le pagine interne e alcuni siti protetti non sono accessibili.';
 }finally{busy=false;}
}


chrome.tabs.onActivated.addListener(()=>{if(pinnedTab)return;epoch++;signature='';snapshot=null;sourceTab=null;frame.hidden=true;notice.hidden=false;setTimeout(()=>refresh(),200);});
chrome.tabs.onUpdated.addListener((id,info)=>{if(id===sourceTab&&(info.status==='complete'||info.url))refresh();});
setInterval(()=>refresh(),4000);refresh();
