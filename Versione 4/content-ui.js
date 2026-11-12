(()=>{
 if(window.__webNode41?.host.isConnected){window.__webNode41.focus();return;}
 window.__webNode41?.destroy?.();
 window.__webNodeSplitV3?.remove();
 const initial=window.__webNodeRestore;delete window.__webNodeRestore;
 const host=document.createElement('div');host.id='web-node-41';
 const shadow=host.attachShadow({mode:'open'});
 const style=document.createElement('style');style.textContent=WebNodeUI.css;
 const shell=document.createElement('div');shell.id='shell';
 shadow.append(style,shell);document.documentElement.append(host);
 let mode='floating',side='right',prompt=false,closed=false;
 let saved=[],savedScroll=0,splitStyle=null;
 let rect={x:24,y:24,w:Math.min(580,innerWidth-48),h:Math.min(580,innerHeight-48)};
 if(initial?.rect)rect={...initial.rect};
 const abort=new AbortController();let sig='',lastUrl='',timer,drag=null,persistTimer;
 function state(){return {mode,side,rect:{...rect}};}
 async function send(){try{return await chrome.runtime.sendMessage({kind:'wn41-state',state:closed?null:state()});}catch{return null;}}
 function scheduleSave(){clearTimeout(persistTimer);persistTimer=setTimeout(send,120);}
 function showPrompt(value){prompt=value;const el=shadow.getElementById('closeprompt');if(el)el.hidden=!value;}
 function save(el,key,value){
  saved.push({el,key,value:el.style.getPropertyValue(key),priority:el.style.getPropertyPriority(key)});
  el.style.setProperty(key,value,'important');
 }
 function restoreSite(){
  if(!saved.length)return;
  const scroll=document.body.scrollTop;
  for(const x of saved)x.value?x.el.style.setProperty(x.key,x.value,x.priority):x.el.style.removeProperty(x.key);
  saved=[];splitStyle?.remove();splitStyle=null;window.scrollTo(0,scroll);
 }
 function fit(){
  if(mode==='split'){
   host.style.cssText='left:'+(side==='left'?'12px':'calc(50% + 12px)')+';top:12px;width:calc(50% - 24px);height:calc(100% - 24px);';
   shell.style.width='100%';shell.style.height='100%';shell.classList.add('split');
   if(document.body){document.body.style.setProperty('left',side==='left'?'50%':'0','important');}
  }else{
   rect.w=Math.max(240,Math.min(rect.w,innerWidth));rect.h=Math.max(240,Math.min(rect.h,innerHeight));
   rect.x=Math.max(0,Math.min(rect.x,innerWidth-rect.w));rect.y=Math.max(0,Math.min(rect.y,innerHeight-rect.h));
   host.style.cssText='left:'+rect.x+'px;top:'+rect.y+'px;width:'+rect.w+'px;height:'+rect.h+'px;';
   shell.style.width='100%';shell.style.height='100%';shell.classList.remove('split');
  }
  const arrow=shadow.getElementById('switchside');if(arrow){arrow.hidden=mode!=='split';arrow.style.transform=side==='left'?'rotate(180deg)':'';arrow.title='Sposta Web Node a '+(side==='left'?'destra':'sinistra');arrow.setAttribute('aria-label',arrow.title);}
 }
 function setMode(next,nextSide=side){
  showPrompt(false);side=nextSide;
  if(next==='split'&&mode!=='split'){
   const b=shell.getBoundingClientRect();rect={x:b.x,y:b.y,w:b.width,h:b.height};
   savedScroll=scrollY;const body=document.body;
   if(!body)return;
   // A constrained containing block makes fixed children use the site half.
   save(document.documentElement,'overflow','hidden');
   for(const [key,value] of Object.entries({position:'fixed',top:'0',left:side==='left'?'50%':'0',width:'50%',height:'100%',margin:'0','min-width':'0','max-width':'50%',overflow:'auto',transform:'translateZ(0)','box-sizing':'border-box'}))save(body,key,value);
   splitStyle=document.createElement('style');splitStyle.textContent='body > * { max-width:100% !important; box-sizing:border-box; }';
   document.head.append(splitStyle);body.scrollTop=savedScroll;
  }else if(next==='floating'&&mode==='split')restoreSite();
  mode=next;fit();send();
 }
 function close(notify=true){
  if(closed)return;closed=true;restoreSite();abort.abort();clearInterval(timer);clearTimeout(persistTimer);resize.disconnect();host.remove();if(notify)send();delete window.__webNode41;
 }
 function bind(){
  shadow.getElementById('closeyes').onclick=close;
  shadow.getElementById('closeno').onclick=()=>showPrompt(false);
  shadow.getElementById('switchside').onclick=()=>setMode('split',side==='right'?'left':'right');
  const bar=shadow.querySelector('.vbar');
  bar.addEventListener('pointerdown',e=>{
   if(mode!=='floating'||e.target.closest('button'))return;
   const b=shell.getBoundingClientRect();drag={x:e.clientX,y:e.clientY,b};
   bar.setPointerCapture(e.pointerId);
  });
  bar.addEventListener('pointermove',e=>{
   if(!drag)return;
   rect={x:drag.b.x+e.clientX-drag.x,y:drag.b.y+e.clientY-drag.y,w:drag.b.width,h:drag.b.height};fit();
  });
  bar.addEventListener('pointerup',()=>{drag=null;send();});
  bar.addEventListener('pointercancel',()=>drag=null);
 }
 function render(){
  if(closed)return;
  const d=collectPage(),signature=JSON.stringify([d.url,d.links]);
  if(signature===sig)return;
  // Do not reset camera or search merely because a dynamic menu changes.
  if(sig&&lastUrl===d.url&&shadow.getElementById('vq')?.value)return;
  if(lastUrl&&lastUrl!==d.url)showPrompt(false);
  
  shell.innerHTML=WebNodeUI.html;
  shadow.querySelector('.vaddr').textContent=d.host;
  const allowed=new Set([d.url,...d.links.map(x=>x.url)]);
  WebNode.boot({root:shadow,CX:380,CY:280,RAD:10.5,GAP:4,amp:2,STAGGER:38,LOFF:21,tree:buildPageTree(d),onNavigate:async url=>{if(allowed.has(url)&&url!==location.href){showPrompt(false);await send();location.assign(url);}},onClose:close,onOpenSplit:()=>setMode(mode==='split'?'floating':'split')});
  bind();fit();showPrompt(prompt);
  sig=signature;lastUrl=d.url;
 }
 const resize=new ResizeObserver(()=>{
  if(!closed&&mode==='floating'&&!drag){const b=shell.getBoundingClientRect();rect={x:b.x,y:b.y,w:b.width,h:b.height};host.style.width=b.width+'px';host.style.height=b.height+'px';scheduleSave();}
 });resize.observe(shell);
 window.__webNode41={host,getState:state,focus:()=>{showPrompt(false);},setMode,close,destroy:()=>close(false)};
 document.addEventListener('pointerdown',e=>{
  if(closed||mode==='split'||e.composedPath().includes(host))return;
  if(prompt)close();else showPrompt(true);
 },{capture:true,signal:abort.signal});
 window.addEventListener('resize',fit,{signal:abort.signal});
 try{render();fit();if(initial?.mode==='split')setMode('split',initial.side);timer=setInterval(()=>{try{if(!host.isConnected){document.documentElement.append(host);sig='';}render();}catch(e){console.warn('Web Node: aggiornamento rinviato',e);}},1000);}catch(e){close(false);throw e;}
})();
