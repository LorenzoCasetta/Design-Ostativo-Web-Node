# Changelog di Web Node 4

## 4.1.5 (10 novembre 2026)

Revisione del codice dell’estensione. Grafica, permessi e comandi sono invariati.

### Corretto

- **URL con query diverse.** `/watch?v=1` e `/watch?v=2` venivano fusi in una sola destinazione. Ora restano nodi distinti, anche quando la query è nella radice del sito.
- **Mappa non ricostruita dopo un errore.** La firma dei dati veniva memorizzata prima della costruzione della mappa, quindi gli stessi dati non venivano ritentati. Ora viene confermata solo a costruzione completata.
- **Pannello rimosso e riagganciato dal sito.** Conservava un motore di animazione già arrestato. Ora il motore viene ricostruito e una nuova istanza ripulisce quella scollegata.
- **Chiusura dopo il ricaricamento dell’estensione.** Un errore sincrono dei messaggi poteva interrompere la pulizia. Ora sono gestiti sia gli errori sincroni sia quelli asincroni.
- **Avvio della divisione fallito.** Poteva lasciare modificati gli stili del sito. Ora larghezza e scorrimento vengono ripristinati anche in caso di errore.
- **Navigazione rapida.** Le operazioni di ripristino potevano essere eseguite su un documento diverso da quello di partenza. Ora sono vincolate al documento verificato, tramite [`documentIds`](https://developer.chrome.com/docs/extensions/reference/api/scripting#type-InjectionTarget).
- **Chiusura di una scheda.** È gestito il rifiuto della pulizia della sessione.
- **Taglio delle etichette.** Poteva spezzare un carattere Unicode composto da due unità UTF-16, per esempio un’emoji sul limite del taglio.

### Verifiche

- Costruzione della mappa: destinazioni con query, recupero dopo un errore di rendering, pannello scollegato, messaggi con contesto invalidato, ripristino degli stili, Unicode e lunghezza delle etichette, limiti di 260 nodi, 14 figli e profondità 4 su 1200 URL.
- Service worker: errori temporanei, ripristino dello stato, nessuna reiniezione su una pagina già montata, ricaricamento, cambio di documento, chiusura esplicita e pulizia della scheda.
- Sintassi di tutti i file JavaScript, riferimenti del manifest, unicità degli identificatori dei controlli.

I test del ciclo di vita usano API del browser e DOM simulati: non sostituiscono il collaudo dell’estensione installata.

### Limiti noti

- Avvio intermittente su Arc, non riprodotto.
- Perdita del permesso `activeTab` al cambio di origine.
- Divisione interna al documento, con possibili incompatibilità con il layout dei siti.
- Interruzione visiva durante il cambio di documento.
- Numero di nodi mostrati limitato per scelta.
