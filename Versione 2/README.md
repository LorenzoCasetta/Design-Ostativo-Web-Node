# Web Node 2

Prima versione funzionante online: la mappa a nodi di inps.it, pubblicata con GitHub Pages.

[Apri il prototipo](https://lorenzocasetta.github.io/Design-Ostativo-Web-Node/)

## Cosa cambia rispetto alla versione 1

- **Livelli concentrici.** L’albero INPS è disposto su cerchi successivi attorno alla home.
- **Etichette vicine ai nodi.** Ogni nome è scritto per intero accanto al proprio nodo; se lo spazio è occupato, viene cercato in otto direzioni, allontanandosi poco alla volta.
- **Inquadratura sui testi.** La mappa si adatta all’ingombro delle etichette, non solo a quello dei nodi.
- **Motore separato dai dati.** La visualizzazione riceve l’albero come parametro (`WebNode.boot`), invece di contenerlo: è la base da cui nascono le estensioni delle versioni 3 e 4.
- **Un solo file, senza dipendenze.** Stili, dati e motore sono in `index.html`; non servono installazioni né risorse esterne.
- **Senza vista affiancata.** La riproduzione statica della home INPS è stata rimossa: questa versione mostra solo la mappa.

## Uso

Posando il puntatore su un nodo se ne apre il ramo, il doppio clic apre la pagina in una nuova scheda. Il triangolo apre o richiude lo schema completo, il campo in basso cerca fra i nomi.

## Limiti

La pagina contiene gli 85 nodi del prototipo INPS: non esegue una scansione del sito e non ne rappresenta l’alberatura completa, né necessariamente quella aggiornata.

## File

[`index.html`](index.html) è identico a quello nella [radice della repository](../index.html), da cui GitHub Pages serve il prototipo.

Versione precedente: [Web Node 1](../Versione%201/) · Versione successiva: [Web Node 3](../Versione%203/) · [Tutte le versioni](../README.md#versioni)
