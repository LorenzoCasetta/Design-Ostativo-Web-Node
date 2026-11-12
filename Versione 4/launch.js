(async()=>{
const notice=setTimeout(()=>{document.getElementById('status').textContent='Il sito sta impiegando più tempo del previsto. Attendi oppure aggiorna la pagina e riapri Web Node.';},8000);
try{
 const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
 if(!tab||!/^https?:/.test(tab.url||''))throw Error('Apri una pagina web.');
 const [{documentId}]=await chrome.scripting.executeScript({target:{tabId:tab.id},files:['collector.js','sitemap.js','hierarchy.js','engine.js','ui-bundle.js','content-ui.js']});
 const [{result}]=await chrome.scripting.executeScript({target:{tabId:tab.id,documentIds:[documentId]},func:()=>window.__webNode41?.host.isConnected?window.__webNode41.getState():null});
 if(!result)throw Error('Impossibile creare Web Node nella pagina.');
 await chrome.storage.session.set({['wn41-'+tab.id]:result});
 window.close();
}catch(e){document.getElementById('status').textContent=e.message;}finally{clearTimeout(notice);}
})();
