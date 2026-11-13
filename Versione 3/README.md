# Web Node 3

Un navigatore per orientarsi nei siti web. Prima versione come estensione per browser Chromium (3.0.0).

Versione archiviata: quella attuale è [Web Node 4](../Versione%204/).

## Cosa cambia rispetto alla versione 2

- **Da pagina web a estensione.** Web Node si apre dall’icona del browser, sul sito che si sta visitando (Manifest V3).
- **La mappa nasce dalla pagina.** L’albero non è più scritto a mano per inps.it: viene costruito dai collegamenti interni della pagina aperta, dando la priorità ai menu e ricavando la gerarchia dai percorsi degli URL.
- **Zoom.** I pulsanti + e − ingrandiscono fino a sei volte, e la mappa si sposta seguendo il puntatore.
- **Navigazione nella scheda.** Il doppio clic su un nodo apre la pagina nella scheda del sito, non in una nuova.
- **Divisione dello schermo.** Il quadrato affianca sito e mappa (vedi il problema noto).

## Installazione

1. Scaricare ed estrarre [Web_Node_3.0.0.zip](https://github.com/LorenzoCasetta/Design-Ostativo-Web-Node/raw/main/Versione%203/Web_Node_3.0.0.zip).
2. Aprire la gestione estensioni del browser e attivare la modalità sviluppatore.
3. Scegliere «Carica estensione non pacchettizzata» e selezionare la cartella che contiene `manifest.json`.
4. Aprire un sito e premere l’icona Web Node.

## Comandi

- Triangolo: espande o richiude la mappa completa.
- Quadrato: divide lo schermo fra sito e mappa (vedi il problema noto).
- Cerchio: chiude Web Node.
- + e −: zoom.
- Doppio clic su un nodo: apre la pagina.

## Problema noto

Su Arc la divisione dello schermo attivata dal quadrato non funziona: il browser restituisce l’errore «Could not establish connection. Receiving end does not exist». La correzione è nella [versione 4](../Versione%204/).

## Limiti

- La mappa rappresenta i link interni raccolti dalla pagina corrente, non tutto il sito.
- I link dei menu hanno la priorità, i prefissi linguistici vengono rimossi e la gerarchia segue i percorsi degli URL.
- Vengono raccolti al massimo 1200 link e disegnati 260 nodi; le varianti con query possono essere accorpate.
- Iframe e shadow root chiusi non sono analizzati.

## Privacy

Nessun dato viene inviato a server esterni. I permessi `activeTab` e `scripting` servono a leggere la scheda autorizzata, `storage` a conservare lo stato di sessione della divisione.

## Verifiche

Controlli automatici superati: sintassi JavaScript, manifest, deduplicazione dei link, query e frammenti, shadow DOM aperto, filtri su origine e protocollo, costruzione dell’albero.

## Ricerca

Casetta, L. (2026). *Design ostativo. I dark pattern e l’asimmetria normativa tra privato e pubblica amministrazione*. Università Iuav di Venezia. [https://doi.org/10.5281/zenodo.21515611](https://doi.org/10.5281/zenodo.21515611)

Versione precedente: [Web Node 2](../Versione%202/) · Versione successiva: [Web Node 4](../Versione%204/)

Codice e altre versioni: [github.com/LorenzoCasetta/Design-Ostativo-Web-Node](https://github.com/LorenzoCasetta/Design-Ostativo-Web-Node)
