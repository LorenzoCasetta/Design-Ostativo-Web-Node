# Web Node 3.0
Un navigatore per orientarsi nei siti web.

Estensione Chromium di Lorenzo Casetta, sviluppata per la tesi Design ostativo (Università Iuav di Venezia, 2026).
Versione approvata dall’autore: interazioni, zoom con camera al puntatore, forme originali e organizzazione dei collegamenti.

## Installazione locale
Scaricare ed estrarre il pacchetto, aprire la gestione estensioni del browser, attivare Modalità sviluppatore e selezionare Carica estensione non pacchettizzata sulla cartella che contiene manifest.json.
Aprire un sito e premere l’icona Web Node. Triangolo: esploso; cerchio: chiusura; +/−: zoom. Doppio click su un nodo: navigazione.

## Problema noto
Lo split attivato dal quadrato NON funziona nel collaudo su Arc: errore «Could not establish connection. Receiving end does not exist». La versione 3.0 conserva questo comportamento noto. La correzione è oggetto della V4.

## Limiti e privacy
La mappa rappresenta i link interni raccolti dalla pagina corrente, non tutto il sito. Priorità ai menu, prefissi linguistici rimossi, gerarchia per percorsi URL. Massimo 1200 link raccolti e 260 nodi disegnati; varianti query possono essere accorpate. Iframe e shadow root chiusi non sono analizzati.
Nessun invio a server esterni. Permessi activeTab e scripting per leggere la scheda autorizzata; storage per lo stato di sessione dello split.
Prototipo INPS V2: https://lorenzocasetta.github.io/design_ostativo/
Tesi: https://doi.org/10.5281/zenodo.21515611
