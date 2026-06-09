# 🚀 Mise en ligne & édition du site — guide pas à pas

Ce guide te conduit de zéro jusqu'au site en ligne sur `recrutementprestant.com`,
puis explique comment éditer les contenus dans le temps via le back-office `/admin`.

> Tu auras besoin de 3 comptes : **GitHub** (héberge le code), **Vercel** (héberge le
> site, gratuit), et l'accès à ton espace **Squarespace** (pour le domaine).
> Pour les formulaires de contact, un compte **Resend** (gratuit) est recommandé.

---

## Étape 1 — Mettre le code sur GitHub

1. Crée un compte sur [github.com](https://github.com) si besoin.
2. Crée un **nouveau dépôt vide** nommé `recrutement-prestant` (Private de préférence),
   **sans** README ni .gitignore.
3. Le projet est déjà initialisé en Git en local. Dans un terminal, à la racine du
   dossier `recrutement-prestant` :

   ```bash
   git remote add origin https://github.com/VOTRE-COMPTE/recrutement-prestant.git
   git push -u origin main
   ```

   *(remplace `VOTRE-COMPTE` par ton identifiant GitHub)*

---

## Étape 2 — Déployer sur Vercel

1. Crée un compte sur [vercel.com](https://vercel.com) (connexion via GitHub conseillée).
2. **Add New → Project** → importe le dépôt `recrutement-prestant`.
3. Vercel détecte **Astro** automatiquement (build `astro build`, sortie `dist`). Ne change rien.
4. Clique **Deploy**. Au bout d'~1 min, tu obtiens une URL de test du type
   `recrutement-prestant.vercel.app` → **vérifie tout le site dessus** avant de brancher le domaine.

---

## Étape 3 — Variables d'environnement (formulaires de contact)

Les boutons « Postuler » des offres renvoient vers **Beetween** et fonctionnent
sans configuration. Seuls les **formulaires spontané / contact** ont besoin d'un envoi d'email :

1. Crée un compte [resend.com](https://resend.com) et **vérifie ton domaine** `prestant.com`
   (ou utilise un sous-domaine d'envoi). Génère une **clé API**.
2. Dans Vercel : **Project → Settings → Environment Variables**, ajoute :

   | Nom | Valeur |
   |---|---|
   | `RESEND_API_KEY` | ta clé API Resend |
   | `RESEND_FROM` | `Recrutement Prestant <recrutement@prestant.com>` |
   | `CONTACT_EMAIL` | `sandy.miranda@prestant.com` |
   | `BETWEEN_INTAKE_EMAIL` | *(optionnel)* adresse d'intake Beetween |

3. **Redeploy** le projet pour appliquer les variables.

> Tant que ces variables ne sont pas définies, seuls les formulaires spontané/contact
> renvoient un message d'erreur ; le reste du site (et les candidatures Beetween) fonctionne.

---

## Étape 4 — Brancher le domaine `recrutementprestant.com`

Ton domaine reste **chez Squarespace** ; on change seulement où il pointe.

1. Dans **Vercel** : **Project → Settings → Domains** → ajoute `recrutementprestant.com`
   **et** `www.recrutementprestant.com`. Vercel affiche les enregistrements DNS à créer.
2. Connecte-toi à **Squarespace → Settings → Domains** → sélectionne le domaine →
   **DNS Settings** (enregistrements personnalisés) et ajoute :

   | Type | Hôte | Valeur |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   *(utilise les valeurs exactes affichées par Vercel si elles diffèrent)*
3. **Ne modifie pas les enregistrements `MX`** (ils gèrent la messagerie email, pas le site).
4. Patiente le temps de la propagation DNS (de quelques minutes à ~48 h). Le **certificat
   HTTPS est généré automatiquement** par Vercel.

> ⚠️ Dès que le DNS pointe vers Vercel, l'ancien site Squarespace n'est plus servi sur ce
> domaine. Tu peux conserver l'abonnement Squarespace uniquement pour le **nom de domaine**.

---

## Étape 5 — Activer le back-office `/admin`

Le site embarque un CMS visuel (Sveltia) sur `https://recrutementprestant.com/admin`.
**Avant la première connexion**, indique-lui ton dépôt :

- Ouvre `public/admin/config.yml` et remplace `VOTRE-COMPTE/recrutement-prestant`
  par ton vrai dépôt (ex. `prestant/recrutement-prestant`). Commit + push (ou édite-le
  directement sur GitHub). Vercel redéploie tout seul.

Ensuite, deux façons de te connecter — **la plus simple d'abord** :

### Option A (recommandée pour 1 personne) — jeton d'accès GitHub
1. Sur GitHub : **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate**.
2. Donne-lui accès au **dépôt `recrutement-prestant`** avec la permission
   **Contents : Read and write**.
3. Sur `/admin`, clique **« Sign In Using Access Token »** et colle le jeton. C'est tout.

### Option B — connexion « Sign In with GitHub » (1 clic, pour plusieurs éditeurs)
1. GitHub : **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - *Homepage URL* : `https://recrutementprestant.com`
   - *Authorization callback URL* : `https://recrutementprestant.com/api/callback`
2. Récupère le **Client ID** et génère un **Client Secret**.
3. Dans Vercel (Environment Variables) ajoute puis redéploie :

   | Nom | Valeur |
   |---|---|
   | `OAUTH_GITHUB_CLIENT_ID` | le Client ID |
   | `OAUTH_GITHUB_CLIENT_SECRET` | le Client Secret |

4. Sur `/admin`, clique **« Sign In with GitHub »**.

> 💡 Tu peux aussi éditer sans rien mettre en ligne : sur `/admin` en local, le bouton
> **« Work with Local Repository »** ouvre directement les fichiers de ton dossier.

---

## ✅ Checklist de mise en ligne

- [ ] Code poussé sur GitHub
- [ ] Projet déployé sur Vercel (URL `.vercel.app` validée)
- [ ] Variables Resend ajoutées + redeploy (formulaires testés)
- [ ] `config.yml` : dépôt GitHub renseigné
- [ ] Domaine + DNS configurés chez Squarespace
- [ ] HTTPS actif sur `recrutementprestant.com`
- [ ] Connexion au back-office `/admin` réussie
- [ ] (Quand prêtes) vraies vidéos, textes outils/formation, n° d'appel

---

## ✍️ Éditer le contenu au quotidien

Rends-toi sur **`recrutementprestant.com/admin`** et connecte-toi. Tu peux gérer :

- **Articles (blog)** — créer / modifier des articles, avec image de couverture.
- **Témoignages** — ajouter une vidéo (coller l'ID YouTube), choisir le thème.
- **Offres d'emploi** — éditer le résumé et le lien de candidature Beetween.

Chaque enregistrement déclenche **automatiquement** une nouvelle mise en ligne (~1 min).

> Les offres et candidatures elles-mêmes restent gérées dans **Beetween** ; le site n'affiche
> qu'un résumé et renvoie vers tes annonces Beetween pour postuler.

Les textes de structure des pages (rémunération, outils & formation, etc.) vivent dans le
code : pour ces modifications-là, sollicite ton développeur ou demande-moi.
