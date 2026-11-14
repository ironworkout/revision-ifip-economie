/* ============================================================
   Éco IFiP — logique de l'application
   - banque de questions : data/*.js (window.BANQUE)
   - sauvegarde : localStorage
   - répétition espacée : intervalles adaptatifs par niveau
   ============================================================ */

(function () {
  "use strict";

  var BANQUE = window.BANQUE || [];
  var CLE = "ifip-eco-revision-v1";
  var CONCOURS_DEFAUT = "2026-12-07";
  var CLE_DRIVE = "ifip-eco-drive-v1";
  var GOOGLE_CLIENT_ID = "731283926358-viam3ulpgna14flfdeb9m92l8s620hoi.apps.googleusercontent.com";
  var DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";
  var DRIVE_FICHIER = "ifip-eco-revision.json";

  var NIVEAU = {
    encours: { label: "En cours", aide: "Je ne maîtrise pas encore", classe: "vert", poids: 0 },
    presque: { label: "Presque", aide: "L'essentiel est là, il manque des précisions", classe: "orange", poids: 0.5 },
    parfait: { label: "Parfait", aide: "Je peux la restituer au concours", classe: "bleu", poids: 1 }
  };

  var PARTIES = {
    1: "Les grands courants",
    2: "Microéconomie",
    3: "Macroéconomie",
    4: "Monnaie et finance",
    5: "Économie internationale"
  };

  var INTERVALLES_PARFAIT = [7, 14, 30, 60, 120];
  var MODES = { aleatoire: "Aléatoire", intelligente: "Intelligente", ciblee: "Révision ciblée" };
  var OBJECTIF_JOUR = 5;

  var longueur = 5;
  var revele = false;
  var filtrePartie = 0;
  var filtreStatut = "toutes";
  var recherche = "";
  var editId = null;
  var modaleId = null;

  /* ---------------- dates ---------------- */

  function jourISO(d) {
    var an = d.getFullYear();
    var mois = String(d.getMonth() + 1).padStart(2, "0");
    var jour = String(d.getDate()).padStart(2, "0");
    return an + "-" + mois + "-" + jour;
  }

  function aujourdhui() { return jourISO(new Date()); }

  function dansNJours(n) {
    var d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + n);
    return jourISO(d);
  }

  function ecartJours(depuis, jusqu) {
    var a = new Date(depuis + "T12:00:00");
    var b = new Date(jusqu + "T12:00:00");
    return Math.round((b - a) / 86400000);
  }

  /* ---------------- état ---------------- */

  function etatVide() {
    return {
      version: 1, questions: {}, seance: null, derniereSeance: null,
      evaluations: 0, jours: [], parJour: {}, preferences: { trous: false },
      reponses: {}, objectifCelebre: {}, concours: CONCOURS_DEFAUT, derniereSauvegarde: null
    };
  }

  function charger() {
    try {
      var brut = localStorage.getItem(CLE);
      if (!brut) return etatVide();
      var objet = JSON.parse(brut);
      if (!objet || typeof objet !== "object") return etatVide();
      var base = etatVide();
      for (var k in base) if (!(k in objet)) objet[k] = base[k];
      if (!objet.parJour) objet.parJour = {};
      if (!objet.preferences) objet.preferences = { trous: false };
      if (!objet.reponses || typeof objet.reponses !== "object" || Array.isArray(objet.reponses)) objet.reponses = {};
      if (!objet.objectifCelebre || typeof objet.objectifCelebre !== "object") objet.objectifCelebre = {};
      if (!/^\d{4}-\d{2}-\d{2}$/.test(objet.concours || "")) objet.concours = CONCOURS_DEFAUT;
      return objet;
    } catch (e) {
      return etatVide();
    }
  }

  var etat = charger();

  function sauverLocal() {
    try {
      localStorage.setItem(CLE, JSON.stringify(etat));
      return true;
    } catch (e) {
      toast("Sauvegarde impossible : le stockage du navigateur est plein.");
      return false;
    }
  }

  /* Chaque changement est écrit localement, puis programmé vers Drive si connecté. */
  function sauver() {
    var ok = sauverLocal();
    if (ok) programmerDrive();
    return ok;
  }

  /* Remplace la progression en place : tous les modules partagent « etat ». */
  function remplacerEtat(nouveau) {
    var base = etatVide();
    for (var k in base) etat[k] = (nouveau && k in nouveau) ? nouveau[k] : base[k];
    if (!etat.questions) etat.questions = {};
    if (!etat.parJour) etat.parJour = {};
    if (!etat.preferences) etat.preferences = { trous: false };
    if (!etat.jours) etat.jours = [];
    if (!etat.reponses || typeof etat.reponses !== "object" || Array.isArray(etat.reponses)) etat.reponses = {};
    if (!etat.objectifCelebre || typeof etat.objectifCelebre !== "object") etat.objectifCelebre = {};
    if (!/^\d{4}-\d{2}-\d{2}$/.test(etat.concours || "")) etat.concours = CONCOURS_DEFAUT;
  }

  function noterSauvegarde() {
    etat.derniereSauvegarde = aujourdhui();
    sauver();
    rendreAccueil();
  }

  function telechargerFichier(blob, nom) {
    var url = URL.createObjectURL(blob);
    var lien = document.createElement("a");
    lien.href = url;
    lien.download = nom;
    document.body.appendChild(lien);
    lien.click();
    lien.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    noterSauvegarde();
    toast("Sauvegarde téléchargée : " + nom);
  }

  /* Sauvegarde : un fichier JSON.
     Sur iPad, la feuille de partage permet de le déposer dans Drive, Fichiers ou
     iCloud ; sur ordinateur, ou si le partage est refusé, on télécharge le fichier. */
  function paquetSauvegarde() {
    return {
      application: "eco-ifip",
      version: 1,
      exporteLe: new Date().toISOString(),
      progression: etat
    };
  }

  function exporter() {
    var paquet = paquetSauvegarde();
    var nom = "ifip-eco-sauvegarde-" + aujourdhui() + ".json";
    var blob = new Blob([JSON.stringify(paquet, null, 2)], { type: "application/json" });

    var fichier = null;
    try { fichier = new File([blob], nom, { type: "application/json" }); } catch (e) { fichier = null; }

    if (fichier && navigator.share && navigator.canShare && navigator.canShare({ files: [fichier] })) {
      navigator.share({
        files: [fichier],
        title: "Sauvegarde révision IFiP",
        text: "Progression de révision, à conserver dans Drive ou Fichiers."
      }).then(function () {
        noterSauvegarde();
        toast("Sauvegarde envoyée : choisis Drive dans la feuille de partage.");
      }, function (err) {
        if (err && err.name === "AbortError") { toast("Sauvegarde annulée."); return; }
        telechargerFichier(blob, nom);
      });
      return;
    }

    telechargerFichier(blob, nom);
  }

  function traiterSauvegarde(fichier) {
    if (!fichier) return;
    var lecteur = new FileReader();
    lecteur.onload = function () {
      var paquet;
      try { paquet = JSON.parse(String(lecteur.result)); } catch (e) { paquet = null; }
      var prog = paquet && paquet.progression ? paquet.progression : paquet;
      if (!prog || typeof prog !== "object" || !prog.questions || typeof prog.questions !== "object") {
        toast("Ce fichier n'est pas une sauvegarde de l'application.");
        return;
      }
      var nb = Object.keys(prog.questions).length;
      if (!window.confirm("Remplacer la progression actuelle par cette sauvegarde (" + nb +
        " question" + (nb > 1 ? "s" : "") + ") ?")) return;
      remplacerEtat(prog);
      sauver();
      afficher("accueil");
      toast("Sauvegarde restaurée : " + nb + " question" + (nb > 1 ? "s" : "") + ".");
    };
    lecteur.readAsText(fichier);
  }

  function importer() {
    var input = document.getElementById("fichier-sauvegarde");
    if (!input) return;
    input.value = "";
    input.click();
  }

  /* ---------------- Google Drive ----------------
     Même principe que le Championnat des Peluches : Google Identity Services
     fournit un jeton, puis l'API Drive lit et écrit un unique fichier JSON.
     L'identifiant client est public et couvre déjà l'origine ironworkout.github.io. */

  var jetonDrive = null;
  var clientDrive = null;
  var driveEtat = "hors-ligne";
  var dernierDrive = null;
  var synchroEnCours = false;
  var minuterieDrive = null;
  var tentativesGis = 0;

  try {
    var memoInitial = JSON.parse(localStorage.getItem(CLE_DRIVE) || "{}") || {};
    dernierDrive = memoInitial.derniereSynchro || null;
  } catch (e) { dernierDrive = null; }

  function memoDrive() {
    try { return JSON.parse(localStorage.getItem(CLE_DRIVE) || "{}") || {}; } catch (e) { return {}; }
  }

  function ecrireMemoDrive(m) {
    try { localStorage.setItem(CLE_DRIVE, JSON.stringify(m)); } catch (e) {}
  }

  function dateHeure(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " à " +
      d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }

  function libelleDrive() {
    if (driveEtat === "synchro") return "Synchronisation…";
    if (driveEtat === "connecte") return dernierDrive ? "Synchronisé le " + dateHeure(dernierDrive) : "Connecté";
    if (driveEtat === "erreur") return "Connexion à refaire";
    if (driveEtat === "indisponible") return "Service Google indisponible";
    return "Non connecté";
  }

  function blocDrive() {
    var boutons = jetonDrive
      ? '<button class="btn btn--fantome" data-action="drive-sauver">Sauvegarder dans Drive</button>' +
        '<button class="btn btn--fantome" data-action="drive-charger">Charger depuis Drive</button>'
      : '<button class="btn btn--fantome" data-action="drive-connecter">Connecter Google Drive</button>';

    return '<div class="drive">' +
      '<div class="drive__tete">' +
        '<span class="drive__nom">Google Drive</span>' +
        '<span class="drive__etat drive__etat--' + driveEtat + '">' + libelleDrive() + "</span>" +
      "</div>" +
      '<p class="bloc__aide">La progression est enregistrée dans un fichier <code>' + DRIVE_FICHIER +
        "</code> de ton Drive, et rechargée automatiquement sur tes autres appareils.</p>" +
      '<div class="sauvegarde__actions">' + boutons + "</div>" +
    "</div>";
  }

  function initDrive() {
    if (typeof google === "undefined" || !google.accounts || !google.accounts.oauth2) {
      if (tentativesGis++ < 50) { setTimeout(initDrive, 120); }
      else { driveEtat = "indisponible"; rendreAccueil(); }
      return;
    }
    if (clientDrive) return;

    try {
      clientDrive = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: DRIVE_SCOPE,
        callback: function (reponse) {
          if (reponse && reponse.access_token) {
            jetonDrive = reponse.access_token;
            var m = memoDrive();
            m.connecte = true;
            ecrireMemoDrive(m);
            driveEtat = "connecte";
            rendreAccueil();
            apresConnexionDrive();
          } else {
            driveEtat = "hors-ligne";
            rendreAccueil();
          }
        },
        error_callback: function () {
          driveEtat = "hors-ligne";
          rendreAccueil();
        }
      });

      if (driveEtat !== "connecte") { driveEtat = "pret"; rendreAccueil(); }

      var memo = memoDrive();
      if (!jetonDrive && memo.connecte) clientDrive.requestAccessToken({ prompt: "" });
    } catch (e) {
      driveEtat = "indisponible";
      rendreAccueil();
    }
  }

  function connecterDrive() {
    if (!clientDrive) {
      initDrive();
      toast("Connexion Google en préparation, réessaie dans un instant.");
      return;
    }
    clientDrive.requestAccessToken({ prompt: "" });
  }

  function apiDrive(url, options) {
    var opt = options || {};
    opt.headers = Object.assign({}, opt.headers || {}, { Authorization: "Bearer " + jetonDrive });
    return fetch(url, opt).then(function (r) {
      if (r.status === 401 || r.status === 403) {
        jetonDrive = null;
        driveEtat = "erreur";
        var m = memoDrive();
        m.connecte = false;
        ecrireMemoDrive(m);
        rendreAccueil();
        throw new Error("Session Google expirée, reconnecte le Drive.");
      }
      return r;
    });
  }

  async function chercherFichierDrive() {
    var requete = encodeURIComponent("name='" + DRIVE_FICHIER + "' and trashed=false");
    var r = await apiDrive("https://www.googleapis.com/drive/v3/files?q=" + requete +
      "&spaces=drive&fields=files(id,name,modifiedTime)&pageSize=10");
    if (!r.ok) throw new Error("Recherche dans Drive impossible.");
    var d = await r.json();
    return d.files && d.files.length ? d.files[0] : null;
  }

  async function ecrireFichierDrive(id, contenu) {
    var r = await apiDrive("https://www.googleapis.com/upload/drive/v3/files/" + id + "?uploadType=media", {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: contenu
    });
    if (!r.ok) throw new Error("Écriture dans Drive impossible (" + r.status + ").");
  }

  async function creerFichierDrive(contenu) {
    var frontiere = "ifip" + Date.now();
    var corps = "--" + frontiere + "\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify({ name: DRIVE_FICHIER, mimeType: "application/json" }) +
      "\r\n--" + frontiere + "\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" +
      contenu + "\r\n--" + frontiere + "--\r\n";

    var r = await apiDrive("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", {
      method: "POST",
      headers: { "Content-Type": "multipart/related; boundary=" + frontiere },
      body: corps
    });
    if (!r.ok) throw new Error("Création du fichier Drive impossible (" + r.status + ").");
    var d = await r.json();
    return d.id;
  }

  async function lireFichierDrive(id) {
    var r = await apiDrive("https://www.googleapis.com/drive/v3/files/" + id + "?alt=media");
    if (!r.ok) throw new Error("Lecture du fichier Drive impossible.");
    return r.text();
  }

  async function sauvegarderDansDrive(silencieux) {
    if (!jetonDrive) {
      if (!silencieux) { toast("Connecte Google Drive pour enregistrer en ligne."); connecterDrive(); }
      return false;
    }
    if (synchroEnCours) return false;

    synchroEnCours = true;
    driveEtat = "synchro";
    rendreAccueil();

    try {
      var memo = memoDrive();
      var contenu = JSON.stringify(paquetSauvegarde(), null, 2);

      if (!memo.fileId) {
        var fichier = await chercherFichierDrive();
        memo.fileId = fichier ? fichier.id : await creerFichierDrive(contenu);
        if (fichier) await ecrireFichierDrive(memo.fileId, contenu);
      } else {
        await ecrireFichierDrive(memo.fileId, contenu);
      }

      memo.derniereSynchro = new Date().toISOString();
      memo.connecte = true;
      ecrireMemoDrive(memo);
      dernierDrive = memo.derniereSynchro;
      driveEtat = "connecte";
      if (!silencieux) toast("Progression enregistrée dans Drive.");
      return true;
    } catch (e) {
      driveEtat = "erreur";
      if (!silencieux) toast(String(e.message || e));
      return false;
    } finally {
      synchroEnCours = false;
      rendreAccueil();
    }
  }

  function programmerDrive() {
    if (!jetonDrive || synchroEnCours) return;
    clearTimeout(minuterieDrive);
    minuterieDrive = setTimeout(function () { sauvegarderDansDrive(true); }, 4000);
  }

  async function apresConnexionDrive() {
    try {
      var memo = memoDrive();
      var id = memo.fileId;
      if (!id) {
        var trouve = await chercherFichierDrive();
        id = trouve && trouve.id;
      }
      if (!id) { await sauvegarderDansDrive(false); return; }

      memo.fileId = id;
      ecrireMemoDrive(memo);

      var texte = await lireFichierDrive(id);
      var paquet = null;
      try { paquet = JSON.parse(texte); } catch (e) { paquet = null; }
      var prog = paquet && paquet.progression ? paquet.progression : null;
      if (!prog || !prog.questions) { await sauvegarderDansDrive(false); return; }

      var local = bilanGlobal();
      var localVide = local.travaillees === 0 && !etat.seance && !(etat.jours && etat.jours.length);

      if (localVide) {
        remplacerEtat(prog);
        sauverLocal();
        afficher("accueil");
        toast("Progression chargée depuis Drive.");
        return;
      }

      var charger = window.confirm("Une sauvegarde existe dans Drive (" + Object.keys(prog.questions).length +
        " questions suivies). La charger et remplacer la progression de cet appareil ?\n\n" +
        "Annuler garde cet appareil et l'envoie dans Drive.");

      if (charger) {
        remplacerEtat(prog);
        sauverLocal();
        afficher("accueil");
        toast("Progression chargée depuis Drive.");
      } else {
        await sauvegarderDansDrive(false);
      }
    } catch (e) {
      toast(String(e.message || e));
    }
  }

  async function chargerDepuisDrive() {
    if (!jetonDrive) { connecterDrive(); return; }
    try {
      var memo = memoDrive();
      var id = memo.fileId;
      if (!id) {
        var trouve = await chercherFichierDrive();
        id = trouve && trouve.id;
      }
      if (!id) { toast("Aucune sauvegarde dans Drive pour l'instant."); return; }

      var texte = await lireFichierDrive(id);
      var paquet = JSON.parse(texte);
      var prog = paquet && paquet.progression ? paquet.progression : paquet;
      if (!prog || !prog.questions) { toast("Le fichier Drive n'est pas une sauvegarde lisible."); return; }

      if (!window.confirm("Remplacer la progression de cet appareil par celle de Drive ?")) return;

      memo.fileId = id;
      ecrireMemoDrive(memo);
      remplacerEtat(prog);
      sauverLocal();
      afficher("accueil");
      toast("Progression chargée depuis Drive.");
    } catch (e) {
      toast(String(e.message || e));
    }
  }

  function fiche(id) {
    if (!etat.questions[id]) {
      etat.questions[id] = {
        niveau: null, derniereRevision: null, prochaineRevision: null,
        nbTravaux: 0, serie: 0, intervalle: null, historique: []
      };
    }
    var f = etat.questions[id];
    if (!f.historique) f.historique = [];
    return f;
  }

  function enregistrerJour() {
    var j = aujourdhui();
    if (etat.jours.indexOf(j) === -1) { etat.jours.push(j); etat.jours.sort(); }
  }

  function serieJours() {
    var jours = etat.jours || [];
    if (!jours.length) return 0;
    var set = {};
    jours.forEach(function (j) { set[j] = true; });
    var n = 0;
    var d = new Date();
    d.setHours(12, 0, 0, 0);
    if (!set[jourISO(d)]) {
      d.setDate(d.getDate() - 1);
      if (!set[jourISO(d)]) return 0;
    }
    while (set[jourISO(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* ---------------- moteur de répétition espacée ---------------- */

  /* Chaque fiche porte sa propre facilité (2,5 au départ) : une question dure
     revient plus tôt, une question solide s'espace plus vite. « Presque »
     progresse par paliers au lieu de rester bloqué à deux ou trois jours. */
  function planifier(f, niveau) {
    var avant = f.niveau;
    var jour = aujourdhui();
    var base;

    if (!f.facilite) f.facilite = 2.5;
    if (!f.presqueSerie) f.presqueSerie = 0;
    if (!f.rechutes) f.rechutes = 0;
    if (!f.parfaitsSuite) f.parfaitsSuite = 0;

    if (niveau === "encours") {
      if (avant && avant !== "encours") f.rechutes += 1;
      f.serie = 0;
      f.presqueSerie = 0;
      f.parfaitsSuite = 0;
      f.facilite = Math.max(1.3, f.facilite - 0.25);
      base = 1;
    } else if (niveau === "presque") {
      f.presqueSerie = Math.min(f.presqueSerie + 1, 3);
      f.serie = Math.max(0, (f.serie || 0) - 1);
      f.parfaitsSuite = 0;
      f.facilite = Math.max(1.3, f.facilite - 0.15);
      base = 2 + 2 * (f.presqueSerie - 1);
    } else {
      f.serie = avant === "parfait" ? Math.min((f.serie || 0) + 1, INTERVALLES_PARFAIT.length - 1) : 0;
      f.presqueSerie = 0;
      f.parfaitsSuite += 1;
      f.facilite = Math.min(3, f.facilite + 0.1);
      base = INTERVALLES_PARFAIT[f.serie];
      if (f.parfaitsSuite >= 2) { f.fragile = false; f.rechutes = 0; }
    }

    if (f.rechutes >= 3) f.fragile = true;

    var intervalle = Math.round(base * (f.facilite / 2.5));
    intervalle = Math.max(1, Math.min(180, intervalle));
    if (f.fragile && intervalle > 7) intervalle = 7;

    f.niveau = niveau;
    f.nbTravaux = (f.nbTravaux || 0) + 1;
    f.derniereRevision = jour;
    f.intervalle = intervalle;
    f.prochaineRevision = dansNJours(intervalle);
    f.historique.push({ jour: jour, avant: avant, apres: niveau });

    /* Rien ne doit tomber après le concours : l'intervalle est ramené pour
       garantir une dernière passage avant l'épreuve. */
    var joursConcours = joursAvantConcours();
    if (joursConcours > 0) {
      var limite = Math.max(1, joursConcours - 1);
      if (f.intervalle > limite) {
        f.intervalle = limite;
        f.prochaineRevision = dansNJours(limite);
      }
    }
  }

  function questionsARevoir() {
    var j = aujourdhui();
    return BANQUE.filter(function (q) {
      var f = etat.questions[q.id];
      return f && f.niveau && f.prochaineRevision && f.prochaineRevision <= j;
    });
  }

  /* Objectif du jour : la charge à revoir, jamais moins de 5 ni plus de 12.
     Le nombre déjà travaillé aujourd'hui est déduit au moment de composer. */
  function objectifJour() {
    return Math.min(12, Math.max(5, Math.round(questionsARevoir().length / 2)));
  }

  /* Combien de questions nouvelles par jour récemment, et quand la banque
     sera entièrement vue à ce rythme. */
  function projectionCouverture() {
    var restant = BANQUE.length - bilanGlobal().travailles;
    if (restant <= 0) return null;

    var premiers = {};
    BANQUE.forEach(function (q) {
      var f = etat.questions[q.id];
      if (f && f.historique && f.historique.length) {
        var d = f.historique[0].jour;
        premiers[d] = (premiers[d] || 0) + 1;
      }
    });

    var total = 0;
    for (var i = 0; i < 7; i++) total += premiers[dansNJours(-i)] || 0;
    if (!total) return null;

    var rythme = total / 7;
    var jours = Math.max(1, Math.ceil(restant / rythme));
    return { jours: jours, date: dansNJours(jours), restant: restant, rythme: rythme };
  }

  /* ---------------- date du concours ---------------- */

  function dateConcours() {
    var v = etat.concours;
    return /^\d{4}-\d{2}-\d{2}$/.test(v || "") ? v : CONCOURS_DEFAUT;
  }

  function joursAvantConcours() {
    return ecartJours(aujourdhui(), dateConcours());
  }

  /* Taux de réussite des douze dernières évaluations : parfait = 1,
     presque = 0,6, en cours = 0. Il pilote la place laissée aux nouveautés. */
  function reussiteRecente() {
    var notes = [];
    BANQUE.forEach(function (q) {
      var f = etat.questions[q.id];
      if (f && f.historique) {
        f.historique.forEach(function (h) { notes.push(h); });
      }
    });
    if (!notes.length) return null;

    notes.sort(function (a, b) { return (a.jour || "").localeCompare(b.jour || ""); });
    var poids = { parfait: 1, presque: 0.6, encours: 0 };
    var derniers = notes.slice(-12);
    var somme = 0;
    derniers.forEach(function (h) { somme += poids[h.apres] || 0; });
    return somme / derniers.length;
  }

  function bilanGlobal() {
    var somme = 0, travailles = 0;
    var compte = { encours: 0, presque: 0, parfait: 0 };
    BANQUE.forEach(function (q) {
      var f = etat.questions[q.id];
      if (!f || !f.niveau) return;
      travailles++;
      compte[f.niveau]++;
      somme += NIVEAU[f.niveau].poids;
    });
    return {
      total: BANQUE.length,
      travailles: travailles,
      compte: compte,
      pct: BANQUE.length ? Math.round((somme / BANQUE.length) * 100) : 0,
      aRevoir: questionsARevoir().length
    };
  }

  /* ---------------- sélection des questions ---------------- */

  function parId(id) {
    for (var i = 0; i < BANQUE.length; i++) if (BANQUE[i].id === id) return BANQUE[i];
    return null;
  }

  function melanger(tableau) {
    var a = tableau.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function seanceAleatoire(n) {
    return melanger(BANQUE).slice(0, Math.min(n, BANQUE.length));
  }

  function seanceCiblee(niveau) {
    return BANQUE
      .filter(function (q) { var f = etat.questions[q.id]; return f && f.niveau === niveau; })
      .sort(function (a, b) {
        var fa = etat.questions[a.id], fb = etat.questions[b.id];
        return (fa.prochaineRevision || "").localeCompare(fb.prochaineRevision || "");
      });
  }

  /* Séance intelligente : priorité aux questions dues, découverte progressive. */
  function seanceIntelligente(n) {
    var j = aujourdhui();
    var infos = BANQUE.map(function (q) {
      return { q: q, f: etat.questions[q.id] || {} };
    });

    var dues = infos.filter(function (x) { return x.f.niveau && x.f.prochaineRevision && x.f.prochaineRevision <= j; });
    var nouvelles = infos.filter(function (x) { return !x.f.niveau; });
    var plusTard = infos.filter(function (x) { return x.f.niveau && (!x.f.prochaineRevision || x.f.prochaineRevision > j); });

    var base = { encours: 120, presque: 55, parfait: 12 };
    dues.forEach(function (x) {
      var retard = Math.max(0, ecartJours(x.f.prochaineRevision, j));
      x.score = (base[x.f.niveau] || 0) + Math.min(retard, 14) * 7
        + (x.f.niveau === "encours" ? 15 : 0) + (x.f.fragile ? 30 : 0) + Math.random() * 8;
    });
    dues.sort(function (a, b) { return b.score - a.score; });

    /* La découverte suit les résultats : beaucoup de réussites ouvrent plus de
       places aux questions neuves, les échecs les referment. */
    var taux = reussiteRecente();
    var partNouvelles = taux === null ? 0.4 : (taux >= 0.85 ? 0.6 : (taux >= 0.65 ? 0.4 : (taux >= 0.45 ? 0.2 : 0)));
    var maxNouvelles = Math.min(nouvelles.length, Math.max(0, Math.round(n * partNouvelles)));

    plusTard.sort(function (a, b) {
      return (a.f.prochaineRevision || "9999").localeCompare(b.f.prochaineRevision || "9999");
    });

    var pool = dues.concat(plusTard, melanger(nouvelles));
    var choix = [];
    var deja = {};
    var parPartie = {};
    var fragileSuite = false;
    var nbNouvelles = 0;

    /* Deux questions maximum par partie, jamais deux fragiles de suite,
       et les nouvelles plafonnées par ce qui reste de l'objectif du jour. */
    function prendre(x, souple, seulementNouvelle) {
      if (!x || deja[x.q.id]) return false;
      var estNouvelle = !x.f.niveau;
      if (seulementNouvelle === true && !estNouvelle) return false;
      if (seulementNouvelle === false && estNouvelle) return false;
      if (estNouvelle && nbNouvelles >= maxNouvelles) return false;
      if (!souple) {
        if ((parPartie[x.q.partie] || 0) >= 2) return false;
        if (x.f.fragile && fragileSuite) return false;
      }
      choix.push(x.q);
      deja[x.q.id] = true;
      parPartie[x.q.partie] = (parPartie[x.q.partie] || 0) + 1;
      fragileSuite = !!x.f.fragile;
      if (estNouvelle) nbNouvelles++;
      return true;
    }

    /* échauffement : une question « parfait » due, non fragile */
    for (var w = 0; w < dues.length && choix.length === 0; w++) {
      if (dues[w].f.niveau === "parfait" && !dues[w].f.fragile) prendre(dues[w], false);
    }

    var plafondNonNouvelles = Math.max(0, n - maxNouvelles);
    for (var i = 0; i < pool.length && choix.length < plafondNonNouvelles; i++) prendre(pool[i], false, false);
    for (var i2 = 0; i2 < pool.length && choix.length < n && nbNouvelles < maxNouvelles; i2++) prendre(pool[i2], false, true);
    for (var i3 = 0; i3 < pool.length && choix.length < n; i3++) prendre(pool[i3], false, null);
    for (var k = 0; k < pool.length && choix.length < n; k++) prendre(pool[k], true, null);

    var secours = melanger(BANQUE);
    for (var f2 = 0; f2 < secours.length && choix.length < n; f2++) {
      if (!deja[secours[f2].id]) {
        choix.push(secours[f2]);
        deja[secours[f2].id] = true;
      }
    }

    /* placer les nouvelles questions au milieu de la séance */
    var nouvellesChoisies = choix.filter(function (q) { return !etat.questions[q.id] || !etat.questions[q.id].niveau; });
    if (nouvellesChoisies.length && choix.length > 2) {
      var autres = choix.filter(function (q) { return nouvellesChoisies.indexOf(q) === -1; });
      var milieu = Math.max(1, Math.floor(autres.length / 2));
      for (var m = 0; m < nouvellesChoisies.length; m++) {
        autres.splice(milieu + m, 0, nouvellesChoisies[m]);
      }
      choix = autres;
    }

    return choix.slice(0, n);
  }

  /* ---------------- session ---------------- */

  function lancerSeance(mode, questions) {
    if (!questions || !questions.length) {
      toast("Aucune question disponible pour ce mode.");
      return;
    }
    etat.seance = {
      mode: mode,
      ids: questions.map(function (q) { return q.id; }),
      index: 0,
      evaluations: {},
      debut: new Date().toISOString(),
      finie: false
    };
    revele = false;
    sauver();
    afficher("seance");
  }

  function evaluer(id, niveau) {
    var s = etat.seance;
    if (!s || !NIVEAU[niveau]) return;
    var f = fiche(id);
    var deja = s.evaluations[id];
    if (deja && deja.snapshot) {
      try { Object.assign(f, JSON.parse(deja.snapshot)); } catch (e) {}
    }
    var snapshot = JSON.stringify(f);
    var avant = f.niveau;
    planifier(f, niveau);
    s.evaluations[id] = { avant: avant, apres: niveau, snapshot: snapshot, jour: aujourdhui() };
    var jour = aujourdhui();
    if (!deja) {
      etat.evaluations = (etat.evaluations || 0) + 1;
      etat.parJour[jour] = (etat.parJour[jour] || 0) + 1;
      var objectif = objectifJour();
      etat.objectifCelebre = etat.objectifCelebre || {};
      if (etat.parJour[jour] >= objectif && !etat.objectifCelebre[jour]) {
        etat.objectifCelebre[jour] = true;
        celebrer(18);
        toast("Objectif du jour atteint : " + etat.parJour[jour] + " questions. Bien joué.");
      }
    }
    enregistrerJour();
    sauver();
    rendreSeance();
  }

  function suivante() {
    var s = etat.seance;
    if (!s) return;
    if (!s.evaluations[s.ids[s.index]]) {
      toast("Choisis ton niveau avant de passer à la suite.");
      return;
    }
    s.index++;
    revele = false;
    if (s.index >= s.ids.length) { terminerSeance(); return; }
    sauver();
    rendreSeance();
  }

  function terminerSeance() {
    var s = etat.seance;
    if (!s) return;
    if (!s.finie) {
      s.finie = true;
      s.fin = new Date().toISOString();
      etat.derniereSeance = JSON.parse(JSON.stringify(s));
      sauver();
      celebrer(26);
    }
    afficher("bilan");
  }

  /* ---------------- rendu : accueil ---------------- */

  function pointsObjectif(fait, total) {
    var html = "";
    var n = total || OBJECTIF_JOUR;
    for (var i = 0; i < n; i++) {
      html += '<span class="objectif__point' + (i < fait ? " plein" : "") + '"></span>';
    }
    return html;
  }

  function rendreAccueil() {
    var zone = document.getElementById("ecran-accueil");
    var b = bilanGlobal();
    var s = etat.seance;
    var reprise = "";

    if (s && !s.finie && s.index < s.ids.length) {
      reprise =
        '<div class="reprise">' +
          '<div>' +
            '<p class="reprise__t">Séance en cours</p>' +
            '<p class="reprise__s">Question ' + (s.index + 1) + " sur " + s.ids.length +
            " · " + (MODES[s.mode] || "Séance") + "</p>" +
          "</div>" +
          '<button class="btn" data-action="reprendre">Reprendre</button>' +
        "</div>";
    }

    var segments = [5, 10, 15].map(function (n) {
      return '<button class="segment' + (longueur === n ? " actif" : "") + '" data-action="longueur" data-n="' + n + '">' + n + " questions</button>";
    }).join("");

    var nbEncours = b.compte.encours;
    var nbPresque = b.compte.presque;

    var lignes =
      '<button class="ligne-action" data-action="aleatoire" data-n="' + longueur + '">' +
        '<span class="ligne-action__ico ligne-action__ico--bleu">⟳</span>' +
        '<span class="ligne-action__txt">' +
          '<span class="ligne-action__t">Séance aléatoire</span>' +
          '<span class="ligne-action__s">' + longueur + " questions tirées dans toute la banque, sans doublon</span>" +
        "</span>" +
        '<span class="ligne-action__fleche">→</span>' +
      "</button>" +
      '<button class="ligne-action" data-action="ciblee" data-niveau="encours"' + (nbEncours ? "" : " disabled") + ">" +
        '<span class="ligne-action__ico ligne-action__ico--vert">●</span>' +
        '<span class="ligne-action__txt">' +
          '<span class="ligne-action__t">Revoir les « En cours »</span>' +
          '<span class="ligne-action__s">' + (nbEncours ? nbEncours + " question" + (nbEncours > 1 ? "s" : "") : "Aucune question à ce niveau") + "</span>" +
        "</span>" +
        '<span class="ligne-action__fleche">→</span>' +
      "</button>" +
      '<button class="ligne-action" data-action="ciblee" data-niveau="presque"' + (nbPresque ? "" : " disabled") + ">" +
        '<span class="ligne-action__ico ligne-action__ico--orange">●</span>' +
        '<span class="ligne-action__txt">' +
          '<span class="ligne-action__t">Revoir les « Presque »</span>' +
          '<span class="ligne-action__s">' + (nbPresque ? nbPresque + " question" + (nbPresque > 1 ? "s" : "") : "Aucune question à ce niveau") + "</span>" +
        "</span>" +
        '<span class="ligne-action__fleche">→</span>' +
      "</button>";

    var themes = Object.keys(PARTIES).map(function (p) {
      var liste = BANQUE.filter(function (q) { return q.partie === Number(p); });
      var somme = 0;
      liste.forEach(function (q) {
        var f = etat.questions[q.id];
        if (f && f.niveau) somme += NIVEAU[f.niveau].poids;
      });
      var pct = liste.length ? Math.round((somme / liste.length) * 100) : 0;
      return '<div class="theme-ligne">' +
        '<div><div class="theme-ligne__nom">' + PARTIES[p] + "</div>" +
        '<div class="barre barre--fine" style="margin-top:6px"><div class="barre__remplissage" style="width:' + pct + '%"></div></div></div>' +
        '<div class="theme-ligne__pct">' + pct + "%</div>" +
      "</div>";
    }).join("");

    var serie = serieJours();
    var faitAujourdhui = (etat.parJour && etat.parJour[aujourdhui()]) || 0;
    var objectif = objectifJour();
    var projection = projectionCouverture();
    var tauxReussite = reussiteRecente();

    zone.innerHTML =
      '<div class="page">' +
        '<p class="sur-titre">Inspecteur DGFiP · analyse économique</p>' +
        "<h1>Réviser par la réponse.</h1>" +
        '<p class="sous-titre">' + b.total + " questions rédigées dans le style de l'épreuve n° 2. Une question, une réponse modèle, trois niveaux de maîtrise.</p>" +
        reprise +
        '<div class="carte carte--hero">' +
          '<div class="hero__haut">' +
            "<div>" +
              '<p class="etiquette">Progression générale</p>' +
              '<div class="anneau" role="img" aria-label="Progression générale : ' + b.pct + ' pour cent">' +
                '<svg viewBox="0 0 100 100" aria-hidden="true">' +
                  '<circle class="anneau__fond" cx="50" cy="50" r="42"></circle>' +
                  '<circle class="anneau__jauge" cx="50" cy="50" r="42" style="stroke-dashoffset:' + (264 - 2.64 * b.pct).toFixed(1) + '"></circle>' +
                "</svg>" +
                '<div class="anneau__txt"><span class="anneau__val">' + b.pct + '</span><span class="anneau__pct">%</span></div>' +
              "</div>" +
            "</div>" +
            '<div class="hero__rev">' + b.aRevoir + "<span>à revoir</span></div>" +
          "</div>" +
          '<p class="hero__note">' + b.travailles + " question" + (b.travailles > 1 ? "s" : "") + " travaillée" + (b.travailles > 1 ? "s" : "") + " sur " + b.total +
            (serie > 1 ? " · série de " + serie + " jours" : "") + "</p>" +
          '<div class="objectif">' +
            '<div class="objectif__ligne">' +
              '<span class="objectif__lab">Objectif du jour</span>' +
              '<span class="objectif__val">' + faitAujourdhui + " / " + objectif +
                (serie > 1 ? ' <span class="objectif__serie">' + serie + " jours d'affilée</span>" : "") +
              "</span>" +
            "</div>" +
            '<p class="objectif__charge">' + b.aRevoir + " à revoir" +
              (faitAujourdhui >= objectif
                ? " · objectif atteint aujourd'hui"
                : " · encore " + (objectif - faitAujourdhui) + " à faire") +
            "</p>" +
            '<div class="objectif__points">' + pointsObjectif(faitAujourdhui, objectif) + "</div>" +
            (projection
              ? '<p class="objectif__proj">Au rythme des sept derniers jours, les ' + b.total +
                " questions seront vues le " + dateCourte(projection.date) + "</p>"
              : "") +
            '<div class="objectif__concours">' +
              '<span class="objectif__j">Concours le ' + dateCourte(dateConcours()) +
                (joursAvantConcours() > 0 ? " · J-" + joursAvantConcours() : "") + "</span>" +
              '<input type="date" id="date-concours" value="' + dateConcours() + '" aria-label="Date du concours">' +
            "</div>" +
            '<p class="objectif__decouverte">' +
              (b.total - b.travailles > 0
                ? (b.total - b.travailles) + " à découvrir"
                : "Toutes les questions ont été vues au moins une fois") +
              (tauxReussite === null ? "" : " · réussite récente " + Math.round(tauxReussite * 100) + " %") +
            "</p>" +
          "</div>" +
          '<div class="hero__actions">' +
            '<button class="btn btn--primaire" data-action="intelligente">Séance intelligente</button>' +
            '<button class="btn btn--fantome" data-action="aleatoire" data-n="5">Aléatoire · 5</button>' +
          "</div>" +
        "</div>" +

        '<div class="grille-stats">' +
          '<div class="tuile tuile--vert"><p class="tuile__val">' + b.compte.encours + '</p><p class="tuile__lab"><span class="point point--vert"></span>En cours</p></div>' +
          '<div class="tuile tuile--orange"><p class="tuile__val">' + b.compte.presque + '</p><p class="tuile__lab"><span class="point point--orange"></span>Presque</p></div>' +
          '<div class="tuile tuile--bleu"><p class="tuile__val">' + b.compte.parfait + '</p><p class="tuile__lab"><span class="point point--bleu"></span>Parfait</p></div>' +
        "</div>" +

        '<section class="bloc">' +
          '<h2 class="bloc__titre">Lancer une séance</h2>' +
          '<div class="segments" role="group" aria-label="Nombre de questions">' + segments + "</div>" +
          '<div class="liste-actions">' + lignes + "</div>" +
        "</section>" +

        '<section class="bloc">' +
          '<h2 class="bloc__titre">Sauvegarde</h2>' +
          '<p class="bloc__aide">La progression est déjà enregistrée dans le navigateur. « Sauvegarder » crée un fichier de secours : sur iPad, la feuille de partage permet de le déposer dans Drive ou Fichiers, sur ordinateur il se télécharge. Ce fichier permet de changer d\'appareil ou de récupérer après un effacement.</p>' +
          '<div class="sauvegarde__actions">' +
            '<button class="btn btn--fantome" data-action="exporter">Sauvegarder</button>' +
            '<button class="btn btn--fantome" data-action="importer">Restaurer</button>' +
          "</div>" +
          '<p class="bloc__aide" style="margin-top:10px">' +
            (etat.derniereSauvegarde
              ? "Dernière sauvegarde le " + dateCourte(etat.derniereSauvegarde) + "."
              : "Aucune sauvegarde exportée pour l'instant.") +
          "</p>" +
          blocDrive() +
        "</section>" +

        '<section class="bloc">' +
          '<h2 class="bloc__titre">Couverture du programme</h2>' +
          '<div class="themes">' + themes + "</div>" +
        "</section>" +

        (etat.derniereSeance
          ? '<section class="bloc"><button class="ligne-action" data-action="voir-bilan">' +
            '<span class="ligne-action__ico">↺</span>' +
            '<span class="ligne-action__txt"><span class="ligne-action__t">Revoir le dernier bilan</span>' +
            '<span class="ligne-action__s">Les questions de la séance précédente et leurs réponses</span></span>' +
            '<span class="ligne-action__fleche">→</span></button></section>'
          : "") +

      "</div>";
  }

  /* ---------------- rendu : séance ---------------- */

  function rendreSeance() {
    var zone = document.getElementById("ecran-seance");
    var s = etat.seance;
    if (!s) {
      zone.innerHTML = '<div class="page"><p class="vide">Aucune séance en cours.</p>' +
        '<div style="text-align:center;margin-top:16px"><button class="btn btn--primaire" data-action="accueil">Retour à l\'accueil</button></div></div>';
      return;
    }
    if (s.index >= s.ids.length) { terminerSeance(); return; }

    var q = parId(s.ids[s.index]);
    if (!q) {
      s.index++;
      if (s.index >= s.ids.length) { terminerSeance(); return; }
      sauver();
      rendreSeance();
      return;
    }

    var deja = s.evaluations[q.id];
    var montre = revele || !!deja;
    var f = etat.questions[q.id];
    var parfaits = 0;
    Object.keys(s.evaluations).forEach(function (id) {
      if (s.evaluations[id].apres === "parfait") parfaits++;
    });

    var html =
      '<div class="seance">' +
        '<div class="seance__tete">' +
          '<button class="lien-sortie" data-action="quitter">Quitter</button>' +
          '<div class="seance__progres">' +
            '<div class="progres-segments">' + s.ids.map(function (id, i) {
              var etatSeg = s.evaluations[id] ? " fait" : (i === s.index ? " courant" : "");
              return '<span class="progres-segments__seg' + etatSeg + '"></span>';
            }).join("") + "</div>" +
            '<p class="seance__compte">Question ' + (s.index + 1) + " sur " + s.ids.length +
              (parfaits > 0 ? " · " + parfaits + " parfait" + (parfaits > 1 ? "s" : "") : "") + "</p>" +
          "</div>" +
          '<span class="seance__mode">' + (MODES[s.mode] || "") + "</span>" +
        "</div>" +

        '<article class="carte carte--question"' + (montre ? "" : ' data-action="reveler" style="cursor:pointer"') + ">" +
          '<div class="question__meta">' +
            '<span class="puce puce--p' + q.partie + '">' + PARTIES[q.partie] + "</span>" +
            '<span class="badge badge--' + (q.statut === "officiel" ? "officiel" : "entrainement") + '">' +
              (q.statut === "officiel" ? "Sujet officiel" : "Entraînement") + "</span>" +
            (f && f.fragile ? '<span class="badge-fragile">fragile</span>' : "") +
          "</div>" +
          '<h2 class="question__texte">' + q.question + "</h2>" +
          (montre
            ? ""
            : '<p class="question__invite">Formule ta réponse mentalement, puis affiche le modèle.</p>' +
              '<button class="btn btn--primaire btn--large" data-action="reveler">Afficher la réponse</button>') +
        "</article>";

    if (montre) {
      html +=
        '<div class="carte carte--reponse">' +
          '<div class="reponse">' + rendreReponse(q, { edition: editId === q.id }) + "</div>" +
          '<div class="niveaux">' +
            '<p class="niveaux__titre">' + (deja ? "Ton niveau pour cette question" : "Où en es-tu ?") + "</p>" +
            '<div class="niveaux__grille">' +
              ["encours", "presque", "parfait"].map(function (n) {
                var info = NIVEAU[n];
                var choisi = deja && deja.apres === n;
                return '<button class="niveau niveau--' + info.classe + (choisi ? " choisi" : "") + '" data-niveau="' + n + '"' +
                  (choisi ? ' aria-pressed="true"' : ' aria-pressed="false"') + ">" +
                  '<span class="niveau__t">' + info.label + "</span>" +
                  '<span class="niveau__s">' + info.aide + "</span>" +
                  (choisi ? '<span class="niveau__check" aria-hidden="true">✓</span>' : "") +
                "</button>";
              }).join("") +
            "</div>" +
          "</div>" +
          '<div class="pied-reponse">' +
            '<button class="btn btn--primaire' + (deja ? " btn--attire" : "") + '" data-action="suivante"' + (deja ? "" : " disabled") + ">" +
              (s.index + 1 === s.ids.length ? "Voir le bilan" : "Suivante") +
            "</button>" +
            '<span class="pied-reponse__info">' +
              (deja
                ? "Enregistré · " + (f && f.prochaineRevision ? "revue le " + dateCourte(f.prochaineRevision) : "")
                : "Choisis un niveau pour continuer") +
            "</span>" +
            '<span class="raccourcis">1 · 2 · 3</span>' +
          "</div>" +
        "</div>";
    }

    html += "</div>";
    zone.innerHTML = html;
    preparerEditeur();
  }

  function dateCourte(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  }

  /* ---------------- rendu : bilan ---------------- */

  function rendreBilan() {
    var zone = document.getElementById("ecran-bilan");
    var s = etat.derniereSeance || etat.seance;
    if (!s) {
      zone.innerHTML = '<div class="page"><p class="vide">Aucune séance terminée pour le moment.</p>' +
        '<div style="text-align:center;margin-top:16px"><button class="btn btn--primaire" data-action="accueil">Retour à l\'accueil</button></div></div>';
      return;
    }

    var compte = { encours: 0, presque: 0, parfait: 0 };
    var avant = 0, apres = 0;
    var lignes = [];

    s.ids.forEach(function (id) {
      var q = parId(id);
      var ev = s.evaluations[id];
      if (!q || !ev) return;
      compte[ev.apres]++;
      avant += ev.avant ? NIVEAU[ev.avant].poids : 0;
      apres += NIVEAU[ev.apres].poids;
      var f = etat.questions[id] || {};
      var evolution = ev.avant ? NIVEAU[ev.avant].label + " → " + NIVEAU[ev.apres].label : NIVEAU[ev.apres].label;
      lignes.push(
        '<button class="bilan__ligne" data-question="' + q.id + '">' +
          '<span class="point point--' + NIVEAU[ev.apres].classe + '"></span>' +
          '<span class="bilan__ligne__txt">' +
            '<span class="bilan__ligne__q">' + q.question + "</span>" +
            '<span class="bilan__ligne__m">' + evolution +
              " · " + (f.nbTravaux || 1) + " passage" + ((f.nbTravaux || 1) > 1 ? "s" : "") +
              (f.prochaineRevision ? " · prochaine revue le " + dateCourte(f.prochaineRevision) : "") +
            "</span>" +
          "</span>" +
          '<span class="ligne-action__fleche">→</span>' +
        "</button>"
      );
    });

    var n = lignes.length || 1;
    var pctAvant = Math.round((avant / n) * 100);
    var pctApres = Math.round((apres / n) * 100);
    var duree = 0;
    if (s.debut) duree = Math.max(1, Math.round((new Date(s.fin || Date.now()) - new Date(s.debut)) / 60000));

    zone.innerHTML =
      '<div class="page">' +
        '<div class="bilan__entete">' +
          '<span class="bilan__emoji">✦</span>' +
          '<h1 class="bilan__titre">Séance terminée</h1>' +
          '<p class="bilan__sous">' + lignes.length + " question" + (lignes.length > 1 ? "s" : "") +
            " travaillée" + (lignes.length > 1 ? "s" : "") + " · environ " + duree + " min</p>" +
        "</div>" +

        '<div class="grille-stats">' +
          '<div class="tuile tuile--vert"><p class="tuile__val">' + compte.encours + '</p><p class="tuile__lab"><span class="point point--vert"></span>En cours</p></div>' +
          '<div class="tuile tuile--orange"><p class="tuile__val">' + compte.presque + '</p><p class="tuile__lab"><span class="point point--orange"></span>Presque</p></div>' +
          '<div class="tuile tuile--bleu"><p class="tuile__val">' + compte.parfait + '</p><p class="tuile__lab"><span class="point point--bleu"></span>Parfait</p></div>' +
        "</div>" +

        '<section class="bloc">' +
          '<h2 class="bloc__titre">Maîtrise pendant la séance</h2>' +
          '<div class="carte" style="padding:18px">' +
            '<div class="hero__haut"><div>' +
              '<p class="etiquette">Avant → après</p>' +
              '<p class="hero__chiffre" style="font-size:34px">' + pctAvant + '<span class="hero__pct">%</span>' +
                ' <span style="font-size:18px;color:var(--encre-3)">→</span> ' + pctApres + '<span class="hero__pct">%</span></p>' +
            "</div></div>" +
            '<div class="barre"><div class="barre__remplissage" style="width:' + pctApres + '%"></div></div>' +
            '<p class="hero__note">Moyenne des niveaux attribués sur cette séance.</p>' +
          "</div>" +
        "</section>" +

        '<section class="bloc">' +
          '<h2 class="bloc__titre">Questions travaillées</h2>' +
          '<p class="bloc__aide">Clique sur une question pour relire sa réponse.</p>' +
          '<div class="bilan__lignes">' + (lignes.join("") || '<p class="vide">Aucune question évaluée.</p>') + "</div>" +
        "</section>" +

        '<div class="bilan__actions">' +
          '<button class="btn btn--primaire" data-action="intelligente">Nouvelle séance intelligente</button>' +
          '<button class="btn btn--fantome" data-action="accueil">Retour à l\'accueil</button>' +
        "</div>" +
      "</div>";
  }

  /* ---------------- rendu : banque ---------------- */

  function rendreBanque() {
    var zone = document.getElementById("ecran-banque");
    var chips = [{ v: 0, t: "Toutes" }].concat(Object.keys(PARTIES).map(function (p) { return { v: Number(p), t: PARTIES[p] }; }))
      .map(function (c) {
        return '<button class="segment' + (filtrePartie === c.v ? " actif" : "") + '" data-action="filtre" data-p="' + c.v + '">' + c.t + "</button>";
      }).join("");

    var statuts = [
      { v: "toutes", t: "Toutes" },
      { v: "officiel", t: "Sujets officiels" },
      { v: "entrainement", t: "Entraînement" }
    ].map(function (c) {
      return '<button class="segment' + (filtreStatut === c.v ? " actif" : "") + '" data-action="statut" data-s="' + c.v + '">' + c.t + "</button>";
    }).join("");

    zone.innerHTML =
      '<div class="page">' +
        '<p class="sur-titre">Banque de questions</p>' +
        "<h1>" + BANQUE.length + " questions</h1>" +
        '<p class="sous-titre">Couvre les cinq parties du programme. Les formulations officielles sont signalées ; les autres sont des questions d\'entraînement écrites dans le même style.</p>' +
        '<div class="recherche">' +
          '<span class="recherche__ico">⌕</span>' +
          '<input id="recherche-banque" type="search" placeholder="Chercher une notion, un auteur…" value="' + echapper(recherche) + '" aria-label="Rechercher dans la banque">' +
        "</div>" +
        '<div class="filtres">' + chips + "</div>" +
        '<div class="filtres" style="padding-top:0">' + statuts + "</div>" +
        '<div class="liste-questions" id="liste-banque"></div>' +
        '<p class="note-format"><strong>Format de l\'épreuve.</strong> Épreuve écrite n° 2 : 45 QCM et 3 à 4 questions à réponses courtes, 2 h 30, coefficient 3, note éliminatoire sous 5/20. Chaque QRC doit tenir en une quinzaine de lignes : une phrase de cadrage, un développement organisé, une conclusion brève seulement si elle apporte quelque chose.</p>' +
      "</div>";

    filtrerBanque();
  }

  function filtrerBanque() {
    var liste = document.getElementById("liste-banque");
    if (!liste) return;
    var terme = recherche.trim().toLowerCase();

    var resultat = BANQUE.filter(function (q) {
      if (filtrePartie && q.partie !== filtrePartie) return false;
      if (filtreStatut !== "toutes" && q.statut !== filtreStatut) return false;
      if (!terme) return true;
      var texte = (q.question + " " + (q.motsCles || []).join(" ") + " " + q.theme).toLowerCase();
      return texte.indexOf(terme) !== -1;
    });

    if (!resultat.length) {
      liste.innerHTML = '<p class="vide">Aucune question ne correspond à cette recherche.</p>';
      return;
    }

    liste.innerHTML = resultat.map(function (q) {
      var f = etat.questions[q.id];
      var point = f && f.niveau ? '<span class="point point--' + NIVEAU[f.niveau].classe + '"></span>' : '<span class="point" style="background:#dcdfe8"></span>';
      var niveau = f && f.niveau ? NIVEAU[f.niveau].label : "Non travaillée";
      return '<button class="ligne-q" data-question="' + q.id + '">' +
        point +
        '<span class="ligne-q__txt">' +
          '<span class="ligne-q__q">' + q.question + "</span>" +
          '<span class="ligne-q__m">' + PARTIES[q.partie] + " · " + niveau +
            (q.statut === "officiel" ? " · sujet officiel" : "") +
            (f && f.fragile ? ' <span class="badge-fragile">fragile</span>' : "") + "</span>" +
        "</span>" +
        '<span class="ligne-action__fleche">→</span>' +
      "</button>";
    }).join("");
  }

  /* ---------------- utilitaires ---------------- */

  function echapper(texte) {
    return String(texte).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function roleBloc(q, i) {
    var plan = (window.PLANS && window.PLANS[q.id]) || null;
    if (plan && plan[i]) return plan[i];
    if (i === 0) return "intro";
    if (i === q.reponse.length - 1) return "conclusion";
    return "dev";
  }

  function texteRiche(texte) {
    return echapper(texte)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  /* Réponse découpée en blocs : introduction, développements numérotés, conclusion.
     Le mode « trous » masque les termes en gras pour forcer le rappel actif. */
  var ICONE_CRAYON =
    '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M4.5 19.5h4l10-10a2.12 2.12 0 0 0-3-3l-10 10v3z"/><path d="M14 6.5l3 3"/></svg>';

  var ICONE_PARTAGE =
    '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 15V3.5"/><path d="M8.5 7L12 3.5 15.5 7"/>' +
    '<path d="M5.5 13.5v6a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-6"/></svg>';

  /* Réponse personnalisée : elle peut contenir plus ou moins de paragraphes que
     l'original. Les rôles sont alors premiers = introduction, derniers = conclusion. */
  function reponsePerso(q) {
    var r = etat.reponses && etat.reponses[q.id];
    if (!r || !r.blocs || !r.blocs.length) return null;
    return r;
  }

  function blocsReponse(q) {
    var perso = reponsePerso(q);
    var textes = perso ? perso.blocs : q.reponse;
    var numeros = 0;
    return textes.map(function (p, i) {
      var role;
      if (perso) {
        if (textes.length === 1 || i === 0) role = "intro";
        else if (i === textes.length - 1) role = "conclusion";
        else role = "dev";
      } else {
        role = roleBloc(q, i);
      }
      var libelle = role === "intro" ? "Introduction" : (role === "conclusion" ? "Conclusion" : String(++numeros));
      return { role: role, libelle: libelle, texte: p };
    });
  }

  function rendreReponse(q, options) {
    var opts = options || {};
    var edition = !!opts.edition;
    var perso = reponsePerso(q);
    var trous = etat.preferences && etat.preferences.trous && !edition;
    var blocs = blocsReponse(q);

    var barre =
      '<div class="reponse__barre">' +
        '<span class="reponse__legende">' + (edition ? "Mode édition" : "Structure de la réponse") + "</span>" +
        '<div class="reponse__outils">' +
          (edition
            ? '<button type="button" class="mini-btn mini-btn--plein" data-action="enregistrer-reponse" data-id="' + q.id + '">Enregistrer</button>' +
              '<button type="button" class="mini-btn" data-action="annuler-edition">Annuler</button>' +
              (perso ? '<button type="button" class="mini-btn mini-btn--discret" data-action="reinitialiser-reponse" data-id="' + q.id + '">Origine</button>' : "")
            : (perso ? '<span class="reponse__marque" title="Réponse annotée par toi">annotée</span>' : "") +
              '<button type="button" class="mini-btn" data-action="trous">' +
                (etat.preferences && etat.preferences.trous ? "Afficher les termes" : "Masquer les termes") + "</button>" +
              '<button type="button" class="outil" data-action="editer" data-id="' + q.id + '" aria-label="Modifier la réponse" title="Modifier la réponse">' + ICONE_CRAYON + "</button>" +
              '<button type="button" class="outil" data-action="partager" data-id="' + q.id + '" aria-label="Copier la réponse pour une IA" title="Copier la réponse pour une IA">' + ICONE_PARTAGE + "</button>") +
        "</div>" +
      "</div>";

    var aide = edition
      ? '<p class="edition__aide">Colle ta nouvelle version à la place du texte : chaque paragraphe séparé par une ligne vide devient un bloc, et les **mots entre astérisques** restent surlignés. « Origine » rétablit la réponse fournie.</p>'
      : "";

    var notions = (q.motsCles && q.motsCles.length)
      ? '<div class="notions"><span class="notions__titre">Notions clés</span>' +
        q.motsCles.map(function (m) { return '<span class="notion">' + echapper(m) + "</span>"; }).join("") + "</div>"
      : "";

    if (edition) {
      var brut = blocs.map(function (b) { return b.texte; }).join("\n\n");
      return barre + aide +
        '<textarea class="editeur" id="editeur-reponse" spellcheck="true" aria-label="Texte de la réponse">' +
          echapper(brut) +
        "</textarea>" + notions;
    }

    var corps = blocs.map(function (b, i) {
      var contenu = texteRiche(b.texte);
      if (trous) {
        contenu = contenu.replace(/<strong>([\s\S]+?)<\/strong>/g, function (m, mot) {
          var cache = mot.replace(/[^\s]/g, "·");
          return '<button type="button" class="trou" data-mot="' + mot.replace(/"/g, "&quot;") +
            '" aria-label="Afficher le terme masqué">' + cache + "</button>";
        });
      }
      return '<div class="bloc-texte bloc-texte--' + b.role + '" style="animation-delay:' + (i * 70) + 'ms">' +
        '<span class="bloc-texte__label">' + b.libelle + "</span>" +
        "<p>" + contenu + "</p>" +
      "</div>";
    }).join("");

    return barre + aide + corps + notions;
  }

  /* Découpe le texte collé : une ligne vide sépare deux paragraphes. Les lignes
     qui ne portent qu'un intitulé (Introduction, 2., Conclusion) sont retirées. */
  function decouperParagraphes(texte) {
    return String(texte)
      .replace(/\r\n?/g, "\n")
      .split(/\n\s*\n/)
      .map(function (bloc) {
        return bloc
          .split("\n")
          .filter(function (ligne) {
            return !/^\s*(\*\*)?(introduction|conclusion|\d{1,2}\s*[.)]?)(\*\*)?\s*:?\s*$/i.test(ligne);
          })
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
      })
      .filter(function (b) { return b.length > 0; });
  }

  function enregistrerReponse(id) {
    var q = parId(id);
    var zone = document.querySelector(".editeur");
    if (!q || !zone) { editId = null; rafraichirReponse(); return; }

    var blocs = decouperParagraphes(zone.value);
    if (!blocs.length) { toast("Le texte est vide : colle une réponse ou annule."); return; }

    if (!etat.reponses) etat.reponses = {};
    etat.reponses[id] = { blocs: blocs, maj: new Date().toISOString() };
    editId = null;
    sauver();
    rafraichirReponse();
    toast("Réponse enregistrée · " + blocs.length + " paragraphe" + (blocs.length > 1 ? "s" : ""));
  }

  /* À l'ouverture de l'éditeur, tout le texte est sélectionné : un collage
     remplace directement l'ancienne version. */
  function preparerEditeur() {
    var zone = document.querySelector(".editeur");
    if (!zone) return;
    zone.focus();
    try { zone.setSelectionRange(0, zone.value.length); } catch (e) {}
  }

  function rafraichirReponse() {
    var modale = document.getElementById("modale");
    if (modale.hasAttribute("open") && modaleId) { ouvrirModale(modaleId); return; }
    if (document.getElementById("ecran-seance").classList.contains("actif")) rendreSeance();
  }

  function textePourIA(q) {
    var corps = blocsReponse(q).map(function (b) { return b.libelle + " — " + b.texte; }).join("\n\n");
    return "Contexte : je prépare l'épreuve n° 2 du concours d'inspecteur des finances publiques (analyse économique). " +
      "Elle comporte 3 à 4 questions à réponses courtes en 2 h 30, et chaque réponse doit tenir en une quinzaine de lignes manuscrites, " +
      "en français simple mais précis, sans rubriques artificielles.\n\n" +
      "Question : " + q.question + "\n\n" +
      "Réponse type à restituer :\n\n" + corps + "\n\n" +
      (q.motsCles && q.motsCles.length ? "Notions attendues : " + q.motsCles.join(" · ") + "\n\n" : "") +
      "Peux-tu m'en proposer une version plus simple et une version plus complète, en gardant le même plan et à peu près la même longueur ? " +
      "Termine par les notions que le correcteur attend le plus.";
  }

  function copieSecours(texte, retour) {
    var zone = document.createElement("textarea");
    zone.value = texte;
    zone.setAttribute("readonly", "");
    zone.style.position = "fixed";
    zone.style.top = "-2000px";
    document.body.appendChild(zone);
    zone.select();
    zone.setSelectionRange(0, texte.length);
    var reussi = false;
    try { reussi = document.execCommand("copy"); } catch (e) { reussi = false; }
    zone.remove();
    retour(reussi);
  }

  function partagerReponse(id) {
    var q = parId(id);
    if (!q) return;
    var texte = textePourIA(q);
    var fini = function (ok) {
      if (ok) toast("Réponse copiée. Colle-la dans ton IA, puis demande plus simple ou plus complet.");
      else toast("Copie automatique impossible : sélectionne le texte et copie-le à la main.");
    };
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      navigator.clipboard.writeText(texte).then(function () { fini(true); }, function () { copieSecours(texte, fini); });
    } else {
      copieSecours(texte, fini);
    }
  }

  function celebrer(nombre) {
    if (!window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var couleurs = ["#2b57ff", "#16a34a", "#f0930b", "#7b8cff", "#0e1220"];
    for (var i = 0; i < nombre; i++) {
      var d = document.createElement("span");
      d.className = "confetti";
      d.style.left = (Math.random() * 100) + "vw";
      d.style.background = couleurs[i % couleurs.length];
      d.style.animationDelay = (Math.random() * 0.35) + "s";
      d.style.width = d.style.height = (6 + Math.random() * 7) + "px";
      document.body.appendChild(d);
      (function (el) { setTimeout(function () { el.remove(); }, 2300); })(d);
    }
  }

  var minuteurToast;
  function toast(message) {
    var el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("visible");
    clearTimeout(minuteurToast);
    minuteurToast = setTimeout(function () { el.classList.remove("visible"); }, 2600);
  }

  /* Niveau choisi depuis la Banque : même planification qu'en séance, sans
     rattachement à une séance, et enregistré comme le reste de la progression. */
  function definirNiveau(id, niveau) {
    var q = parId(id);
    if (!q || !NIVEAU[niveau]) return;

    var f = fiche(id);
    planifier(f, niveau);
    enregistrerJour();
    sauver();

    rendreNiveauxModale(q);
    filtrerBanque();
    toast("Niveau enregistré : " + NIVEAU[niveau].label +
      (f.prochaineRevision ? " · revue le " + dateCourte(f.prochaineRevision) : ""));
  }

  function rendreNiveauxModale(q) {
    var zone = document.getElementById("modale-niveaux");
    if (!zone) return;

    var f = etat.questions[q.id] || {};
    var actuel = f.niveau || null;

    zone.innerHTML =
      '<p class="niveaux__titre">Ton niveau</p>' +
      '<div class="niveaux__grille">' +
        ["encours", "presque", "parfait"].map(function (n) {
          var info = NIVEAU[n];
          var choisi = actuel === n;
          return '<button class="niveau niveau--' + info.classe + (choisi ? " choisi" : "") +
            '" data-action="niveau-banque" data-id="' + q.id + '" data-niveau="' + n +
            '" aria-pressed="' + (choisi ? "true" : "false") + '">' +
            '<span class="niveau__t">' + info.label + "</span>" +
            '<span class="niveau__s">' + info.aide + "</span>" +
            (choisi ? '<span class="niveau__check" aria-hidden="true">✓</span>' : "") +
          "</button>";
        }).join("") +
      "</div>" +
      '<p class="modale__suivi">' +
        (f.fragile ? '<span class="badge-fragile">fragile</span> ' : "") +
        (actuel
          ? "Revue prévue le " + dateCourte(f.prochaineRevision) + " · " + (f.nbTravaux || 0) +
            " passage" + ((f.nbTravaux || 0) > 1 ? "s" : "")
          : "Pas encore évaluée. Choisis un niveau pour la planifier.") +
      "</p>";
  }

  function ouvrirModale(id) {
    var q = parId(id);
    if (!q) return;
    var modale = document.getElementById("modale");
    document.getElementById("modale-etiquette").textContent =
      PARTIES[q.partie] + (q.statut === "officiel" ? " · sujet officiel" : " · entraînement");
    document.getElementById("modale-question").textContent = q.question;
    modaleId = q.id;
    document.getElementById("modale-reponse").innerHTML = rendreReponse(q, { edition: editId === q.id, compacte: true });
    rendreNiveauxModale(q);
    if (!modale.hasAttribute("open")) {
      if (typeof modale.showModal === "function") modale.showModal();
      else modale.setAttribute("open", "");
    }
    document.getElementById("modale-reponse").scrollTop = 0;
    preparerEditeur();
  }

  function fermerModale() {
    editId = null;
    var modale = document.getElementById("modale");
    if (typeof modale.close === "function") modale.close();
    else modale.removeAttribute("open");
  }

  function afficher(nom) {
    document.querySelectorAll(".ecran").forEach(function (s) {
      s.classList.toggle("actif", s.id === "ecran-" + nom);
    });
    document.querySelectorAll(".nav__lien").forEach(function (b) {
      b.classList.toggle("actif", b.getAttribute("data-nav") === nom);
    });
    if (nom === "accueil") rendreAccueil();
    else if (nom === "seance") rendreSeance();
    else if (nom === "bilan") rendreBilan();
    else if (nom === "banque") rendreBanque();
    window.scrollTo(0, 0);
  }

  /* ---------------- interactions ---------------- */

  document.addEventListener("click", function (e) {
    var cible = e.target.closest("[data-action], [data-niveau], [data-question], [data-nav], [data-mot]");
    if (!cible) return;

    if (cible.classList.contains("trou")) {
      cible.outerHTML = "<strong>" + echapper(cible.getAttribute("data-mot")) + "</strong>";
      return;
    }

    if (cible.hasAttribute("data-nav")) {
      e.preventDefault();
      afficher(cible.getAttribute("data-nav"));
      return;
    }

    if (cible.hasAttribute("data-question")) {
      ouvrirModale(cible.getAttribute("data-question"));
      return;
    }

    if (cible.getAttribute("data-action") === "niveau-banque") {
      definirNiveau(cible.getAttribute("data-id"), cible.getAttribute("data-niveau"));
      return;
    }

    if (cible.hasAttribute("data-niveau") && cible.classList.contains("niveau")) {
      evaluer(etat.seance && etat.seance.ids[etat.seance.index], cible.getAttribute("data-niveau"));
      return;
    }

    var action = cible.getAttribute("data-action");
    if (!action) return;

    if (action === "longueur") {
      longueur = Number(cible.getAttribute("data-n")) || 5;
      rendreAccueil();
    } else if (action === "aleatoire") {
      lancerSeance("aleatoire", seanceAleatoire(Number(cible.getAttribute("data-n")) || longueur));
    } else if (action === "intelligente") {
      lancerSeance("intelligente", seanceIntelligente(longueur));
    } else if (action === "ciblee") {
      var niveau = cible.getAttribute("data-niveau");
      var questions = seanceCiblee(niveau);
      if (!questions.length) { toast("Aucune question à ce niveau pour l'instant."); return; }
      lancerSeance("ciblee", questions);
    } else if (action === "reprendre") {
      revele = false;
      afficher("seance");
    } else if (action === "trous") {
      etat.preferences.trous = !etat.preferences.trous;
      sauver();
      rafraichirReponse();
    } else if (action === "editer") {
      editId = cible.getAttribute("data-id") || null;
      if (etat.preferences && etat.preferences.trous) { etat.preferences.trous = false; sauver(); }
      rafraichirReponse();
    } else if (action === "annuler-edition") {
      editId = null;
      rafraichirReponse();
    } else if (action === "enregistrer-reponse") {
      enregistrerReponse(cible.getAttribute("data-id"));
    } else if (action === "reinitialiser-reponse") {
      if (etat.reponses) delete etat.reponses[cible.getAttribute("data-id")];
      editId = null;
      sauver();
      rafraichirReponse();
      toast("Réponse d'origine rétablie.");
    } else if (action === "partager") {
      partagerReponse(cible.getAttribute("data-id"));
    } else if (action === "reveler") {
      revele = true;
      rendreSeance();
    } else if (action === "exporter") {
      exporter();
    } else if (action === "importer") {
      importer();
    } else if (action === "drive-connecter") {
      connecterDrive();
    } else if (action === "drive-sauver") {
      sauvegarderDansDrive(false);
    } else if (action === "drive-charger") {
      chargerDepuisDrive();
    } else if (action === "suivante") {
      suivante();
    } else if (action === "quitter") {
      sauver();
      toast("Séance mise de côté : tu la reprendras où tu t'es arrêté.");
      afficher("accueil");
    } else if (action === "voir-bilan") {
      if (etat.derniereSeance) { afficher("bilan"); }
    } else if (action === "accueil") {
      afficher("accueil");
    } else if (action === "filtre") {
      filtrePartie = Number(cible.getAttribute("data-p")) || 0;
      document.querySelectorAll("[data-action='filtre']").forEach(function (b) {
        b.classList.toggle("actif", Number(b.getAttribute("data-p")) === filtrePartie);
      });
      filtrerBanque();
    } else if (action === "statut") {
      filtreStatut = cible.getAttribute("data-s");
      document.querySelectorAll("[data-action='statut']").forEach(function (b) {
        b.classList.toggle("actif", b.getAttribute("data-s") === filtreStatut);
      });
      filtrerBanque();
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "recherche-banque") {
      recherche = e.target.value;
      filtrerBanque();
    }
  });

  document.addEventListener("change", function (e) {
    if (!e.target || e.target.id !== "date-concours") return;
    var valeur = e.target.value;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valeur)) return;
    etat.concours = valeur;
    sauver();
    rendreAccueil();
    toast("Concours enregistré : " + dateCourte(valeur) + ".");
  });

  var champSauvegarde = document.getElementById("fichier-sauvegarde");
  if (champSauvegarde) {
    champSauvegarde.addEventListener("change", function () {
      traiterSauvegarde(champSauvegarde.files && champSauvegarde.files[0]);
    });
  }

  document.getElementById("modale-fermer").addEventListener("click", fermerModale);

  document.getElementById("modale").addEventListener("click", function (e) {
    if (e.target === this) fermerModale();
  });

  document.addEventListener("keydown", function (e) {
    if (editId || (e.target && e.target.isContentEditable)) return;
    var seanceActive = document.getElementById("ecran-seance").classList.contains("actif");
    if (!seanceActive) return;
    var s = etat.seance;
    if (!s || s.finie) return;
    var q = parId(s.ids[s.index]);
    if (!q) return;
    var deja = s.evaluations[q.id];

    if (e.key === " " || e.key === "Enter") {
      if (!revele && !deja) { e.preventDefault(); revele = true; rendreSeance(); }
    } else if (e.key === "1" || e.key === "2" || e.key === "3") {
      if (revele || deja) {
        e.preventDefault();
        evaluer(q.id, ["encours", "presque", "parfait"][Number(e.key) - 1]);
      }
    } else if (e.key === "ArrowRight") {
      if (deja) { e.preventDefault(); suivante(); }
    }
  });

  /* ---------------- démarrage ---------------- */

  if (!BANQUE.length) {
    document.getElementById("ecran-accueil").innerHTML =
      '<div class="page"><p class="vide">La banque de questions n\'a pas pu être chargée.</p></div>';
    return;
  }

  BANQUE.sort(function (a, b) { return a.partie - b.partie; });
  afficher("accueil");
  initDrive();
})();
