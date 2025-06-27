# Marvelab Google Doc Extension

## Présentation du Projet

Marvelab Google Doc est une extension pour Google Docs qui permet d'intégrer des fonctionnalités Marvel dans vos documents. Cette extension facilite l'accès aux informations sur les personnages, comics et autres éléments de l'univers Marvel directement depuis votre document Google.

## Structure du Projet

Le projet est organisé en trois parties principales :

### 1. API (`/api`)
Backend développé avec NestJS qui fournit les données Marvel nécessaires à l'extension. L'API se connecte à une base de données PostgreSQL pour stocker et récupérer les informations.

### 2. Google Apps Scripts (`/google-apps-scripts`)
Contient les fichiers nécessaires pour l'extension Google Docs :
- `ApiService.gs` : Service pour communiquer avec l'API
- `Code.gs` : Logique principale de l'extension
- `script.html` : Scripts côté client
- `sidebar.html` : Interface utilisateur de la barre latérale
- `styles.html` : Styles CSS pour l'interface

### 3. Website (`/website`)
Interface web complémentaire développée avec Nuxt.js.

## Guide d'Installation et Configuration

### Configuration de l'API

1. **Prérequis**
   - Node.js et npm installés
   - PostgreSQL et pgAdmin installés

2. **Installation de la base de données**
   - Installer PostgreSQL et pgAdmin
   - Créer un utilisateur PostgreSQL avec le mot de passe `root` (selon les valeurs dans `.env.example`)
   - Créer une base de données nommée `marvelab` (ou selon votre configuration)

3. **Configuration de l'API**
   - Naviguer vers le dossier `api`
   - Copier `.env.example` vers `.env` et ajuster les paramètres si nécessaire
   - **Important** : Ajouter votre propre clé API Gemini dans le fichier `.env` avec la variable `GEMINI_API_KEY=VOTRE_CLE_API`
   - Installer les dépendances :
     ```
     npm install
     ```
   - Générer les données initiales :
     ```
     npm run seed
     ```
   - Démarrer l'API en mode développement :
     ```
     npm run start:dev
     ```

4. **Création d'un tunnel pour l'accès externe**
   - Installer localtunnel globalement :
     ```
     npm install -g localtunnel
     ```
   - Créer un tunnel avec un sous-domaine personnalisé :
     ```
     lt --port 3000 --subdomain marvelab-api
     ```
   - Conserver l'URL générée pour la configuration de l'extension

### Installation de l'Extension Google Docs

1. **Créer un nouveau projet Apps Script**
   - Ouvrir un fichier Google Docs
   - Cliquer sur l'onglet "Extensions" puis sur "Apps Script"
   - Créer une nouvelle application Apps Script

2. **Copier les fichiers de l'extension**
   - Dans le projet Apps Script, créer les fichiers suivants en copiant le contenu depuis le dossier `google-apps-scripts` :
     - `ApiService.gs`
     - `Code.gs`
     - `script.html`
     - `sidebar.html`
     - `styles.html`

3. **Déployer l'extension**
   - Dans l'interface Apps Script, cliquer sur "Déployer" puis "Nouveau déploiement"
   - Sélectionner "Application web" comme type de déploiement
   - Configurer les options d'accès (généralement "Tous" pour "Qui a accès")
   - Cliquer sur "Déployer"
   - Copier l'URL de déploiement générée et s'y rendre pour vérifier le déploiement

4. **Utiliser l'extension**
   - Recharger le document Google Docs
   - L'extension devrait maintenant être disponible dans le menu "Extensions"

### Configuration du Website (Optionnel)

Si vous souhaitez utiliser l'interface web complémentaire :

1. Naviguer vers le dossier `website`
2. Installer les dépendances :
   ```
   npm install
   ```
3. Démarrer le serveur de développement :
   ```
   npm run dev
   ```

## Dépannage

- Si l'extension ne se charge pas, vérifiez que l'API est bien accessible via le tunnel localtunnel
- Assurez-vous que les permissions sont correctement configurées dans le déploiement Apps Script
- Vérifiez les journaux de console dans l'éditeur Apps Script pour identifier d'éventuelles erreurs

## Contribution

Pour contribuer au projet, veuillez créer une branche à partir de main, apporter vos modifications, puis soumettre une pull request.
