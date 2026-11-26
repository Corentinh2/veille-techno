// Contrôle de sécurité des articles, lancé automatiquement avant chaque build (npm « prebuild »).
// Les articles peuvent être rédigés automatiquement à partir de pages web : on refuse
// tout HTML brut et tout lien non http(s) dans le texte, pour qu'aucun code ne soit injecté.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const racine = new URL('../src/content/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

function fichiersMd(dossier) {
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) return fichiersMd(chemin);
    return nom.endsWith('.md') ? [chemin] : [];
  });
}

const erreurs = [];
for (const fichier of fichiersMd(racine)) {
  const texte = readFileSync(fichier, 'utf8');
  // Corps de l'article, sans le frontmatter (validé séparément par le schéma Zod).
  const corps = texte.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const decalage = texte.slice(0, texte.length - corps.length).split('\n').length - 1;
  let dansBlocCode = false;
  corps.split(/\r?\n/).forEach((ligne, i) => {
    if (/^\s*(```|~~~)/.test(ligne)) {
      dansBlocCode = !dansBlocCode;
      return;
    }
    if (dansBlocCode) return;
    const sansCodeEnLigne = ligne.replace(/`[^`]*`/g, '');
    const html = sansCodeEnLigne.match(/<(?!https?:\/\/)[a-zA-Z!\/?][^>]*>/);
    const lienDangereux = sansCodeEnLigne.match(/\]\(\s*<?\s*(?!https?:|#|\/|\.)[a-zA-Z][a-zA-Z0-9+.-]*:/);
    const ref = `${relative(process.cwd(), fichier)}:${decalage + i + 1}`;
    if (html) erreurs.push(`${ref}  HTML brut interdit : ${html[0].slice(0, 60)}`);
    if (lienDangereux) erreurs.push(`${ref}  lien non http(s) interdit : ${lienDangereux[0]}`);
  });
}

if (erreurs.length) {
  console.error('\n✖ Contenu refusé (sécurité) :\n  ' + erreurs.join('\n  ') + '\n');
  process.exit(1);
}
console.log('✔ Contenu vérifié : aucun HTML brut ni lien dangereux.');
