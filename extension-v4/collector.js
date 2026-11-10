function collectPage(){
const links=new Map();let scanned=0;
function scan(root){
 for(const a of [...root.querySelectorAll('nav a[href], [role=navigation] a[href]'),...root.querySelectorAll('a[href]')]){
  if(++scanned>10000)break;
  try{const u=new URL(a.getAttribute('href'),a.baseURI);
   if(!/^https?:$/.test(u.protocol)||u.origin!==location.origin)continue;
   if(/\.(pdf|zip|png|jpg|jpeg|svg|mp4|mp3)$/i.test(u.pathname))continue;
   if(u.pathname===location.pathname&&u.search===location.search&&u.hash)continue;
   const heading=a.querySelector('h1,h2,h3,h4,h5,h6,[role=heading]');
   const label=(heading?.textContent||a.getAttribute('aria-label')||a.getAttribute('title')||a.textContent||u.pathname).replace(/\s+/g,' ').trim().slice(0,500);
   if(!links.has(u.href))links.set(u.href,{url:u.href,label,navigation:!!a.closest('nav,[role=navigation]')});
   if(links.size>=1200)break;
  }catch{}
 }
 if(scanned<10000&&links.size<1200)for(const el of root.querySelectorAll('*'))if(el.id!=='web-node-41'&&el.shadowRoot)scan(el.shadowRoot);
}
scan(document);
return {url:location.href,title:document.title,host:location.hostname,links:[...links.values()],limited:links.size>=1200||scanned>=10000};
}
