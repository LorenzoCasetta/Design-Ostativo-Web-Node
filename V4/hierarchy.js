function compactNodeLabel(value){
 const full=String(value||'').replace(/\s+/g,' ').trim();
 let short=full.split(' ').slice(0,5).join(' ');
 if(short.length>41){short=short.slice(0,41).replace(/[\uD800-\uDBFF]$/,'');const end=short.lastIndexOf(' ');if(end>15)short=short.slice(0,end);}
 return short.length<full.length?short.replace(/[.,;:!—–-]+$/,'').trimEnd()+'…':short;
}
function buildPageTree(d){
 const nav=d.links.filter(l=>l.navigation),other=d.links.filter(l=>!l.navigation);
 const ordered=[...nav,...other];
 const tree=WebNodeSitemap.buildTree([d.url,...ordered.map(l=>l.url)],d.host);
 const labels=new Map(ordered.map(l=>[l.url,l.label]));
 function rename(n){if(labels.has(n.url))n.label=labels.get(n.url).replace(/^Esplora\s+/i,'');(n.children||[]).forEach(rename);}
 rename(tree);tree.label=d.host.replace(/^www\./,'');tree.url=d.url;
 // Promote only one-child language wrappers surviving unusual CMS aliases.
 while(tree.children?.length===1 && /^(it|en)$/i.test(tree.children[0].label))tree.children=tree.children[0].children||[];
 function compact(n){n.fullLabel=n.label;n.label=compactNodeLabel(n.label);(n.children||[]).forEach(compact);}
 compact(tree);return tree;
}
