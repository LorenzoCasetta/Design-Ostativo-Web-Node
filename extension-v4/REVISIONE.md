# Revisione Web Node 4.1.5 — 10 novembre 2026

Revisione statica dei file JavaScript attivi, del manifest e dell'interfaccia incorporata. Nessuna modifica alla grafica, ai permessi o ai comandi approvati.

## Difetti corretti e verifiche
- URL con query diverse venivano fusi: /watch?v=1 e /watch?v=2 producevano una sola destinazione. Ora conservano nodi distinti; controllati anche URL con query nella radice.
- La firma dei dati veniva memorizzata prima della costruzione della mappa. Dopo un errore, gli stessi dati non venivano ritentati. Ora la firma viene confermata solo a costruzione completata; riprodotto errore e recupero.
- Un pannello rimosso dal sito e poi riagganciato conservava un motore di animazione già arrestato. Ora viene ricostruito; una nuova istanza ripulisce quella scollegata.
- Un errore sincrono dei messaggi dopo il ricaricamento dell'estensione poteva interrompere la pulizia di chiusura. La chiamata ora gestisce errori sincroni e asincroni; verificata rimozione dell'istanza e dell'osservatore.
- Un fallimento durante l'apertura dello split poteva lasciare gli stili del sito modificati. Ora la pulizia ripristina gli stili anche in caso di avvio fallito; verificato il ripristino della larghezza e dello scorrimento CSS.
- Le operazioni successive del ripristino potevano essere eseguite su un documento diverso dopo una navigazione rapida. Ora sono vincolate al documento verificato, sia nel ripristino sia nella verifica di apertura. Il test simula un cambio di documento fra due operazioni e conferma che l'iniezione non raggiunge quello nuovo.
- Gestito anche il rifiuto della pulizia della sessione quando viene chiusa una scheda.
- Il taglio delle etichette poteva spezzare un carattere Unicode composto da due unità UTF-16. Testato e corretto il caso di un'emoji sul limite del taglio.

## Controlli eseguiti
- test.cjs: destinazioni query, recupero dopo errore di rendering, pannello scollegato, messaggi con contesto invalidato, rollback iniziale, Unicode e limite delle etichette, limite di 260 nodi, 14 figli e profondità 4 su 1200 URL.
- test-background.cjs: errori temporanei, ripristino dello stato, assenza di reiniezione su pagina già montata, ricaricamento, cambio di documento, chiusura esplicita e pulizia scheda.
- Sintassi di tutti i JavaScript, riferimenti del manifest e unicità degli identificatori dei controlli.

Tutti questi controlli sono superati. I test di ciclo di vita usano API browser e DOM simulati: non sono un collaudo dell'estensione installata in Arc.

## Limiti che non dichiariamo risolti
Avvio intermittente in Arc non riprodotto; perdita del permesso activeTab su cambio origine; split interno al documento con possibili incompatibilità dei layout dei siti; interruzione visiva durante il cambio documento; limite intenzionale alla quantità di nodi mostrati. Nessun cambiamento speculativo a questi comportamenti.

Riferimento API per l'identificazione dei documenti: https://developer.chrome.com/docs/extensions/reference/api/scripting#type-InjectionTarget
