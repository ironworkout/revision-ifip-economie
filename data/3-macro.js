window.BANQUE = (window.BANQUE || []).concat([

  {
    id: "g-pib-limites",
    partie: 3,
    theme: "Indicateurs",
    statut: "entrainement",
    source: "Question d'entraînement (programme : indicateurs de mesure de l'activité)",
    question: "Que mesure le PIB et quelles sont ses limites ?",
    motsCles: ["PIB", "valeur ajoutée", "IDH", "bien-être", "déflateur"],
    reponse: [
      "Le **PIB** mesure la valeur des biens et services **finaux** produits sur un territoire pendant une période. On peut le calculer de trois façons : par la **production** (somme des valeurs ajoutées), par les **dépenses** (C + I + G + X − M) ou par les **revenus** (salaires, profits, impôts). Le PIB **nominal** est aux prix courants ; le PIB **réel** est corrigé de l'inflation par le **déflateur**, ce qui permet de mesurer une croissance en volume.",
      "Ses limites sont de quatre ordres. Il ignore les activités **non marchandes** (travail domestique, bénévolat) et une partie de l'économie souterraine. Il ne dit rien de la **répartition** : un PIB par habitant moyen peut cacher de fortes inégalités. Il ne déduit pas les **externalités négatives** (pollution, épuisement des ressources, nuisances). Enfin, il mesure un **flux** de production, pas un **stock** de patrimoine, et ne dit rien du bien-être ressenti.",
      "D'où des indicateurs complémentaires : l'**IDH** (1990), qui combine espérance de vie, scolarisation et revenu par habitant ; les indicateurs de bien-être et de santé sociale ; l'empreinte écologique et les indicateurs de soutenabilité ; le PIB **par habitant** pour les comparaisons internationales.",
      "Le PIB reste irremplaçable pour mesurer la croissance, la conjoncture et la base taxable. Mais il ne résume pas le développement : la formule à retenir est qu'« il mesure la production, pas le bien-être »."
    ]
  },

  {
    id: "g-phillips-nairu",
    partie: 3,
    theme: "Objectifs macroéconomiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : carré magique de Kaldor, courbe de Phillips)",
    question: "Expliquez la courbe de Phillips et la notion de NAIRU.",
    motsCles: ["Phillips", "NAIRU", "inflation", "chômage", "anticipations"],
    reponse: [
      "En **1958**, **Phillips** observe au Royaume-Uni une relation inverse entre le taux de chômage et l'inflation des salaires : quand le chômage baisse, les salaires accélèrent. Samuelson et Solow (1960) en font un **menu de politique économique** : on pourrait « acheter » moins de chômage par plus d'inflation.",
      "**Friedman** et **Phelps** (1968) contestent cette lecture stable. Les agents forment des **anticipations** : une relance ne réduit le chômage que si l'inflation est **inattendue**. La **courbe de Phillips augmentée** s'écrit u = un − α(π − πᵉ). Une fois les anticipations ajustées, le chômage revient à son niveau de départ et seule l'inflation a augmenté.",
      "Le **NAIRU** (taux de chômage non accélérateur de l'inflation) est ce taux de chômage compatible avec une inflation stable. En dessous, l'inflation accélère ; au-dessus, elle ralentit. Il n'est pas observable et doit être estimé, ce qui en fait un guide fragile. La désinflation a donc un coût : le **taux de sacrifice** (points de PIB perdus par point d'inflation réduit), illustré par la politique de Volcker (1979-1982).",
      "Les limites sont importantes. Le NAIRU varie avec le chômage structurel, la productivité et le taux de participation. La relation s'est affaiblie depuis les années 2010 (courbe « aplatie »). Et les chocs d'offre, comme en 1973, produisent une **stagflation** : inflation et chômage augmentent ensemble, ce que la courbe simple ne prévoit pas."
    ]
  },

  {
    id: "g-chomage",
    partie: 3,
    theme: "Marché du travail",
    statut: "entrainement",
    source: "Question d'entraînement (programme : analyse classique et keynésienne)",
    question: "Comment expliquer le chômage ? Comparez l'analyse classique et l'analyse keynésienne.",
    motsCles: ["chômage", "BIT", "salaire réel", "demande effective", "hystérèse"],
    reponse: [
      "Le **chômage** au sens du BIT désigne une personne sans emploi, disponible et en recherche active. Le taux de chômage rapporte les chômeurs à la population active. À côté, le **halo** (personnes souhaitant travailler mais non disponibles ou ne cherchant plus) et le **sous-emploi** complètent la mesure.",
      "On distingue plusieurs formes : **conjoncturel** (insuffisance de demande, lié au cycle), **structurel** (inadéquation des compétences, coût du travail, rigidités), **frictionnel** (temps de recherche et mobilité) et saisonnier. L'**hystérèse** explique qu'un chômage conjoncturel prolongé devienne structurel, par perte de capital humain et d'attachement au marché du travail.",
      "L'analyse **classique et néoclassique** voit dans le chômage un déséquilibre du marché du travail : le **salaire réel** est supérieur au salaire d'équilibre, à cause du SMIC, des cotisations ou des allocations. L'offre de travail excède la demande. Les explications complémentaires sont le **salaire d'efficience** (payer plus pour motiver), le rapport **insiders/outsiders** et les rigidités. La solution serait de flexibiliser.",
      "L'analyse **keynésienne** y voit une insuffisance de **demande effective** : les entreprises n'embauchent pas car elles n'anticipent pas de débouchés, et les salaires rigides empêchent l'ajustement. L'État doit soutenir la demande. Les deux lectures sont complémentaires : la première explique le chômage structurel, la seconde le chômage conjoncturel. Le coût du travail n'est d'ailleurs pas le seul déterminant : la productivité et la qualité des emplois comptent autant."
    ]
  },

  {
    id: "g-consommation",
    partie: 3,
    theme: "Les grandes fonctions",
    statut: "entrainement",
    source: "Question d'entraînement (programme : consommation, épargne)",
    question: "Quels sont les déterminants de la consommation des ménages ?",
    motsCles: ["consommation", "Keynes", "revenu permanent", "cycle de vie", "épargne"],
    reponse: [
      "La **consommation** des ménages représente environ la moitié du PIB en France. Elle dépend du revenu, mais les économistes en donnent des explications différentes, qui éclairent chacune une partie des faits.",
      "**Keynes** (1936) énonce la **loi psychologique fondamentale** : quand le revenu augmente, la consommation augmente moins vite. La **propension marginale à consommer** est comprise entre 0 et 1, et la propension moyenne diminue avec le revenu. **Friedman** répond que la consommation dépend du **revenu permanent**, c'est-à-dire du revenu attendu sur longue période : un revenu temporaire est épargné. **Modigliani** ajoute l'**hypothèse du cycle de vie** : on épargne pendant la vie active pour désépargner à la retraite, ce qui fait dépendre la consommation du patrimoine et de la démographie. **Duesenberry** décrit l'**effet de cliquet** : la consommation résiste à la baisse, par habitude et comparaison sociale.",
      "D'autres déterminants comptent : le **taux d'intérêt** réel, la **richesse** (effet de richesse immobilière et financière), l'accès au crédit, la confiance des ménages et l'inflation. Le taux d'épargne varie ainsi fortement selon le contexte.",
      "Ces théories ont des conséquences concrètes. Une baisse temporaire du revenu, comme pendant le confinement de 2020, est peu suivie par la consommation : elle se traduit par une **épargne forcée**. Une relance par transferts est d'autant plus efficace que les ménages sont **contraints de liquidité**, car ils consomment alors l'essentiel du revenu reçu."
    ]
  },

  {
    id: "g-investissement",
    partie: 3,
    theme: "Les grandes fonctions",
    statut: "entrainement",
    source: "Question d'entraînement (programme : investissement)",
    question: "Quels sont les déterminants de l'investissement des entreprises ?",
    motsCles: ["investissement", "FBCF", "accélérateur", "q de Tobin", "taux d'intérêt"],
    reponse: [
      "L'**investissement** (formation brute de capital fixe) est l'achat de biens durables destinés à produire : machines, bâtiments, logiciels, dépenses de R&D. Il représente environ un cinquième du PIB et il est **plus volatil** que lui, car il dépend d'anticipations.",
      "Ses déterminants sont de quatre ordres. Le **coût du capital** : taux d'intérêt réel, fiscalité, conditions de crédit. La **demande anticipée** : c'est l'**effet d'accélérateur**, l'investissement dépend de la variation de la demande et non de son niveau. La **rentabilité** et l'**autofinancement** : une entreprise contrainte financièrement investit moins, même si le projet est rentable. Enfin, l'**incertitude** et les **animal spirits** de Keynes : quand les perspectives sont floues, on reporte.",
      "Deux outils complètent l'analyse. Le **q de Tobin** compare la valeur boursière de l'entreprise au coût de remplacement de son capital : on investit si q > 1. L'**efficacité marginale du capital** compare le rendement attendu au taux d'intérêt.",
      "L'investissement a un double effet : effet de **demande** à court terme et effet d'**offre** à long terme, par l'augmentation des capacités et de la productivité. Il est **procyclique**, ce qui amplifie les cycles (accélérateur financier). Les politiques publiques agissent par le taux d'intérêt, le crédit d'impôt, l'amortissement ou la stabilité de la règle. Leur limite est connue : si les perspectives sont mauvaises, une baisse des taux ne suffit pas — « on ne peut pas pousser sur une ficelle »."
    ]
  },

  {
    id: "g-multiplicateur",
    partie: 3,
    theme: "Le keynésianisme",
    statut: "entrainement",
    source: "Question d'entraînement (programme : multiplicateur keynésien)",
    question: "Expliquez le mécanisme du multiplicateur keynésien et ses limites.",
    motsCles: ["multiplicateur", "propension à consommer", "fuites", "relance"],
    reponse: [
      "Le **multiplicateur keynésien** désigne l'effet amplifié d'une dépense autonome sur le revenu national. Une hausse de la dépense publique augmente le revenu de ses bénéficiaires, qui en consomment une partie ; cette consommation devient le revenu d'autres agents, qui en consomment à leur tour, et ainsi de suite.",
      "La formule est **k = 1/(1 − c)** en économie fermée sans impôt, où c est la **propension marginale à consommer**. On a alors **ΔY = k × ΔDépense**. Si c = 0,8, k = 5 : 1 milliard de dépense produit 5 milliards de revenu. En économie ouverte avec un taux d'imposition t et une propension à importer m, **k = 1/(1 − c(1 − t) + m)** : avec c = 0,8, t = 0,3 et m = 0,2, k ≈ 2,1.",
      "Trois **fuites** réduisent le multiplicateur : l'**épargne**, les **impôts** et les **importations**. C'est pourquoi une dépense publique directe (commande, investissement) a plus d'effet qu'un transfert, dont une partie est épargnée, et pourquoi le multiplicateur est plus faible dans une petite économie ouverte.",
      "Ses limites expliquent les controverses. Si les capacités de production sont saturées, la relance se traduit par de l'**inflation** et des importations. Les anticipations peuvent annuler l'effet (**équivalence ricardienne**) et la hausse des taux produire un **effet d'éviction**. Les **délais** de décision et de mise en œuvre arrivent souvent trop tard. Enfin, le **multiplicateur d'austérité** a été sous-estimé en Grèce (2010-2013) : la contraction y a été plus forte que prévu."
    ]
  },

  {
    id: "g-eviction",
    partie: 3,
    theme: "Politiques macroéconomiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : IS-LM, policy-mix)",
    question: "Qu'est-ce que l'effet d'éviction ?",
    motsCles: ["éviction", "IS-LM", "taux d'intérêt", "Mundell-Fleming"],
    reponse: [
      "L'**effet d'éviction** désigne la réduction de l'investissement privé provoquée par une hausse des dépenses publiques. La dépense publique ne s'ajoute donc pas entièrement à l'activité : elle prend en partie la place de dépenses privées.",
      "Le mécanisme se lit dans le modèle **IS-LM** (Hicks, 1937). La relance déplace la courbe **IS** vers la droite. Le revenu augmente, donc la demande de monnaie augmente ; à offre de monnaie fixe, le **taux d'intérêt** monte. L'investissement privé, qui dépend négativement du taux, baisse. L'effet final est plus faible que le multiplicateur simple.",
      "Trois configurations sont à distinguer, et c'est ce qui fait la valeur analytique du modèle. Si **LM est horizontale** (trappe à liquidité), le taux ne bouge pas : l'éviction est nulle et la relance est pleinement efficace. Si **LM est verticale** (vision monétariste), toute la relance est évincée : seuls les prix augmentent. Entre les deux, l'éviction est partielle.",
      "En **économie ouverte** (Mundell-Fleming), l'éviction peut être externe. Avec des changes flottants et une mobilité des capitaux, la relance attire les capitaux, la monnaie s'apprécie et les exportations baissent. L'éviction dépend aussi du degré d'utilisation des capacités : elle est faible quand le chômage est élevé. Et une dépense publique **productive** (infrastructures, éducation) peut au contraire stimuler l'investissement privé : c'est le **crowding-in**."
    ]
  },

  {
    id: "g-stabilisateurs",
    partie: 3,
    theme: "Politique budgétaire",
    statut: "entrainement",
    source: "Question d'entraînement (programme : politique budgétaire)",
    question: "Quels sont les stabilisateurs automatiques et quel est leur intérêt ?",
    motsCles: ["stabilisateurs automatiques", "solde structurel", "contracyclique", "budget"],
    reponse: [
      "Les **stabilisateurs automatiques** sont les mécanismes budgétaires qui agissent **sans décision nouvelle** : impôt sur le revenu progressif, cotisations sociales, allocations chômage, minima sociaux, subventions. Ils amortissent le cycle sans intervention discrétionnaire.",
      "Leur fonctionnement est contracyclique. En **récession**, les revenus baissent, donc les recettes fiscales diminuent, tandis que les dépenses d'indemnisation augmentent : le solde public se dégrade et soutient la demande. En **expansion**, l'inverse se produit : les recettes montent, les dépenses baissent, ce qui freine la surchauffe. L'impôt progressif et l'assurance chômage sont les deux plus puissants.",
      "Leur intérêt est triple : la **rapidité** (aucun délai de décision ni de mise en œuvre), l'**automaticité** (pas de choix politique à chaud) et le **ciblage** (ils soutiennent d'abord les ménages les plus touchés, qui consomment le plus). Ils réduisent l'amplitude du cycle et expliquent une partie des variations du déficit.",
      "Ils ont des limites. Ils ne corrigent pas un choc **permanent** ni le chômage structurel. Ils ne suffisent pas dans une récession profonde, où une relance discrétionnaire est nécessaire. Et ils peuvent créer un **déficit structurel** si les dépenses deviennent durables. D'où la distinction entre **solde conjoncturel** (lié à l'écart de production) et **solde structurel** (hors effet du cycle), ce dernier seul mesurant l'effort réel — et seul visé par les règles européennes."
    ]
  },

  {
    id: "g-dette-soutenabilite",
    partie: 3,
    theme: "Politique budgétaire",
    statut: "entrainement",
    source: "Question d'entraînement (programme : dette publique)",
    question: "À quelles conditions la dette publique est-elle soutenable ?",
    motsCles: ["dette publique", "effet boule de neige", "solde primaire", "soutenabilité"],
    reponse: [
      "La **dette publique** est le stock des emprunts accumulés par les administrations publiques ; le **déficit** est le flux annuel qui l'alimente. On juge la situation par le ratio **dette/PIB**, et non par le montant brut.",
      "Sa dynamique obéit à l'**effet boule de neige**. Le ratio augmente si le taux d'intérêt **i** dépasse le taux de croissance **g**, car la dette croît plus vite que l'économie. On écrit approximativement : variation du ratio ≈ (i − g) × dette/PIB − **solde primaire** (solde hors intérêts). Si i < g, la croissance « efface » une partie de la dette ; si le solde primaire est excédentaire, elle se réduit.",
      "La **soutenabilité** est donc la capacité à dégager, durablement, un solde primaire suffisant pour stabiliser puis réduire le ratio. Elle dépend de la croissance, de l'inflation, du niveau des taux et de la **crédibilité** : un pays qui inspire confiance emprunte à un taux faible ; un pays qui doute paie une prime de risque, ce qui aggrave la boucle.",
      "En France, la dette dépasse **3 000 milliards d'euros**, de l'ordre de 115 % du PIB, et le déficit a dépassé 5 % du PIB en 2024-2025, ce qui a ouvert une procédure européenne de déficit excessif. La charge d'intérêts est devenue un poste majeur de dépense. Les limites du raisonnement doivent être rappelées : le seuil de 90 % de Reinhart et Rogoff est contesté, et une austérité trop rapide peut être contre-productive, comme l'a montré le cas grec."
    ]
  },

  {
    id: "g-regle-or-tscg",
    partie: 3,
    theme: "Politiques en UEM",
    statut: "officiel",
    source: "Sujet zéro officiel 2026, QRC n° 3",
    question: "Quels sont les objectifs et les limites de la « règle d'or » issue du TSCG, selon laquelle le déficit public structurel d'un pays membre de l'UEM ne doit pas dépasser 0,5 % de son PIB ?",
    motsCles: ["TSCG", "règle d'or", "déficit structurel", "discipline budgétaire", "UEM"],
    reponse: [
      "Le **TSCG** (traité sur la stabilité, la coordination et la croissance), signé en **2012**, oblige les États membres de l'Union à inscrire dans leur droit une **règle d'or** : le **déficit structurel** ne doit pas dépasser **0,5 % du PIB**. Le seuil est porté à 1 % lorsque la dette est inférieure à 60 % du PIB et que le risque de soutenabilité est faible.",
      "Cette règle naît dans un contexte précis : la crise de la zone euro de 2010-2012, la hausse brutale des déficits et des dettes, et la défiance des marchés. Elle poursuit plusieurs **objectifs** : contraindre les États à financer leurs dépenses par leurs recettes et à limiter le recours à l'emprunt ; renforcer la confiance des investisseurs et maintenir des taux d'intérêt bas ; inciter les administrations à rationaliser leur fonctionnement ; limiter les **externalités négatives** qu'un endettement national fait peser sur ses partenaires, puisque la monnaie est commune.",
      "Ses **limites** sont techniques et économiques. La frontière entre déficit **structurel** et déficit **conjoncturel** est difficile à établir, car la production potentielle n'est pas observable. La règle bride les politiques **contracycliques** au moment où elles sont le plus utiles. L'ajustement peut passer par une baisse brutale des dépenses ou une hausse des prélèvements, avec un effet récessif. Enfin, sa lisibilité démocratique est faible.",
      "Il faut rappeler que les règles budgétaires ont été **suspendues de 2020 à 2023** (Covid-19, guerre en Ukraine) et sont de nouveau en vigueur depuis **2024**, dans un cadre réformé où la trajectoire de **dépenses nettes** joue un rôle central."
    ]
  },

  {
    id: "g-canaux-monetaires",
    partie: 3,
    theme: "Politique monétaire",
    statut: "entrainement",
    source: "Question d'entraînement (programme : politique monétaire, policy-mix)",
    question: "Par quels canaux la politique monétaire agit-elle sur l'économie ?",
    motsCles: ["canaux de transmission", "taux d'intérêt", "crédit", "anticipations"],
    reponse: [
      "La politique monétaire ne modifie pas directement la dépense : elle la modifie par des **canaux de transmission**, qui agissent avec des délais variables. Les identifier permet d'expliquer pourquoi une même décision produit des effets différents selon les pays et les périodes.",
      "Le premier est le **canal des taux d'intérêt**. La banque centrale fixe ses taux directeurs ; ils se transmettent aux taux de marché, puis aux crédits. L'investissement et la consommation sensibles au taux varient, ainsi que le prix des actifs.",
      "Le deuxième est le **canal du crédit**. Une politique restrictive renchérit et raréfie les réserves, dégrade la qualité des bilans bancaires et réduit l'offre de crédit : c'est l'**accélérateur financier**. Ce canal explique que les PME dépendantes des banques réagissent plus fortement. Le troisième est le **canal des prix d'actifs** : des taux bas font monter les actions et l'immobilier, ce qui accroît la richesse des ménages et leur consommation (**effet de richesse**).",
      "Le quatrième est le **canal du taux de change** : une baisse des taux provoque une dépréciation, qui améliore la compétitivité-prix des exportations. Le cinquième est le **canal des anticipations** : la **forward guidance** et la crédibilité ancrent les anticipations d'inflation, ce qui pèse sur les taux longs et les salaires.",
      "Les limites sont réelles : transmission inégale au sein de la zone euro (fragmentation financière), plancher des taux, **trappe à liquidité**, effets redistributifs entre débiteurs et créanciers, et risque de bulles sur les actifs."
    ]
  },

  {
    id: "g-non-conventionnelles",
    partie: 3,
    theme: "Politique monétaire",
    statut: "officiel",
    source: "Sujet zéro officiel 2026, QRC n° 1",
    question: "En quoi les politiques monétaires non conventionnelles ont-elles favorisé la formation de bulles spéculatives ?",
    motsCles: ["QE", "taux négatifs", "bulles", "recherche de rendement", "BCE"],
    reponse: [
      "À partir de **2008**, les taux directeurs étant proches de zéro, les banques centrales ont eu recours à des instruments **non conventionnels** : taux négatifs, **forward guidance**, opérations ciblées de refinancement de long terme (LTRO, TLTRO) et achats massifs de titres, le **quantitative easing**. Leur nature a pu favoriser la formation de bulles, pour trois raisons principales.",
      "D'abord, elles ont fait **baisser les taux d'intérêt à long terme** et les primes de terme. Les emprunts sont devenus moins coûteux et les actifs sûrs beaucoup moins rémunérateurs. Les investisseurs, à la recherche de rendement (« search for yield »), se sont tournés vers des actifs plus risqués — actions, immobilier, dette à haut rendement — dont les prix ont été poussés au-delà de leur valeur fondamentale.",
      "Ensuite, elles ont augmenté la **liquidité** et facilité l'accès au crédit, ce qui a encouragé le **levier** et la prise de risque. Enfin, la **forward guidance** et l'engagement à « faire tout ce qui est nécessaire » ont créé un sentiment de complaisance : les marchés ont pu croire que la banque centrale interviendrait à chaque baisse significative (le « put » implicite), ce qui réduit la perception du risque et encourage l'**aléa moral**.",
      "L'ensemble a donc pu alimenter des bulles sur les actions, l'immobilier ou les crypto-actifs, avec un risque de correction brutale. Il faut toutefois nuancer : ces politiques ont aussi évité une spirale déflationniste, et le lien de causalité avec les bulles est difficile à isoler. C'est précisément pour cela que la **régulation macroprudentielle** a été renforcée."
    ]
  },

  {
    id: "g-uem",
    partie: 3,
    theme: "Politiques en UEM",
    statut: "entrainement",
    source: "Question d'entraînement (programme : politiques macroéconomiques en UEM)",
    question: "Pourquoi l'union économique et monétaire impose-t-elle une coordination des politiques budgétaires ?",
    motsCles: ["UEM", "zone monétaire optimale", "chocs asymétriques", "Pacte de stabilité"],
    reponse: [
      "L'**UEM** repose sur une **monnaie unique** — l'euro, en circulation scripturale depuis **1999**, avec **21 États membres** depuis 2026 — et sur une **politique monétaire unique** confiée à la BCE. Les politiques budgétaires, en revanche, restent **nationales**. Ce déséquilibre impose la coordination.",
      "Trois raisons le justifient. Les **effets de débordement** : la relance ou l'endettement excessif d'un État affecte les autres par les taux d'intérêt, la demande adressée et la crédibilité de la monnaie commune. Les **chocs asymétriques** : un choc qui touche un seul pays ne peut pas être absorbé par une baisse du taux de change ni par une politique monétaire adaptée. Enfin la crédibilité : sans discipline, la monnaie commune serait affaiblie.",
      "Le cadre repose donc sur des règles et des institutions : **critères de Maastricht** (déficit ≤ 3 % du PIB, dette ≤ 60 %), **Pacte de stabilité et de croissance** (1997), **TSCG** (2012), **semestre européen**, **MES**, **union bancaire** et plan de relance **Next Generation EU** (2020).",
      "Le débat théorique porte sur la **zone monétaire optimale** (Mundell, 1961) : mobilité du travail, flexibilité des prix et des salaires, fédéralisme budgétaire, assurance chômage commune. La zone euro ne réunit pas toutes ces conditions, d'où les propositions d'un budget de la zone. Le **triangle d'incompatibilité** rappelle enfin qu'on ne peut pas avoir simultanément changes fixes, libre circulation des capitaux et autonomie monétaire. Les limites du cadre sont connues : règles peu respectées, **procyclicité** et légitimité démocratique faible."
    ]
  },

  {
    id: "g-inegalites",
    partie: 3,
    theme: "Répartition et redistribution",
    statut: "entrainement",
    source: "Question d'entraînement (programme : courbe de Lorenz, indice de Gini)",
    question: "Comment mesure-t-on les inégalités et comment la redistribution les réduit-elle ?",
    motsCles: ["Lorenz", "Gini", "redistribution", "progressivité", "Okun"],
    reponse: [
      "Les inégalités se mesurent d'abord par la **courbe de Lorenz**, qui représente la part cumulée du revenu détenue par x % de la population. Plus elle s'écarte de la diagonale d'égalité parfaite, plus les inégalités sont fortes. L'**indice de Gini** en est la synthèse : il vaut 0 pour une égalité parfaite et 1 pour une inégalité totale. On utilise aussi le **rapport interdécile** (D9/D1) et le **taux de pauvreté**, fixé à 60 % du niveau de vie médian.",
      "En France, le Gini des **revenus disponibles** est d'environ **0,30** (Insee, 2024), contre **0,38** avant redistribution : la redistribution réduit donc sensiblement les inégalités. Les inégalités de **patrimoine** restent beaucoup plus fortes que celles de revenus, et le taux de pauvreté avoisine 15 %.",
      "La **redistribution** prend trois formes. **Verticale** : des hauts revenus vers les bas, par l'impôt progressif et les prestations sous condition de ressources. **Horizontale** : compensation de charges familiales ou de santé, à revenu égal. **Élargie** : accès aux services collectifs (école, santé, transports), qui compte autant que les transferts monétaires. Les prélèvements obligatoires représentent de l'ordre de 43 % du PIB, un niveau élevé en comparaison internationale.",
      "L'arbitrage est celui de **Okun** entre équité et efficacité : une redistribution trop forte peut réduire l'incitation au travail et à l'investissement, et la **courbe de Laffer** rappelle qu'au-delà d'un certain taux l'impôt rapporte moins. Mais des inégalités excessives nuisent aussi à la croissance et à la cohésion sociale. La mesure elle-même a des limites : le Gini ne dit rien de la **mobilité** sociale ni du patrimoine, et les niches fiscales réduisent la progressivité réelle."
    ]
  },

  {
    id: "g-cycles",
    partie: 3,
    theme: "Cycles et chocs",
    statut: "entrainement",
    source: "Question d'entraînement (programme : théorie des cycles et grands chocs)",
    question: "Quelles sont les phases d'un cycle économique et quels grands chocs l'ont marqué depuis 1929 ?",
    motsCles: ["cycle", "Kitchin", "Juglar", "1929", "1973", "2008", "2020"],
    reponse: [
      "Le **cycle économique** est la succession de phases d'accélération et de ralentissement autour de la **croissance tendancielle**. On distingue quatre phases : **expansion**, **essor** (surchauffe), **retournement** (crise) et **récession**, puis reprise.",
      "Les économistes en ont identifié plusieurs durées : les cycles **Kitchin** (3 à 4 ans, liés aux stocks), **Juglar** (8 à 10 ans, liés à l'investissement) et **Kondratieff** (40 à 60 ans, liés aux grandes innovations). **Schumpeter** relie ces mouvements à la **destruction créatrice** : les innovations créent de nouveaux marchés et détruisent les anciens.",
      "Quatre chocs majeurs structurent la période. **1929** : krach boursier, **déflation par la dette** (Fisher, 1933), Grande Dépression, qui inspire la *Théorie générale* de Keynes (1936). **1973 et 1979** : chocs pétroliers, **stagflation**, fin des Trente Glorieuses et remise en cause du keynésianisme. **2007-2009** : crise des subprimes, contagion financière, Grande Récession, retour de Minsky et des politiques non conventionnelles. **2020** : pandémie, choc d'offre **et** de demande simultanés, récession brutale puis rebond soutenu par les États.",
      "Les réponses publiques combinent politiques **contracycliques** (budgétaire, monétaire), filets de sécurité et régulation macroprudentielle. Leur limite tient à la nature du choc : un choc d'offre ne se traite pas comme un choc de demande, et une action tardive ou procyclique peut aggraver la récession."]
  },

  {
    id: "g-carre-magique",
    partie: 3,
    theme: "Objectifs macroéconomiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : carré magique de Kaldor)",
    question: "Qu'est-ce que le carré magique de Kaldor et quels conflits d'objectifs révèle-t-il ?",
    motsCles: ["Kaldor", "carré magique", "croissance", "chômage", "inflation", "équilibre extérieur"],
    reponse: [
      "Le **carré magique** est une représentation graphique proposée par **Nicholas Kaldor** (1971) pour visualiser la performance macroéconomique d'un pays. Sur quatre axes, on place la **croissance** du PIB, le **taux de chômage**, le **taux d'inflation** et le **solde de la balance courante**.",
      "Chaque axe est gradué de façon que le sens favorable soit le plus éloigné du centre. En reliant les quatre points, on obtient un quadrilatère : plus il est grand, meilleure est la situation économique. Un carré parfait correspondrait à une performance idéale, ce qui explique le nom, même si la figure est en pratique un losange irrégulier.",
      "Son intérêt est de révéler les **conflits** entre objectifs. La **courbe de Phillips** montre l'arbitrage entre chômage et inflation : une relance réduit le chômage mais accélère les prix. La croissance et l'**équilibre extérieur** s'opposent aussi, car une demande forte attire les importations et dégrade la balance courante. Un pays peut donc améliorer un côté du carré en en dégradant un autre : c'est tout le problème du **policy-mix**.",
      "Ses limites doivent être précisées : la courbe de Phillips s'est affaiblie depuis les années 2010, le poids relatif des quatre objectifs n'est pas neutre, et le PIB ne mesure pas le bien-être. Le carré reste néanmoins un outil pédagogique efficace pour présenter un **diagnostic conjoncturel** en quelques secondes."
    ]
  },

  {
    id: "g-statistiques",
    partie: 3,
    theme: "Outils statistiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : paramètres de position, de dispersion et de variation)",
    question: "Comment calcule-t-on et interprète-t-on un taux de variation, un indice et un coefficient multiplicateur ?",
    motsCles: ["taux de variation", "indice base 100", "coefficient multiplicateur", "moyenne", "médiane", "écart-type"],
    reponse: [
      "Ces trois outils mesurent la même évolution, mais ne se lisent pas de la même façon. Soit une valeur qui passe de **250 à 300**. Le **taux de variation** vaut (300 − 250) / 250 × 100 = **+20 %**. Le **coefficient multiplicateur** est le rapport final : 300 / 250 = **1,2**, soit 1 + 20 %. L'**indice base 100** rapporte la période finale à la période de référence : 300 / 250 × 100 = **120**.",
      "La règle essentielle est que les évolutions se **multiplient**, elles ne s'additionnent pas. Une hausse de 10 % suivie d'une hausse de 5 % donne 1,10 × 1,05 = 1,155, soit **+15,5 %** et non +15 %. Symétriquement, une baisse de 50 % exige une hausse de 100 % pour revenir au point de départ : c'est l'**asymétrie** des pourcentages, source d'erreur fréquente.",
      "Les paramètres de position et de dispersion complètent l'analyse. La **moyenne** résume l'ensemble mais reste sensible aux valeurs extrêmes ; la **médiane**, qui sépare la population en deux, y résiste mieux et sert pour les revenus. L'**écart-type** mesure la dispersion autour de la moyenne : deux pays de même revenu moyen peuvent avoir des inégalités très différentes.",
      "À l'écrit, il faut **détailler le calcul** et éviter deux pièges : les points de pourcentage, qui ne sont pas des pourcentages — passer de 8 % à 10 % de chômage, c'est +2 points et +25 % — et la distinction entre **valeur** et **volume**, c'est-à-dire entre une évolution en euros courants et une évolution corrigée de l'inflation."
    ]
  }

]);
