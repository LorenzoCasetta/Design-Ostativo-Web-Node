/* Web Node — costruzione dell'albero dal sitemap del sito.
   Scopre il sitemap, lo legge e da una lista piatta di URL ricava una
   gerarchia con etichette leggibili, nella forma { label, url, children }
   che il motore (engine.js) sa disegnare.

   Nessuna dipendenza dal DOM: il parsing e' fatto sui tag <loc>/<sitemap> con
   espressioni regolari (i sitemap sono XML semplice), cosi' lo stesso file gira
   sia nel browser (estensione) sia sotto Node per i test. */
(function (root) {
  "use strict";

  var LIMITS = {
    maxChildSitemaps: 8,   // quanti sitemap figli seguire da un indice
    maxUrls: 1200,         // tetto di URL grezzi processati
    maxNodesTotal: 260,    // tetto di nodi nell'albero disegnato (leggibilita')
    maxChildrenPerNode: 14,// figli max per nodo (i primi N per pagina)
    maxDepth: 4            // profondita' massima dei rami
  };

  function locs(xml, tag) {
    var out = [], re = new RegExp("<" + tag + "\\b[^>]*>([\\s\\S]*?)<\\/" + tag + ">", "gi"), m;
    while ((m = re.exec(xml))) {
      var v = m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      if (v) out.push(v);
    }
    return out;
  }

  function isIndex(xml) { return /<sitemapindex[\s>]/i.test(xml); }

  // Estrae gli <loc> da <sitemap> (indice) vs <url> (urlset): in entrambi i casi
  // sono dentro <loc>, quindi basta raccogliere tutti i <loc>.
  function extractLocs(xml) { return locs(xml, "loc"); }

  function humanize(seg) {
    if (!seg) return "";
    try { seg = decodeURIComponent(seg); } catch (e) {}
    seg = seg.replace(/\.(html?|php|aspx?|jsp)$/i, "");
    seg = seg.replace(/[-_+]+/g, " ").replace(/\s+/g, " ").trim();
    if (!seg) return "";
    return seg.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  // Chiave di un segmento: senza estensione di pagina e minuscola, cosi'
  // "previdenza.html" (la pagina) e "previdenza" (la cartella) diventano lo
  // STESSO nodo. Evita i doppioni e da' alla cartella il link della sua pagina.
  function segKey(seg) {
    return seg.replace(/\.(html?|php|aspx?|jsp)$/i, "");
  }

  // Da lista di URL -> albero per segmenti di path.
  function buildTree(urls, rootHost, limits) {
    limits = limits || LIMITS;
    var rootLabel = (rootHost || "sito").replace(/^www\./, "");
    var rootUrl = null;

    // 1) prepara ogni URL come coppia (chiavi, segmenti-originali)
    var items = [];
    urls.forEach(function (u) {
      try {
        var p = new URL(u);
        if (!rootUrl) rootUrl = p.origin + "/";
        var raw = p.pathname.split("/").filter(Boolean);
        // Language prefixes are routing metadata rather than content sections.
        while(raw.length && /^(it|en|fr|de|es|pt|nl)(-[a-z]{2})?(\.html?)?$/i.test(raw[0]))raw.shift();
        items.push({ url: u, keys: raw.map(segKey), segs: raw });
      } catch (e) {}
    });
    if (!items.length) return { label: rootLabel, url: rootUrl || "#" };

    // 2) togli il prefisso di percorso comune a TUTTI gli URL: non porta
    //    informazione (es. /it/it/ su inps.it) e appiattirebbe l'albero in
    //    una catena inutile. Lo strippo solo se ci sono almeno 2 URL.
    var prefix = items[0].keys.slice();
    items.forEach(function (it) {
      var n = 0;
      while (n < prefix.length && n < it.keys.length && prefix[n] === it.keys[n]) n++;
      prefix.length = n;
    });
    // non azzerare del tutto un URL che coincide col prefisso (e' la home)
    if (prefix.length && items.length > 1) {
      items.forEach(function (it) {
        it.keys = it.keys.slice(prefix.length);
        it.segs = it.segs.slice(prefix.length);
      });
    }

    var root = { label: rootLabel, url: null, _kids: Object.create(null), _order: [] };
    function ensure(parent, key, label) {
      if (!parent._kids[key]) {
        parent._kids[key] = { label: label || key, url: null, _kids: Object.create(null), _order: [] };
        parent._order.push(key);
      }
      return parent._kids[key];
    }

    items.forEach(function (it) {
      if (!it.keys.length) { root.url = root.url || it.url; return; } // home
      var keys = it.keys.slice(0, limits.maxDepth);
      var segs = it.segs.slice(0, limits.maxDepth);
      var node = root;
      for (var i = 0; i < keys.length; i++) {
        node = ensure(node, keys[i], humanize(segs[i]));
        if (i === keys.length - 1) node.url = node.url || it.url;
      }
    });
    if (rootUrl) root.url = root.url || rootUrl;

    // materializza _kids/_order in children[], applicando i tetti
    var total = { n: 1 };
    function finalize(node) {
      var kids = node._order.slice(0, limits.maxChildrenPerNode).map(function (k) { return node._kids[k]; });
      var out = { label: node.label, url: node.url || "#" };
      var children = [];
      for (var i = 0; i < kids.length; i++) {
        if (total.n >= limits.maxNodesTotal) break;
        total.n++;
        children.push(finalize(kids[i]));
      }
      if (children.length) out.children = children;
      return out;
    }
    return finalize(root);
  }

  function candidateUrls(origin) {
    origin = origin.replace(/\/+$/, "");
    return [origin + "/sitemap.xml", origin + "/sitemap_index.xml",
            origin + "/sitemap-index.xml", origin + "/sitemap/sitemap.xml"];
  }

  // fetchText: funzione (url)->Promise<string|null>. Iniettata cosi' e' testabile.
  function discoverFromRobots(origin, fetchText) {
    return fetchText(origin.replace(/\/+$/, "") + "/robots.txt").then(function (txt) {
      if (!txt) return [];
      var out = [], re = /^\s*sitemap:\s*(\S+)/gim, m;
      while ((m = re.exec(txt))) out.push(m[1].trim());
      return out;
    }).catch(function () { return []; });
  }

  function buildTreeFromSite(origin, fetchText, limits) {
    limits = limits || LIMITS;
    var seen = {}, allUrls = [], stats = { sitemaps: 0, urls: 0, source: null };

    function grab(url, depth) {
      if (!url || seen[url] || allUrls.length >= limits.maxUrls) return Promise.resolve();
      seen[url] = true;
      return fetchText(url).then(function (xml) {
        if (!xml) return;
        stats.sitemaps++;
        if (isIndex(xml) && depth < 2) {
          var children = extractLocs(xml).slice(0, limits.maxChildSitemaps);
          return children.reduce(function (chain, c) {
            return chain.then(function () { return grab(c, depth + 1); });
          }, Promise.resolve());
        }
        extractLocs(xml).forEach(function (u) {
          if (allUrls.length < limits.maxUrls && u.indexOf("http") === 0) allUrls.push(u);
        });
      }).catch(function () {});
    }

    return discoverFromRobots(origin, fetchText).then(function (fromRobots) {
      var list = (fromRobots.length ? fromRobots : candidateUrls(origin));
      stats.source = fromRobots.length ? "robots.txt" : "sitemap.xml";
      return list.reduce(function (chain, u) {
        return chain.then(function () { return grab(u, 0); });
      }, Promise.resolve());
    }).then(function () {
      stats.urls = allUrls.length;
      if (!allUrls.length) return { tree: null, stats: stats };
      var host; try { host = new URL(origin).hostname; } catch (e) { host = origin; }
      return { tree: buildTree(allUrls, host, limits), stats: stats };
    });
  }

  var api = { buildTreeFromSite: buildTreeFromSite, buildTree: buildTree,
              humanize: humanize, extractLocs: extractLocs, isIndex: isIndex, LIMITS: LIMITS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.WebNodeSitemap = api;
})(typeof window !== "undefined" ? window : this);
