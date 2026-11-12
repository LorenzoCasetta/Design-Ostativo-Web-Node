const d=parent.mapSnapshot();
if(d){
 document.querySelector('.vaddr').textContent=d.host;
 WebNode.boot({CX:380,CY:280,RAD:10.5,GAP:4,amp:2,STAGGER:38,LOFF:21,tree:structuredClone(d.tree),onNavigate:url=>parent.navigateNode(url),onOpenSplit:()=>parent.splitWebNode(),onClose:()=>parent.closeWebNode()});
}
