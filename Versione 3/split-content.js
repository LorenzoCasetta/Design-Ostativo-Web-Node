(async()=>{
const key='__webNodeSplitV3';
if(window[key])return;
const reply=await chrome.runtime.sendMessage({kind:'source-tab'});
if(!reply?.id)return;
const host=document.createElement('div');host.id='web-node-split-v3';
host.style.cssText='position:fixed!important;right:0!important;top:0!important;width:50vw!important;height:100vh!important;z-index:2147483647!important;display:block!important;background:#1b1a19!important;';
const shadow=host.attachShadow({mode:'closed'});
const frame=document.createElement('iframe');
frame.src=chrome.runtime.getURL('panel.html')+'?sourceTab='+reply.id+'&embedded=1';
frame.title='Web Node';frame.style.cssText='border:0;width:100%;height:100%;display:block';
shadow.append(frame);
const root=document.documentElement;
const saved={value:root.style.getPropertyValue('width'),priority:root.style.getPropertyPriority('width')};
window[key]={remove(){host.remove();if(saved.value)root.style.setProperty('width',saved.value,saved.priority);else root.style.removeProperty('width');delete window[key];}};
root.style.setProperty('width','50%','important');root.append(host);
})().catch(console.error);
