"""Génère le PDF d'un document balisé avec le script du skill fiche-creator.

Le script du skill ne cherche ses polices que dans les dossiers macOS : ce
wrapper ajoute les dossiers Windows et les noms de fichiers Windows/DejaVu
avant de l'appeler, sans modifier le script du skill.

Usage :
    python outils/build_pdf.py "document.md" -o "document.pdf" [--title "..."]
"""

import importlib.util
import os
import sys

SKILL = (
    os.path.expanduser("~/.config/freebuff-desktop/account-skills")
    + "/491fcfba9616a4f6af366f7080081336352b4891fd74d7fb57093a52d1333c06"
    + "/f4258d063ccfd994c879f93ce2cf3c92377246ec62f63f234ceedabd388f0268"
    + "/fiche-creator/scripts/generate_pdf.py"
)

SEARCH_PATHS = [
    "C:/Windows/Fonts",
    "/usr/share/fonts/truetype/dejavu",
    "/usr/share/fonts/truetype",
    "/usr/share/fonts",
]

CANDIDATES = {
    "": ["DejaVuSans.ttf", "arial.ttf", "Arial Unicode.ttf", "LiberationSans-Regular.ttf"],
    "B": ["DejaVuSans-Bold.ttf", "arialbd.ttf", "LiberationSans-Bold.ttf"],
    "I": ["DejaVuSans-Oblique.ttf", "ariali.ttf", "LiberationSans-Italic.ttf"],
    "BI": ["DejaVuSans-BoldOblique.ttf", "arialbi.ttf", "LiberationSans-BoldItalic.ttf"],
}


def load_skill_module():
    spec = importlib.util.spec_from_file_location("generate_pdf", SKILL)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    for path in SEARCH_PATHS:
        if os.path.isdir(path) and path not in module._FONT_SEARCH_PATHS:
            module._FONT_SEARCH_PATHS.insert(0, path)
    module._FONT_CANDIDATES.update(CANDIDATES)
    module.FichePDF = _patched_pdf_class(module)
    return module


def _patched_pdf_class(module):
    """Le script passe line_height=1.22 : fpdf2 >= 2.8 l'interprète en mm,
    ce qui écrase les lignes des cellules multilignes. On laisse la valeur
    automatique de fpdf2."""

    class PatchedPDF(module.FichePDF):
        def table(self, *args, **kwargs):
            kwargs.pop("line_height", None)
            return super().table(*args, **kwargs)

    return PatchedPDF


if __name__ == "__main__":
    module = load_skill_module()
    sys.argv[0] = SKILL
    module.main()
