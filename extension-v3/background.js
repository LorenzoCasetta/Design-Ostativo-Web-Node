chrome.runtime.onMessage.addListener((msg,sender,respond)=>{
 if(msg.kind==='source-tab'){respond({id:sender.tab?.id});return;}
 if(!['split','unsplit'].includes(msg.kind))return;
 (async()=>{
  const id=Number(msg.tabId);if(!Number.isInteger(id))throw Error('Scheda non valida');
  const key='embedded-'+id;
  if(msg.kind==='split'){
   await chrome.scripting.executeScript({target:{tabId:id},files:['split-content.js']});
   await chrome.storage.session.set({[key]:true});
  }else{
   await chrome.storage.session.remove(key);
   await chrome.scripting.executeScript({target:{tabId:id},func:()=>window.__webNodeSplitV3?.remove()});
  }
  respond({ok:true});
 })().catch(e=>respond({ok:false,error:e.message}));
 return true;
});
chrome.tabs.onUpdated.addListener(async(id,info)=>{
 if(info.status!=='complete')return;
 const key='embedded-'+id;
 if((await chrome.storage.session.get(key))[key]){
  try{await chrome.scripting.executeScript({target:{tabId:id},files:['split-content.js']});}
  catch{await chrome.storage.session.remove(key);}
 }
});
chrome.tabs.onRemoved.addListener(id=>chrome.storage.session.remove('embedded-'+id));
