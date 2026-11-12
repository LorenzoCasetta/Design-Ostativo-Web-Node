# Web Node 4

Un navigatore per orientarsi nei siti web. Estensione per browser Chromium, versione 4.1.5.

Web Node disegna come mappa a nodi i collegamenti rilevati nella pagina corrente. Non è una scansione completa del sito.

## Cosa cambia rispetto alla versione 3

- **La mappa vive nella pagina.** Non è più chiusa nel popup dell’estensione: è una finestra sopra il sito, che si sposta dalla barra superiore e si ridimensiona dall’angolo.
- **Divisione della pagina rifatta.** Sito e mappa si affiancano dentro la pagina stessa, e una freccia scambia il lato. Sostituisce la divisione che nella versione 3 non funzionava su Arc.
- **Un clic per aprire.** Per raggiungere una pagina basta un clic sul nodo, non più due.
- **Titoli più corti.** I nomi dei nodi sono limitati a cinque parole; quello completo compare posando il puntatore.
- **Rami che crescono dal nodo.** Aprendo un ramo, i figli si dispongono attorno al nodo di partenza e non più attorno al centro della mappa.
- **Continuità fra le pagine.** Posizione, dimensione e modalità della finestra restano le stesse navigando nel sito, e la mappa si aggiorna quando cambiano i collegamenti.
- **Chiusura con conferma.** Un clic fuori dalla finestra chiede conferma prima di chiudere Web Node.

## Installazione

1. Scaricare ed estrarre [Web_Node_4.1.5.zip](https://github.com/LorenzoCasetta/design_ostativo/raw/main/Versione%204/Web_Node_4.1.5.zip).
2. Aprire la gestione estensioni del browser e attivare la modalità sviluppatore.
3. Scegliere «Carica estensione non pacchettizzata» e selezionare la cartella che contiene `manifest.json`.
4. Aprire una pagina web e premere l’icona Web Node.

Se è già installata una copia precedente, rimuoverla prima di caricare questa. L’estensione non è distribuita tramite Chrome Web Store.

## Comandi

- Cerchio: chiude Web Node.
- Triangolo: espande o richiude la mappa completa.
- Quadrato: alterna finestra ridotta e divisione della pagina; la freccia scambia il lato.
- + e −: zoom; il puntatore guida lo spostamento della mappa.
- Un clic su un nodo con destinazione apre la pagina.
- La finestra ridotta si sposta dalla barra superiore e si ridimensiona dall’angolo.

## Privacy

L’estensione usa i permessi `activeTab`, `scripting` e `storage`. I collegamenti sono elaborati nel browser, che conserva solo lo stato necessario alla navigazione. Nessun dato viene inviato a server esterni. Dettagli nell’[informativa sulla privacy](https://lorenzocasetta.github.io/design_ostativo/privacy.html).

## Compatibilità e limiti noti

- Richiede Chromium 116 o successivo.
- Le pagine interne del browser non sono supportate.
- Cambiando origine può essere necessario premere di nuovo l’icona per concedere l’accesso.
- La divisione è realizzata dentro la pagina: alcuni siti possono avere layout incompatibili.
- Il cambio completo di documento può interrompere brevemente la visualizzazione.
- Su Arc è stato segnalato un avvio intermittente, non riprodotto nei test automatici.
- La mappa mostra al massimo 260 nodi.

Correzioni e verifiche della versione 4.1.5 sono nel [changelog](CHANGELOG.md).

## Ricerca

Casetta, L. (2026). *Design ostativo. I dark pattern e l’asimmetria normativa tra privato e pubblica amministrazione*. Università Iuav di Venezia. [https://doi.org/10.5281/zenodo.21515611](https://doi.org/10.5281/zenodo.21515611)

Versione precedente: [Web Node 3](../Versione%203/)

Codice e altre versioni: [github.com/LorenzoCasetta/design_ostativo](https://github.com/LorenzoCasetta/design_ostativo)
