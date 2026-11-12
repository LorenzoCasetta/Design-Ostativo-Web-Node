const embedded=new URLSearchParams(location.search).get('embedded')==='1';
window.closeWebNode=async()=>{
 if(embedded){await chrome.runtime.sendMessage({kind:'unsplit',tabId:window.sourceTabId()});}
 else window.close();
};
window.splitWebNode=async()=>{
 const status=frame.contentDocument?.querySelector('#vstatus span');
 try{
  const id=window.sourceTabId();if(!id)throw Error('Pagina non disponibile.');
  const result=await chrome.runtime.sendMessage({kind:embedded?'unsplit':'split',tabId:id});
  if(!result?.ok)throw Error(result?.error||'Impossibile aprire la mappa.');
  if(!embedded)window.close();
 }catch(e){if(status)status.textContent='Split non disponibile: '+e.message;}
};
