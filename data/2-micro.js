window.BANQUE = (window.BANQUE || []).concat([

  {
    id: "m-elasticite",
    partie: 2,
    theme: "Marchés",
    statut: "entrainement",
    source: "Question d'entraînement (programme : offre, demande et équilibre)",
    question: "Qu'est-ce que l'élasticité-prix de la demande et à quoi sert-elle ?",
    motsCles: ["élasticité", "prix", "consommation", "recette", "substituts"],
    reponse: [
      "L'**élasticité-prix de la demande** mesure la sensibilité de la quantité demandée à une variation du prix. On la calcule en divisant la variation en pourcentage des quantités par la variation en pourcentage du prix : **e = (ΔQ/Q) / (ΔP/P)**. Elle est négative, on la commente souvent en valeur absolue.",
      "Trois cas se présentent. La demande est **élastique** si |e| > 1 : une hausse de prix fait fortement baisser les quantités. Elle est **rigide** si |e| < 1 : les quantités réagissent peu. Elle est **unitaire** si |e| = 1 : la dépense totale reste constante. Ces ordres de grandeur ont un usage immédiat : si la demande est rigide, une hausse de prix augmente la recette ; si elle est élastique, elle la diminue.",
      "Ses déterminants sont l'existence de **substituts**, la part du bien dans le budget, son caractère de nécessité et l'**horizon temporel**. La demande de carburant est rigide à court terme et plus élastique à long terme, car les ménages peuvent changer de véhicule ou de mode de vie. On distingue aussi l'**élasticité-revenu** (positive pour un bien normal, négative pour un bien inférieur, supérieure à 1 pour un bien de luxe) et l'**élasticité croisée** (positive entre substituts, négative entre compléments).",
      "L'élasticité sert à analyser l'**incidence d'une taxe** (le côté le plus rigide supporte l'essentiel de la charge), à évaluer la perte sèche d'une taxation et à délimiter le marché pertinent en droit de la concurrence. Sa mesure reste difficile : elle dépend du prix de départ et son estimation se heurte à l'endogénéité des prix."
    ]
  },

  {
    id: "m-consommateur",
    partie: 2,
    theme: "Le consommateur",
    statut: "entrainement",
    source: "Question d'entraînement (programme : équilibre du consommateur)",
    question: "Comment le consommateur choisit-il son panier de biens ?",
    motsCles: ["utilité marginale", "TMS", "contrainte budgétaire", "effet de substitution"],
    reponse: [
      "Le consommateur choisit le panier de biens qui lui procure la **satisfaction la plus élevée** compte tenu de son revenu. Deux outils suffisent : ses **préférences**, représentées par des courbes d'indifférence, et sa **contrainte budgétaire**, p₁x₁ + p₂x₂ ≤ R.",
      "Le **taux marginal de substitution** (TMS) indique la quantité d'un bien que le consommateur accepte de céder pour une unité supplémentaire de l'autre, en restant sur la même courbe d'indifférence. L'**optimum** se situe au point de tangence entre la droite de budget et la courbe d'indifférence la plus élevée accessible : **TMS = p₁/p₂**, soit **Um₁/p₁ = Um₂/p₂**. À ce point, l'utilité marginale du dernier euro dépensé est identique dans tous les usages ; sinon, le consommateur réallouerait son budget.",
      "Une variation de prix produit deux effets. L'**effet de substitution** rend le bien relativement plus cher et pousse à le remplacer. L'**effet de revenu** réduit le pouvoir d'achat. Pour un **bien normal**, les deux vont dans le même sens : la demande baisse. Pour un **bien inférieur**, l'effet de revenu peut jouer en sens inverse ; s'il domine, on obtient un bien Giffen, cas rare.",
      "La somme des demandes individuelles donne la **demande de marché**, décroissante. Cette analyse suppose un consommateur parfaitement rationnel ; l'économie comportementale montre que les choix dépendent aussi du contexte, des comparaisons sociales et de la capacité limitée à traiter l'information."
    ]
  },

  {
    id: "m-taxe-incidence",
    partie: 2,
    theme: "Marchés et politiques publiques",
    statut: "entrainement",
    source: "Question d'entraînement (programme : politiques publiques, marché concurrentiel)",
    question: "Quels sont les effets d'une taxe sur un marché concurrentiel ?",
    motsCles: ["taxe", "incidence", "perte sèche", "élasticité", "recette"],
    reponse: [
      "Sur un marché concurrentiel, une taxe déplace la courbe d'offre (taxe sur le vendeur) ou celle de demande (taxe sur l'acheteur). Le résultat est identique : le prix payé par l'acheteur augmente, le prix reçu par le vendeur diminue, et la quantité échangée baisse. La **charge est partagée**, et non supportée par le seul côté sur lequel la taxe est prélevée.",
      "Le partage dépend des **élasticités**. Le côté le plus **rigide** supporte la plus grande part de la taxe. Sur le tabac ou les carburants, la demande est peu sensible au prix : le consommateur paie l'essentiel. Sur le marché du travail, si l'offre de travail est rigide, une cotisation patronale pèse surtout sur le salarié.",
      "Les effets d'ensemble sont de trois ordres. L'État encaisse une **recette** égale au montant de la taxe multiplié par la quantité échangée. La quantité diminue, ce qui fait disparaître des échanges mutuellement avantageux : c'est la **perte sèche** (triangle de Harberger), d'autant plus forte que les élasticités sont élevées. Enfin, la taxe a un **effet redistributif**, qui peut être régressif si elle pèse sur des biens consommés par les ménages modestes.",
      "Ces effets expliquent l'usage de la fiscalité comportementale : une **taxe pigouvienne** égale au coût social marginal internalise une externalité négative. Mais une taxe trop élevée favorise la contrebande et la substitution vers des produits non taxés, ce qui réduit la recette et l'efficacité."
    ]
  },

  {
    id: "m-monopole",
    partie: 2,
    theme: "Concurrence imparfaite",
    statut: "entrainement",
    source: "Question d'entraînement (programme : concurrence imparfaite)",
    question: "Pourquoi un monopole est-il inefficace et comment peut-on le réguler ?",
    motsCles: ["monopole", "perte sèche", "barrières à l'entrée", "régulation"],
    reponse: [
      "Le **monopole** est un marché à un seul offreur, protégé par des **barrières à l'entrée** : naturelles (coûts fixes très élevés, réseau), légales (brevet, concession) ou stratégiques (contrôle d'une ressource, effets de réseau).",
      "Son inefficacité vient de la tarification. Le monopoleur produit jusqu'à ce que la recette marginale égale le coût marginal, et fixe un prix **supérieur au coût marginal**. La quantité offerte est donc inférieure à celle de l'optimum concurrentiel (P = Cm), et la différence correspond à une **perte sèche** pour la collectivité : des consommateurs prêts à payer plus que le coût de production sont exclus. Le monopole capte aussi une **rente**. Il peut réduire la qualité, freiner l'innovation ou pratiquer la **discrimination par les prix** (premier, deuxième ou troisième degré) pour capter davantage de surplus.",
      "La régulation prend plusieurs formes. Le **prix plafond** (tarification au coût moyen, price cap) limite la rente. La **mise en concurrence** (démantèlement, accès régulé au réseau) est préférée quand c'est possible. Le **droit de la concurrence** sanctionne l'abus de position dominante (article 102 TFUE) et contrôle les concentrations. Enfin, la régulation incitative cherche à faire baisser les coûts.",
      "Les limites sont réelles. Le régulateur souffre d'une **asymétrie d'information** sur les coûts et peut être capturé par l'opérateur. Certains monopoles sont **naturels** : un seul réseau coûte moins cher que plusieurs. Et une rente temporaire peut être le prix de l'innovation, comme le justifient les brevets."
    ]
  },

  {
    id: "m-plateformes",
    partie: 2,
    theme: "Politique de concurrence",
    statut: "entrainement",
    source: "Question d'entraînement (thème tombé à l'écrit, format antérieur)",
    question: "En quoi l'économie des plateformes remet-elle en cause la concurrence sur les marchés ?",
    motsCles: ["plateformes", "effets de réseau", "position dominante", "DMA"],
    reponse: [
      "Les **plateformes numériques** — moteurs de recherche, réseaux sociaux, places de marché — bouleversent l'analyse concurrentielle classique parce que leurs marchés ne ressemblent pas à un marché de biens ordinaires.",
      "Le premier facteur est l'**effet de réseau** : la valeur du service augmente avec le nombre d'utilisateurs. Il en résulte une tendance à la concentration, voire un **« winner takes all »**. S'y ajoutent des **économies d'échelle** et d'envergure, des coûts de changement élevés et un avantage cumulatif tiré des **données**. La plateforme est **biface** : elle met en relation deux populations (annonceurs et internautes, vendeurs et acheteurs), et le service peut être gratuit d'un côté, ce qui rend le « marché pertinent » et le préjudice difficiles à mesurer en prix.",
      "Les pratiques posent problème : **auto-référencement** (favoriser ses propres services), prix prédateurs, clauses de parité, rachats de concurrents potentiels, verrouillage des écosystèmes. Le droit de la concurrence intervient après coup, avec des enquêtes longues, alors que le marché se concentre vite.",
      "D'où une régulation **ex ante** : le règlement européen sur les marchés numériques (**DMA**, 2022) impose des obligations aux contrôleurs d'accès (interopérabilité, accès aux données, interdiction de l'auto-préférence). Les limites subsistent : risque de freiner l'innovation, difficulté à définir les marchés, application extraterritoriale et tentation du protectionnisme numérique."
    ]
  },

  {
    id: "m-externalites",
    partie: 2,
    theme: "Défaillances de marché",
    statut: "entrainement",
    source: "Question d'entraînement (programme : externalités)",
    question: "Comment corriger une externalité négative ?",
    motsCles: ["externalité", "taxe pigouvienne", "Coase", "permis négociables"],
    reponse: [
      "Une **externalité** est un effet d'une activité sur un tiers sans compensation par le marché. Elle peut être négative (pollution) ou positive (vaccination, innovation), et concerner la production ou la consommation. Son existence crée un écart entre le **coût privé** et le **coût social** : le marché produit trop d'externalités négatives et pas assez de positives.",
      "L'instrument le plus direct est la **taxe pigouvienne**, égale au coût social marginal au point optimal. Elle **internalise** l'externalité : le pollueur intègre dans son calcul le dommage qu'il cause et réduit son activité. Symétriquement, une **subvention** encourage les externalités positives.",
      "On peut aussi agir par les **quantités**. Les **marchés de permis négociables** fixent un plafond global d'émissions et laissent les entreprises échanger des quotas : la quantité est certaine, le prix est découvert, et la réduction se fait là où elle coûte le moins cher. La **norme** est utile quand la mesure est simple et le risque grave, mais elle est moins efficiente car elle ne différencie pas les coûts.",
      "La **négociation privée** peut suffire : selon le **théorème de Coase**, si les droits de propriété sont bien définis et les coûts de transaction nuls, les parties aboutissent à l'optimum, quelle que soit l'attribution initiale des droits. Mais pour le climat, les acteurs sont trop nombreux et le bien est mondial : la coordination publique est indispensable. Restent les limites de la mesure du dommage, les fuites de carbone et l'acceptabilité sociale d'une taxe sans redistribution."
    ]
  },

  {
    id: "m-biens-publics",
    partie: 2,
    theme: "Défaillances de marché",
    statut: "entrainement",
    source: "Question d'entraînement (programme : biens publics)",
    question: "Pourquoi le marché ne peut-il pas produire un bien public ?",
    motsCles: ["bien public", "non-rivalité", "passager clandestin", "communs", "Ostrom"],
    reponse: [
      "Un **bien public** possède deux propriétés : la **non-rivalité** (la consommation de l'un ne réduit pas celle de l'autre) et la **non-excluabilité** (on ne peut empêcher l'accès). La défense nationale, l'éclairage public, la recherche fondamentale ou la prévision météo en sont des exemples.",
      "Le marché ne peut pas le financer car l'offreur ne peut pas **facturer** ce qu'il produit : chacun a intérêt à attendre que les autres paient. C'est le **passager clandestin** (free rider). Si tous raisonnent ainsi, la production est nulle ou très insuffisante, alors qu'elle serait socialement rentable. C'est une **défaillance de marché** qui justifie le financement par l'impôt ou la production publique.",
      "Il faut distinguer trois catégories voisines. Le **bien commun** est rival mais non excluable (pêche, pâturage, eau) : sa surexploitation est la **tragédie des communs** décrite par Hardin en 1968. Le **bien de club** est excluable mais non rival (péage, plateforme de streaming). Le **bien public mondial** (climat, santé, stabilité financière) pose un problème de coordination entre États, faute de gouvernement mondial.",
      "Les solutions ne sont pas seulement publiques. **Ostrom** (prix Nobel 2009) a montré que des communautés peuvent gérer durablement une ressource commune par des règles locales. Reste que l'intervention publique peut elle aussi échouer : bureaucratie, capture, financement insuffisant. Les biens publics exigent donc un financement collectif et une gouvernance."
    ]
  },

  {
    id: "m-asymetries",
    partie: 2,
    theme: "Défaillances de marché",
    statut: "entrainement",
    source: "Question d'entraînement (programme : asymétries d'information)",
    question: "Qu'est-ce que la sélection adverse et l'aléa moral ?",
    motsCles: ["asymétrie d'information", "sélection adverse", "aléa moral", "Akerlof", "signal"],
    reponse: [
      "L'**asymétrie d'information** désigne une situation où une partie détient une information que l'autre n'a pas. Elle produit deux problèmes distincts, que l'on confond souvent : la sélection adverse intervient **avant** le contrat, l'aléa moral **après**.",
      "La **sélection adverse** concerne la qualité ou le risque de la partie adverse. Sur le marché des voitures d'occasion, le vendeur connaît l'état du véhicule et l'acheteur non : les bons véhicules quittent le marché et il ne reste que les mauvais (les « lemons », Akerlof, 1970). En assurance santé, les personnes malades ont plus intérêt à s'assurer, ce qui déséquilibre le portefeuille. Les remèdes sont le **signalement** (Spence : diplômes, garanties, labels) et la **sélection** par le vendeur (questionnaire médical, expertise).",
      "L'**aléa moral** concerne le comportement. Une fois assuré, l'agent peut prendre moins de précautions, puisque le coût est supporté par l'autre. C'est le cas de l'assuré qui néglige son logement, ou de la banque « too big to fail » qui prend des risques en comptant sur le sauvetage public. Les remèdes sont la **franchise**, le bonus-malus, les incitations, le contrôle et, pour les banques, les fonds propres réglementaires.",
      "Ces deux défaillances justifient la régulation : obligation d'information, agréments, supervision prudentielle, garantie des dépôts. Leurs limites : la régulation a un coût, peut réduire l'offre, et l'économie comportementale montre que les agents ne traitent pas l'information de façon parfaitement rationnelle."]
  },

  {
    id: "m-producteur",
    partie: 2,
    theme: "Le producteur",
    statut: "entrainement",
    source: "Question d'entraînement (programme : équilibre du producteur)",
    question: "Comment une entreprise en concurrence détermine-t-elle son volume de production ?",
    motsCles: ["coût marginal", "coût moyen", "profit", "seuil de fermeture", "rendements décroissants"],
    reponse: [
      "L'entreprise cherche à **maximiser son profit**, différence entre sa recette totale et son coût total. Elle distingue le **court terme**, où au moins un facteur est fixe, et le **long terme**, où tous les facteurs s'ajustent.",
      "Ses coûts se décomposent en **coûts fixes** (loyer, machines), **coûts variables** (matières, énergie) et **coût total**. On en déduit le **coût moyen** (CT/Q), le coût variable moyen et le **coût marginal**, qui mesure le coût de la dernière unité produite. La **loi des rendements décroissants** explique que le coût marginal finit par augmenter. Le coût marginal coupe le coût moyen à son minimum.",
      "La règle de décision est simple : produire tant que la **recette marginale** dépasse le coût marginal, et s'arrêter à **Rm = Cm**. En **concurrence pure et parfaite**, l'entreprise est preneuse de prix, donc Rm = P : elle produit jusqu'à **P = Cm**. En dessous du **seuil de fermeture** (P inférieur au coût variable moyen), elle arrête à court terme, car elle perdrait plus en produisant qu'en ne produisant pas.",
      "L'agrégation des décisions individuelles donne l'**offre du marché**, croissante avec le prix. À long terme, la libre entrée et sortie ramène le prix au minimum du coût moyen et le profit à zéro : c'est l'équilibre de **concurrence pure et parfaite**, dont les hypothèses (atomicité, homogénéité, information parfaite) sont rarement réunies en pratique."
    ]
  },

  {
    id: "m-equilibre-concurrentiel",
    partie: 2,
    theme: "Marchés",
    statut: "entrainement",
    source: "Question d'entraînement (programme : offre, demande et équilibre)",
    question: "Comment se forme l'équilibre sur un marché concurrentiel et comment réagit-il à un choc ?",
    motsCles: ["offre", "demande", "équilibre", "choc d'offre", "surplus"],
    reponse: [
      "Sur un marché concurrentiel, la **demande** est décroissante avec le prix et l'**offre** croissante. Le **prix d'équilibre** est celui qui égalise les quantités offertes et demandées : à ce prix, il n'y a ni **pénurie** ni **excédent**.",
      "Le marché est en **concurrence pure et parfaite** lorsqu'il réunit cinq conditions : atomicité des offreurs et demandeurs, homogénéité des produits, libre entrée et sortie, information parfaite et mobilité des facteurs. Aucun agent ne peut alors influencer le prix : tous sont **preneurs de prix**.",
      "Un **choc de demande** — hausse du revenu, baisse des taux — déplace la demande vers la droite : prix et quantité augmentent. Un **choc d'offre** — hausse du prix de l'énergie, mauvaise récolte — déplace l'offre vers la gauche : prix en hausse, quantité en baisse. C'est le cas de la **stagflation** de 1973, où un choc d'offre négatif produit à la fois inflation et chômage, contrairement à un choc de demande.",
      "L'équilibre maximise le **surplus total**, celui du consommateur et du producteur : c'est l'efficacité de l'optimum de Pareto. Les interventions publiques le modifient : un **prix plafond** sous l'équilibre crée une pénurie et un marché noir, un **prix plancher** au-dessus crée un excédent et du chômage. Les cinq hypothèses étant rarement réunies, la concurrence est toujours imparfaite en pratique, ce qui justifie le droit de la concurrence."
    ]
  }

]);
