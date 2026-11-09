/*
  PLAN DES RÉPONSES
  -----------------
  Chaque réponse est affichée en blocs colorés : introduction, développement
  numéroté, conclusion. Par défaut : premier bloc = introduction, dernier =
  conclusion, les autres = développement.

  Ce fichier ne sert qu'à corriger les cas où le dernier bloc est encore un
  développement et non une conclusion. Valeurs possibles : "intro", "dev",
  "conclusion".
*/
window.PLANS = {

  /* le dernier bloc poursuit l'analyse keynésienne au lieu de conclure */
  "g-chomage": ["intro", "dev", "dev", "dev"],

  /* le dernier bloc décrit les formes juridiques et les crypto-actifs */
  "f-fonctions-monnaie": ["intro", "dev", "dev", "dev"],

  /* le dernier bloc retrace la globalisation financière, pas une conclusion */
  "i-smi": ["intro", "dev", "dev", "dev"]

};
