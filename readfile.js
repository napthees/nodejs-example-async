const fs = require('fs');
const async = require('async');

// Objet qui contient les url des fichiers json à traiter
const objectDatas = {data0 : '/datas/data0.json', data1 : '/datas/data1.json'};
var configs = {};

/**
 * @function forEachOf - Parcourt un à un les éléments et transmet les données.
 * @param  {} objectDatas - Liste des URLs des fichiers.
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

});
