const files=['collector.js','sitemap.js','hierarchy.js','engine.js','ui-bundle.js','content-ui.js'];
const queues=new Map();
function serial(id,work){
 const task=(queues.get(id)||Promise.resolve()).catch(()=>{}).then(work);
 queues.set(id,task);task.finally(()=>{if(queues.get(id)===task)queues.delete(id);}).catch(()=>{});return task;
}
chrome.runtime.onMessage.addListener((msg,sender,reply)=>{
 if(msg.kind!=='wn41-state'||!sender.tab)return;
 serial(sender.tab.id,async()=>{
  const key='wn41-'+sender.tab.id;
  if(msg.state)await chrome.storage.session.set({[key]:msg.state});else await chrome.storage.session.remove(key);
 }).then(()=>reply({ok:true}),e=>reply({ok:false,error:e.message}));
 return true;
});
async function restore(id){
 const key='wn41-'+id,state=(await chrome.storage.session.get(key))[key];if(!state)return;
 // Do not recreate an already mounted map on SPA navigations or reset its camera.
 const [{result:mounted,documentId}]=await chrome.scripting.executeScript({target:{tabId:id},func:()=>!!window.__webNode41?.host.isConnected});
 if(mounted)return;
 const target={tabId:id,documentIds:[documentId]};
 await chrome.scripting.executeScript({target,func:s=>{window.__webNodeRestore=s;},args:[state]});
 await chrome.scripting.executeScript({target,files});
}
chrome.tabs.onUpdated.addListener((id,info)=>{
 if(info.status!=='loading'&&info.status!=='complete')return;
 serial(id,()=>restore(id)).catch(()=>{
  // Loading documents, redirects and temporarily missing permissions must not
  // erase the session. The next update retries; only an explicit close clears it.
 });
});
chrome.tabs.onRemoved.addListener(id=>{serial(id,()=>chrome.storage.session.remove('wn41-'+id)).catch(()=>{});});
