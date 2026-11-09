/*
  BANQUE DE QUESTIONS — format d'une entrée
  ------------------------------------------
  id        : identifiant unique (ne pas modifier une fois utilisé : c'est la clé de sauvegarde)
  partie    : 1 à 5 (les cinq parties du programme officiel)
  theme     : libellé court affiché sur la carte
  statut    : "officiel" (formulation réellement posée au concours) ou "entrainement"
  source    : origine de la formulation
  question  : énoncé exact
  motsCles  : notions mobilisées (recherche dans la banque)
  reponse   : tableau de paragraphes. **texte** met le terme en évidence.
              Un paragraphe commençant par "• " devient une puce.
*/
window.BANQUE = (window.BANQUE || []).concat([

  {
    id: "c-main-invisible",
    partie: 1,
    theme: "Les classiques",
    statut: "officiel",
    source: "Sujet zéro officiel 2026, QRC n° 4",
    question: "Expliquez la théorie de la « main invisible ».",
    motsCles: ["Adam Smith", "1776", "autorégulation", "intérêt général", "libéralisme"],
    reponse: [
      "La « main invisible » est la théorie par laquelle **Adam Smith** (1723-1790) explique, dans *Recherches sur la nature et les causes de la richesse des nations* (**1776**), que la poursuite des intérêts individuels produit l'intérêt général sans qu'aucune autorité ne l'organise. Cet ouvrage est considéré comme l'acte de naissance de l'analyse économique et du libéralisme.",
      "Le mécanisme repose sur le marché. Un producteur qui cherche son profit doit proposer des biens utiles à un prix acceptable ; un consommateur qui cherche à dépenser le moins possible fait pression sur les prix. La confrontation de l'**offre** et de la **demande** conduit à un prix qui reflète la rareté et les coûts : le **prix de marché** converge vers le **prix naturel** (matières premières, travail, frais). Chacun est ainsi conduit, comme par une main invisible, à produire ce que les autres attendent.",
      "Smith en tire deux conséquences. L'**État** doit se limiter aux fonctions régaliennes (justice, police, défense) et aux infrastructures que le marché ne finance pas. Au niveau international, chaque pays a intérêt à se spécialiser là où il est le plus efficace : c'est la théorie de l'**avantage absolu**, qui justifie le libre-échange.",
      "La théorie a des limites. Elle suppose la **concurrence pure et parfaite** et une information parfaite. Elle ignore les externalités, les biens publics et les monopoles naturels, qui justifient l'intervention publique. Smith lui-même reconnaissait que les entrepreneurs tendent à s'entendre pour limiter la concurrence."
    ]
  },

  {
    id: "c-marx-plus-value",
    partie: 1,
    theme: "Marx",
    statut: "entrainement",
    source: "Question d'entraînement (programme : les marxistes)",
    question: "Qu'est-ce que la plus-value chez Marx et d'où vient-elle ?",
    motsCles: ["Marx", "1867", "exploitation", "force de travail", "profit"],
    reponse: [
      "Chez **Marx** (*Le Capital*, **1867**), la **plus-value** est la valeur produite par le travailleur au-delà de ce qui lui est versé sous forme de salaire. C'est la source du profit du capitaliste, et donc le mécanisme central de l'**exploitation** dans le mode de production capitaliste.",
      "Le point de départ est la distinction entre le travail et la **force de travail**. Le travailleur ne vend pas son travail mais sa capacité à travailler, dont la valeur correspond au coût de sa subsistance (nourriture, logement, éducation). S'il faut quatre heures de travail social pour produire cette subsistance et que le capitaliste en fait travailler huit, les quatre heures supplémentaires créent une valeur qui n'est pas payée : c'est le **surtravail**, source de la plus-value.",
      "Marx distingue la **plus-value absolue** (allonger la journée de travail ou l'intensifier) et la **plus-value relative** (réduire le temps de travail nécessaire grâce à la productivité). Le **capital constant** (machines, matières) transmet sa valeur sans en créer ; seul le **capital variable** (salaires) crée de la valeur.",
      "Cette analyse fonde la dynamique du capitalisme : accumulation, hausse de la **composition organique du capital**, **baisse tendancielle du taux de profit** (compensée par des contre-tendances), **armée industrielle de réserve** et crises de suraccumulation. Ses limites sont connues : la théorie de la valeur-travail est contestée, et le profit peut aussi venir de l'innovation, du risque ou du pouvoir de marché."
    ]
  },

  {
    id: "c-marginalistes",
    partie: 1,
    theme: "Les néoclassiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : Jevons, Menger, Walras)",
    question: "En quoi la révolution marginaliste transforme-t-elle la théorie de la valeur ?",
    motsCles: ["Jevons", "Menger", "Walras", "utilité marginale", "valeur-utilité"],
    reponse: [
      "Entre **1871** et **1874**, **Jevons**, **Menger** et **Walras** opèrent une rupture : la valeur d'un bien ne vient plus du travail qu'il incorpore, comme chez les classiques, mais de l'**utilité** qu'il procure au consommateur. C'est la **révolution marginaliste**, qui fonde l'analyse néoclassique.",
      "L'**utilité marginale** est la satisfaction apportée par la dernière unité consommée. Elle **décroît** à mesure que la consommation augmente : c'est la loi de l'utilité marginale décroissante. Le prix dépend de cette utilité marginale, et non de l'utilité totale. C'est le **paradoxe de l'eau et du diamant** : l'eau, très utile, est bon marché car abondante ; le diamant, inutile, est cher car rare.",
      "Les conséquences sont majeures. Le consommateur arbitre jusqu'à ce que l'utilité marginale par euro dépensé soit identique pour tous les biens (**Um₁/p₁ = Um₂/p₂**). Walras construit l'**équilibre général** (tâtonnement, commissaire-priseur) et Pareto définit l'**optimum** où l'on ne peut améliorer la situation d'un agent sans dégrader celle d'un autre. Marshall (1890) ajoute l'équilibre partiel, le surplus et l'élasticité.",
      "La rupture est double : la **valeur-travail** est remplacée par la **valeur-utilité**, et l'analyse en classes sociales par un **individu rationnel** qui maximise son utilité. Les limites tiennent à l'hypothèse d'une utilité mesurable (Pareto la rend ordinale) et à la rationalité parfaite, contestée par Simon et l'économie comportementale."
    ]
  },

  {
    id: "c-keynes-demande-effective",
    partie: 1,
    theme: "Le keynésianisme",
    statut: "entrainement",
    source: "Question d'entraînement (programme : le keynésianisme)",
    question: "Qu'est-ce que la demande effective et comment peut-elle conduire à un équilibre de sous-emploi ?",
    motsCles: ["Keynes", "1936", "demande effective", "sous-emploi", "multiplicateur"],
    reponse: [
      "Dans la *Théorie générale de l'emploi, de l'intérêt et de la monnaie* (**1936**), **Keynes** montre qu'une économie peut rester durablement en **sous-emploi**. C'est une rupture avec les classiques, pour qui le marché s'ajuste toujours et le chômage n'est que frictionnel.",
      "La **demande effective** est la demande que les entrepreneurs **anticipent**. Ils embauchent et produisent en fonction des débouchés qu'ils espèrent, et non d'une demande qui existerait déjà. Si les anticipations sont pessimistes — Keynes parle d'**animal spirits** —, la production et l'emploi baissent ; les revenus distribués baissent à leur tour, ce qui confirme le pessimisme initial. Le mécanisme est une **prophétie auto-réalisatrice** qui aboutit à un **équilibre de sous-emploi**.",
      "Keynes en tire trois conséquences. Les **salaires** sont rigides à la baisse et leur baisse réduirait la demande, donc l'emploi. L'**épargne** n'est pas automatiquement investie : le **paradoxe de l'épargne** montre qu'épargner plus peut réduire le revenu global. L'**État** doit donc soutenir la demande (investissement public, relance), avec un effet **multiplicateur** : k = 1/(1-c).",
      "Les limites sont celles des politiques de relance : creusement de la dette, **effet d'éviction**, capacités de production saturées (l'effet devient inflationniste) et anticipations des agents, qui peuvent annuler la relance (équivalence ricardienne)."
    ]
  },

  {
    id: "c-friedman-monetarisme",
    partie: 1,
    theme: "Les monétaristes",
    statut: "entrainement",
    source: "Question d'entraînement (programme : les monétaristes)",
    question: "Quels sont les apports et les limites du monétarisme de Milton Friedman ?",
    motsCles: ["Friedman", "inflation", "taux naturel", "Phillips", "règle monétaire"],
    reponse: [
      "**Friedman** conteste l'activation keynésienne. Sa phrase célèbre résume sa thèse : « l'inflation est toujours et partout un phénomène monétaire ». La politique monétaire agit sur les prix ; elle ne peut pas réduire durablement le chômage.",
      "Ses apports sont de trois ordres. Il montre que la **demande de monnaie** est stable, car elle dépend du **revenu permanent** et du coût d'opportunité de la détention de monnaie. Avec Phelps, il construit la **courbe de Phillips augmentée** : une relance ne réduit le chômage que si l'inflation n'est pas anticipée ; à long terme, le chômage revient au **taux naturel** (ou NAIRU). Enfin, avec Schwartz (1963), il attribue la crise de 1929 à une contraction monétaire, non à un excès d'épargne.",
      "Les conséquences de politique économique sont nettes : plutôt qu'une action discrétionnaire, une **règle de croissance de la masse monétaire**, des **banques centrales indépendantes** et, plus tard, le **ciblage d'inflation**. La crédibilité remplace la surprise.",
      "Les limites sont apparues dans les années 1980 : la demande de monnaie est devenue instable avec les innovations financières, et les agrégats monétaires se sont révélés de mauvais guides (abandon du ciblage monétaire). La monnaie n'est pas neutre à court terme, et la crise de 2008 a montré qu'une inflation maîtrisée ne suffit pas à garantir la stabilité financière."
    ]
  },

  {
    id: "c-lucas-anticipations",
    partie: 1,
    theme: "Les nouveaux classiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : les nouveaux classiques)",
    question: "En quoi la critique de Lucas remet-elle en cause l'évaluation des politiques économiques ?",
    motsCles: ["Lucas", "anticipations rationnelles", "crédibilité", "incohérence temporelle"],
    reponse: [
      "La **critique de Lucas** (**1976**) énonce que les modèles économétriques estimés sur les comportements passés ne peuvent pas évaluer une politique nouvelle : lorsque la règle change, les agents changent de comportement. Les paramètres du modèle ne sont donc pas stables, et la prévision devient fausse.",
      "Elle s'appuie sur l'hypothèse des **anticipations rationnelles** (Muth, 1961) : les agents utilisent toute l'information disponible, y compris la règle de politique économique annoncée. Si la politique est crédible et comprise, les salaires et les prix s'ajustent immédiatement. Une relance systématique est alors anticipée et devient inefficace sur l'activité : c'est le résultat de **Sargent et Wallace** (1976).",
      "Les conséquences sont double. Il faut **microfonder** les modèles, c'est-à-dire partir des comportements individuels. Et il faut préférer des **règles** à la discrétion, car une politique discrétionnaire souffre d'**incohérence temporelle** (Kydland et Prescott, 1977) : une banque centrale qui annonce la stabilité des prix a intérêt, une fois les salaires fixés, à créer de la surprise inflationniste. La crédibilité et l'indépendance deviennent donc des instruments.",
      "La critique a des limites. Elle suppose des agents parfaitement informés et des prix flexibles, alors que les rigidités réelles et les contrats existent. La crise de 2008 a montré que les politiques budgétaire et monétaire conservent des effets réels importants, même anticipées."]
  },

  {
    id: "c-say-malthus",
    partie: 1,
    theme: "Les classiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : Say, Malthus)",
    question: "Expliquez la loi des débouchés de Jean-Baptiste Say et la critique qu'en fait Malthus.",
    motsCles: ["Say", "1803", "loi des débouchés", "Malthus", "surproduction"],
    reponse: [
      "Dans son *Traité d'économie politique* (**1803**), **Jean-Baptiste Say** formule la **loi des débouchés** : « les produits s'échangent contre des produits ». Produire, c'est créer en même temps les revenus — salaires, profits, rentes — qui permettront d'acheter cette production.",
      "La monnaie n'est alors qu'un **voile** : elle sert à effectuer les échanges mais n'est pas désirée pour elle-même. Un déséquilibre ne peut donc être que **sectoriel** — trop de drap, pas assez de blé — et il se corrige par la réallocation des facteurs. Une **crise de surproduction générale** est impossible, puisque l'offre crée sa propre demande. La conséquence politique est nette : l'État doit laisser faire, et le libre-échange est préférable.",
      "**Malthus** conteste cette conclusion. Dans son *Essai sur le principe de population* (**1798**), il montre que la population croît géométriquement alors que les subsistances croissent arithmétiquement : la **loi de population** impose des freins positifs (famine, maladie) ou préventifs (mariage tardif). Surtout, il soutient que les revenus ne sont pas tous dépensés : les propriétaires peuvent **épargner** et thésauriser, ce qui crée une **insuffisance de demande** et rend possibles les crises de surproduction. Il justifie ainsi les dépenses des classes oisives.",
      "Say fonde l'équilibre classique, et sa loi domine jusqu'à Keynes, qui se réclamera de Malthus pour penser la demande effective. Les limites sont doubles : Say suppose le **plein emploi** et une monnaie neutre, ce que la crise de 1929 démentira ; Malthus sous-estime le progrès technique agricole, qui a écarté sa prévision démographique."
    ]
  }

]);
