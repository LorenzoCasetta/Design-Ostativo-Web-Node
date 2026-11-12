# Web Node 4 — versione 4.1.5

un navigatore per orientarsi nei siti web

Di Lorenzo Casetta. La mappa rappresenta i collegamenti rilevati nella pagina corrente; non è una scansione completa del sito.

## Installazione locale
1. Estrarre lo ZIP, se scaricato.
2. Aprire la gestione estensioni del browser Chromium e attivare la modalità sviluppatore.
3. Scegliere «Carica estensione non pacchettizzata» e selezionare la cartella contenente manifest.json.
4. Aprire una pagina web e premere l’icona Web Node.

Se una copia era già installata da un altro percorso, rimuovere la vecchia voce e caricare questa cartella. Non è una distribuzione tramite Chrome Web Store.

## Comandi
- Cerchio: chiude Web Node.
- Triangolo: espande o richiude la mappa completa.
- Quadrato: alterna finestra ridotta e divisione della pagina; la freccia scambia il lato.
- + e −: zoom; il puntatore guida lo spostamento della mappa.
- Un clic su un nodo con destinazione apre la pagina.
- La finestra ridotta si sposta dalla barra superiore e si ridimensiona dall’angolo.

## Privacy e compatibilità
L’estensione usa activeTab, scripting e storage. Elabora localmente i collegamenti e conserva lo stato necessario alla navigazione. Non invia dati a un server di Web Node.

Richiede Chromium 116 o successivo. Le pagine interne del browser non sono supportate. Cambiando origine può essere necessario premere nuovamente l’icona per concedere l’accesso. La divisione è realizzata nella pagina: alcuni siti possono avere layout incompatibili. Il cambio completo di documento può interrompere brevemente la visualizzazione. L’avvio intermittente segnalato in Arc non è stato riprodotto nei test automatici.

La revisione 4.1.5 comprende controlli di sintassi e test con DOM e API simulati; non equivale a un collaudo completo su tutti i browser e siti. Dettagli in REVISIONE.md.

## Ricerca
Casetta, L. (2026). *Design ostativo. I dark pattern e l’asimmetria normativa tra privato e pubblica amministrazione*. Università Iuav di Venezia.

https://doi.org/10.5281/zenodo.21515611

Repository: https://github.com/LorenzoCasetta/design_ostativo
