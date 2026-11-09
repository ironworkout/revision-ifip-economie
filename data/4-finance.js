window.BANQUE = (window.BANQUE || []).concat([

  {
    id: "f-fonctions-monnaie",
    partie: 4,
    theme: "La monnaie",
    statut: "entrainement",
    source: "Question d'entraînement (programme : formes et fonctions de la monnaie)",
    question: "Quelles sont les fonctions de la monnaie et comment la mesure-t-on ?",
    motsCles: ["monnaie", "unité de compte", "réserve de valeur", "M1", "agrégats"],
    reponse: [
      "La **monnaie** est l'ensemble des moyens de paiement acceptés dans une économie. Elle remplit trois fonctions, qui n'ont pas le même statut.",
      "Elle est **unité de compte** : elle permet de mesurer la valeur des biens et de comparer des prix entre eux. Elle est **intermédiaire des échanges** : elle évite le troc et la **double coïncidence des besoins**, c'est-à-dire la nécessité que deux personnes veuillent exactement ce que l'autre possède. C'est cette fonction qui définit la monnaie. Elle est enfin **réserve de valeur** : elle transporte du pouvoir d'achat dans le temps, mais l'inflation l'érode, ce qui la met en concurrence avec les actifs financiers et l'immobilier.",
      "Ses formes ont évolué : monnaie marchandise (or, sel), **fiduciaire** (billets et pièces), **scripturale** (dépôts en compte), puis électronique. On distingue la **monnaie centrale** (billets et réserves des banques) de la **monnaie bancaire** (dépôts créés par les crédits). Les **agrégats** la mesurent : **M1** (billets et dépôts à vue), **M2** (plus les dépôts à terme jusqu'à deux ans), **M3** (plus les instruments négociables et les parts d'OPC monétaires).",
      "Trois notions juridiques complètent l'analyse : le **cours légal** (la monnaie doit être acceptée), le **cours forcé** (elle n'est plus convertible en or) et le **pouvoir libératoire** (elle éteint une dette). Les **crypto-actifs** posent une question nouvelle : une monnaie sans banque centrale, sans cours légal et très volatile peut-elle remplir les trois fonctions ? Aujourd'hui, elle remplit mal l'unité de compte et la réserve de valeur."
    ]
  },

  {
    id: "f-creation-monetaire",
    partie: 4,
    theme: "Création monétaire",
    statut: "entrainement",
    source: "Question d'entraînement (programme : création monétaire)",
    question: "Comment la monnaie est-elle créée ?",
    motsCles: ["création monétaire", "crédit", "monnaie centrale", "endogénéité", "réserves"],
    reponse: [
      "La monnaie est créée principalement par les **banques commerciales**, selon la formule « **les crédits font les dépôts** ». Lorsqu'une banque accorde un crédit, elle inscrit simultanément une créance à son actif et un dépôt au passif : elle crée de la monnaie scripturale, sans avoir besoin d'un dépôt préalable.",
      "La création n'est pas pour autant illimitée. La banque doit se procurer de la **monnaie centrale** pour faire face aux **fuites** : retraits en billets, règlements entre banques, réserves obligatoires. Elle l'obtient sur le **marché interbancaire** (au taux €STR) ou auprès de la banque centrale, qui refinance au taux directeur. La banque centrale contrôle donc le **coût** de la monnaie centrale, et indirectement le volume de crédit.",
      "Le vieux **multiplicateur de crédit** (M = m × réserves) est aujourd'hui rejeté : il suppose que les réserves déterminent le crédit, alors que la causalité est inverse. La monnaie est **endogène** : elle résulte de la demande de crédit des agents et de la décision des banques de prêter, dans le cadre fixé par la politique monétaire et la régulation prudentielle.",
      "Les limites sont donc économiques et réglementaires : la création dépend de la **demande de crédit**, de la solvabilité des emprunteurs et des **ratios de fonds propres**. Elle peut alimenter l'inflation et les bulles d'actifs, ce qui justifie la supervision et les coussins de capital. Elle peut aussi se contracter brutalement en crise : c'est le **credit crunch**."
    ]
  },

  {
    id: "f-inflation-theories",
    partie: 4,
    theme: "Inflation",
    statut: "entrainement",
    source: "Question d'entraînement (programme : théorie quantitative et keynésienne)",
    question: "Comparez la théorie quantitative et la théorie keynésienne de la monnaie.",
    motsCles: ["inflation", "Fisher", "quantitative", "Keynes", "coûts"],
    reponse: [
      "L'**inflation** est la hausse durable et généralisée des prix, mesurée par l'IPC ou, dans la zone euro, par l'**IPCH**. Les deux grandes théories s'opposent sur son origine.",
      "La **théorie quantitative** part de l'**équation des échanges** de Fisher : **M × V = P × Y**, où M est la masse monétaire, V la vitesse de circulation, P le niveau des prix et Y la production réelle. Si V et Y sont stables, une hausse de M se traduit par une hausse de P. Friedman en tire sa formule célèbre : « l'inflation est toujours et partout un phénomène monétaire ». La théorie est plus ancienne que Fisher : Bodin et Hume l'avaient formulée ; Fisher en donne l'équation.",
      "La théorie **keynésienne** conteste la stabilité de V et l'idée d'une monnaie neutre. L'inflation peut venir de la **demande** (demande supérieure à l'offre, écart de production), des **coûts** (salaires, matières premières, marges) ou des **conflits de répartition**. La monnaie est demandée pour elle-même (**préférence pour la liquidité**) et peut rester inactive, notamment dans une **trappe à liquidité**.",
      "La synthèse retient que, à court terme, la demande et les chocs d'offre dominent ; à long terme, la monnaie. Deux cas extrêmes montrent les conséquences : l'**hyperinflation** (Cagan : plus de 50 % par mois) détruit la monnaie et l'économie ; la **déflation** aggrave les dettes et nourrit la récession, comme l'a montré Fisher en 1933."
    ]
  },

  {
    id: "f-effets-inflation",
    partie: 4,
    theme: "Inflation",
    statut: "entrainement",
    source: "Question d'entraînement (programme : politique monétaire et inflation)",
    question: "Quels sont les effets de l'inflation sur l'économie ?",
    motsCles: ["inflation", "redistribution", "illusion monétaire", "effet Fisher", "compétitivité"],
    reponse: [
      "Les effets de l'inflation dépendent de son **ampleur** et de sa **prévisibilité**. Une inflation modérée et anticipée ne bouleverse pas les comportements ; une inflation forte et imprévisible en modifie les fondements.",
      "Le premier effet est **redistributif**. L'inflation favorise les **débiteurs**, dont la dette se déprécie en valeur réelle, et pénalise les **créanciers** et les épargnants. Les revenus **indexés** (SMIC, retraites de base) sont protégés, les autres non. Les ménages modestes, qui consomment une part plus élevée de leur revenu et subissent davantage les prix alimentaires et énergétiques, sont souvent les plus touchés.",
      "Le deuxième effet porte sur les **décisions**. L'**illusion monétaire** conduit à confondre hausse nominale et hausse réelle des revenus. Les **coûts de menu** (modifier les prix) et l'incertitude découragent l'investissement de long terme. L'**effet Fisher** pousse les taux d'intérêt nominaux à intégrer l'inflation anticipée. Une inflation supérieure à celle des partenaires dégrade la **compétitivité-prix** et le taux de change réel. Enfin, une spirale **prix-salaires** peut s'installer si chacun indexe ses revenus.",
      "Une inflation faible (autour de **2 %**) est généralement jugée souhaitable : elle laisse une marge pour baisser les taux réels et permet les ajustements de prix relatifs. À l'inverse, l'**hyperinflation** détruit la monnaie, et la **déflation** est tout aussi dangereuse, car elle alourdit les dettes et alimente la récession."
    ]
  },

  {
    id: "f-financement",
    partie: 4,
    theme: "Financement de l'économie",
    statut: "entrainement",
    source: "Question d'entraînement (programme : financement de l'économie)",
    question: "Qu'est-ce que la désintermédiation financière ?",
    motsCles: ["finance directe", "finance indirecte", "désintermédiation", "titrisation", "3 D"],
    reponse: [
      "Le **financement de l'économie** distingue deux circuits. Dans la **finance indirecte**, les banques collectent l'épargne et accordent des crédits : elles portent le risque et transforment les horizons. Dans la **finance directe**, les agents se financent sur les marchés en émettant des actions ou des obligations, auprès d'investisseurs.",
      "La **désintermédiation** est le transfert progressif du financement du bilan des banques vers les marchés. Elle s'inscrit dans les **trois D** qui ont transformé la finance à partir des années 1980 : **décloisonnement** (ouverture des marchés), **déréglementation** et **désintermédiation**. Ses moteurs sont la libéralisation des mouvements de capitaux, les innovations (titrisation, produits dérivés), les besoins croissants des États et des grandes entreprises, et la concurrence internationale.",
      "Les banques ne disparaissent pas : elles changent de rôle. Elles **originent** les crédits, les **titrisent** (les regroupent en titres revendus), les placent et les conseillent. L'**intermédiation** conserve trois fonctions : transformer l'épargne courte en financement long, sélectionner et surveiller les emprunteurs, créer de la liquidité.",
      "Les avantages sont un financement plus large et moins cher pour les grands émetteurs. Les risques sont réels : la **titrisation** rend les bilans opaques et transfère le risque sans le supprimer, ce qui a joué un rôle central en 2008 ; l'activité se déplace vers la **finance parallèle** (shadow banking), moins régulée. C'est pourquoi la régulation **macroprudentielle** suit désormais l'ensemble des financements, et pas seulement les banques."
    ]
  },

  {
    id: "f-separation-banques",
    partie: 4,
    theme: "Stabilité financière",
    statut: "officiel",
    source: "Sujet officiel de la session 2026, QRC n° 4",
    question: "Pourquoi la séparation « banque de dépôt (ou de détail) / banque d'affaires » est-elle justifiée face aux crises financières ?",
    motsCles: ["séparation bancaire", "Glass-Steagall", "aléa moral", "risque systémique"],
    reponse: [
      "La **séparation bancaire** consiste à isoler les activités de **banque de détail** — collecte des dépôts, crédit aux ménages et aux PME — des activités de **banque d'affaires** ou de marché : émission de titres, conseil, trading pour compte propre. Elle a été instaurée aux États-Unis par le **Glass-Steagall Act** (1933), assouplie en 1999, partiellement rétablie par la **règle Volcker** (2010) ; en France, la **loi de séparation bancaire de 2013** oblige à filialiser les activités spéculatives.",
      "Trois justifications principales sont avancées. D'abord, **protéger les dépôts** : ils sont garantis par l'État et constituent la monnaie de l'économie ; il est illégitime de les exposer à des paris de marché. Ensuite, éviter les **conflits d'intérêts** : une banque qui conseille et place en même temps peut être tentée d'écouler des produits risqués auprès de ses clients. Enfin, limiter le **risque systémique** et l'**aléa moral** : une banque « too big to fail » qui sait qu'elle sera sauvée prend davantage de risques, et ses pertes de marché peuvent contaminer le crédit à l'économie entière.",
      "Les limites doivent être présentées. La **banque universelle** réalise des économies de gamme et diversifie ses risques ; la séparation peut déplacer l'activité vers la **finance parallèle** ; les entités séparées restent liées par le financement et la liquidité. Et Glass-Steagall n'a pas empêché la crise de 2008, déclenchée par le crédit hypothécaire titrisé.",
      "Le débat porte donc moins sur une séparation stricte que sur un ensemble de garanties : fonds propres, supervision consolidée, plans de **résolution** ordonnée et interdiction du trading pour compte propre."
    ]
  },

  {
    id: "f-decarboner-banques",
    partie: 4,
    theme: "Finance et climat",
    statut: "officiel",
    source: "Sujet zéro officiel 2026, QRC n° 2",
    question: "Pourquoi, selon Gaël Giraud, faut-il décarboner le bilan des banques ?",
    motsCles: ["Giraud", "décarbonation", "actifs échoués", "risque climatique", "transition"],
    reponse: [
      "**Gaël Giraud**, économiste et ancien chef économiste de l'Agence française de développement, soutient que le **bilan des banques** doit être **décarboné** : leurs actifs (crédits et titres) doivent cesser de financer les énergies fossiles et s'aligner sur une trajectoire bas carbone. Trois raisons le justifient.",
      "D'abord, les banques **financent l'économie** : en réorientant leurs crédits, elles peuvent réduire le financement des énergies fossiles et accélérer la transition. Le bilan bancaire est donc un levier de politique climatique, plus rapide qu'une réforme fiscale.",
      "Ensuite, elles réduisent leur **propre risque**. Un portefeuille carboné expose à trois risques : les **actifs échoués** (stranded assets), si des réserves fossiles deviennent inexploitables ; le **risque de transition**, lié au prix du carbone, aux normes et aux contentieux ; le **risque physique**, lié aux événements climatiques. Décarboner, c'est donc protéger la **stabilité financière**, car une dépréciation brutale de ces actifs fragiliserait les banques et, par contagion, le crédit.",
      "Enfin, les banques répondent aux attentes des **régulateurs**, des investisseurs et de la société : taxonomie verte, publication extra-financière, stress tests climatiques, engagement net zéro. Une banque alignée conserve sa réputation et attire des capitaux.",
      "Les limites sont techniques : mesure des émissions **financées**, données hétérogènes, risque de **greenwashing**, coût de la transition et report possible vers des financements non bancaires."
    ]
  },

  {
    id: "f-macroprudentiel",
    partie: 4,
    theme: "Stabilité financière",
    statut: "entrainement",
    source: "Question d'entraînement (programme : financement de l'économie, stabilité financière)",
    question: "Qu'est-ce que la régulation macroprudentielle ?",
    motsCles: ["macroprudentiel", "risque systémique", "ACPR", "Bâle III", "procyclicité"],
    reponse: [
      "La régulation **macroprudentielle** vise le **risque systémique** : le risque qu'un choc local se propage à l'ensemble du système financier et à l'économie réelle. Elle complète la régulation **microprudentielle**, qui surveille la santé de chaque établissement pris isolément.",
      "Ses instruments sont variés : **coussin contracyclique** de fonds propres, coussin pour les banques systémiques, plafonds de ratio prêt/valeur (LTV) sur le crédit immobilier, limites de concentration, stress tests, surveillance de la **finance parallèle**. En France, l'**ACPR** est l'autorité compétente ; au niveau européen, le **SSM** et l'**ESRB** coordonnent ; au niveau mondial, le **FSB** et les accords **Bâle III** fixent le cadre.",
      "Deux objectifs dominent. Éviter la **procyclicité** du crédit : un emballement du crédit gonfle les prix d'actifs, puis un **credit crunch** aggrave la récession. Contenir l'endettement, les bulles et l'interconnexion, en réduisant le « too big to fail » par des plans de résolution et des exigences de fonds propres.",
      "Ses limites sont structurelles. Les **indicateurs avancés** sont imparfaits et le risque se déplace vers les zones moins régulées (arbitrage réglementaire, shadow banking). La coordination internationale est difficile, et les mesures ont un coût en phase haute, puisqu'elles renchérissent le crédit. Enfin, la régulation réduit la probabilité des crises mais ne supprime pas l'**incertitude**, que Minsky place au cœur de l'instabilité financière."
    ]
  }

]);
