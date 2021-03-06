* _Updated document on February 19, 2020_

[![Known Vulnerabilities](https://snyk.io/test/github/napthees/nodejs-example-async/badge.svg?targetFile=package.json)](https://snyk.io/test/github/napthees/nodejs-example-async?targetFile=package.json)

[![License MIT](https://img.shields.io/badge/license-mit-blue.svg?longCache=true&style=for-the-badge)](https://github.com/napthees/nodejs-example-async/blob/master/LICENSE)

# Description de l'application "nodejs-example-async"

1. Un exemple de base pour lire un fichier de manière asynchrone avec le package async.
2. Deux scénarios possibles de traitement d'erreur pour exemple.

## INSTALLER ET DÉMARRER

En ligne de commande :
* Pour installer les packages
```bash
    > npm install
```
* Pour démarrer l’application
```bash
    > node readfile.js
```

## LE PACKAGE ASYNC

[![Coverage Status](https://coveralls.io/repos/caolan/async/badge.svg?branch=master)](https://coveralls.io/r/caolan/async?branch=master)
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/async/badge?style=rounded)](https://www.jsdelivr.com/package/npm/async)

## 1. EXEMPLE D'IMPLÉMENTATION ASYNCHRONE
_(ci-dessous avec récupération de données à partir de fichiers json)_

```javascript
// Objet qui contient les url des fichiers json à traiter
const objectDatas = {data0 : '/datas/data0.json', data1 : '/datas/data1.json'};
var configs = {};

/**
 * @function forEachOf - Parcourt un à un les éléments et transmet les données.
 * @param  {} objectDatas - Liste des URLs des fichiers
 * @param  {} value - Donnée transmise
 * @param  {} key - string | number
 * @param  {} callback - Convention d'utilisation pour les rappels en JavaScript
 */
async.forEachOf(objectDatas, (value, key, callback) => {

  fs.readFile(__dirname + value, "utf8", (erreur, pathData) => {

    if (erreur) return callback(erreur);

    try {

      // Converti en json l'objet récupéré
      configs[key] = JSON.parse(pathData);
      console.log('Les informations du fichier "' + key + '" ont été transmises et sont :');
      console.log(configs[key]);

    } catch (e) {

      // Retourne le message d'erreur s'il y a un problème à la lecture des données
      return callback(e);

    }

    // Retourne le résultat
    callback();

  });

}, erreur => {

  if (erreur) {
  
    // Récupère tout les messages d'erreur et les affiche dans la console
    console.log('Le message est :');
    console.log(erreur.message);

    /* Une métode peut être implémentée à partir de l'objet configs selon la ou les situation(s) */
    //creerFonctionAvec(configs);

  }

```
## 2. LA GESTION DES ERREURS
_(ci-dessous deux exemples d'erreurs possibles)_

### 2.1 Le type d'erreur "ENOENT"
**Il est généralement soulevé par les opérations fs pour indiquer qu'un composant du chemin spécifié n'existe pas.**
* _Exemple d'une erreur lié au chemin d'accès implémenté dans le fichier ./readfile.js :_
```javascript
// Objet qui contient les url des fichiers json à traiter
const objectDatas = {
  /* Une mauvaise url est en place pour l'attribut data0 */
  data0 : '/mauvaise/url/data.json',
  data1 : '/datas/data1.json'
  };
```
* _Résultat dans la console à partir de ```console.log(erreur)``` :_
```bash
{ Error: ENOENT: no such file or directory, open '/mauvaise/url/data.json'
errno: -2,
code: 'ENOENT',
syscall: 'open',
path: '/mauvaise/url/data.json' }
```

### 2.2 Le type d'erreur "SyntaxError"
**Il indique qu'un programme n'est pas du JavaScript valide.**
* _Exemple d'erreur de syntaxe implémenté dans le fichier ./datas/data0.json :_
```javascript
{
  /* Il manque la virgule à la fin de la prem!ère ligne */
  "id": 0
  "name": "data0"
}
```
* _Résultat dans la console à partir de ```console.log(erreur)``` :_
```bash
SyntaxError: Unexpected string in JSON at position 14
  at JSON.parse (<anonymous>)
  at fs.readFile (/Users/stephane/Desktop/Projets/nodejs-example-async-git/readfile.js:24:27)
  at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:511:3)
```
* _Pour plus d'information sur les types d'erreur dans nodejs, suivre le lien ci-dessous :_
https://nodejs.org/api/errors.html
