'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.advise = exports.sentences = exports.findRandomIndex = exports.search = undefined;

var _api = require('./api');

function advise(drink) {
  return new Promise(function (r, re) {
    search(drink).then(function (response) {
      return r(buildCocktailSentence(response));
    }).catch(function (error) {
      return r('Je n\'ai pas trouv\xE9 de recette avec du ' + drink);
    });
  });
}


function search(drink) {
  return new Promise(function (r, re) {
    (0, _api.get)('/drink?name=' + drink).then(function (response) {
      return r(response.data);
    }).catch(function (error) {
      re(new Error('No cocktail found'));
    });
  });
}

var sentences = [{ sentence: 'Je peux vous proposer ##.', pronoun: 'le', linker: 'et' }, { sentence: '## devraient vous plaire.', pronoun: 'le', linker: 'ou' }, { sentence: 'Je pense ##.', pronoun: 'au', linker: 'ou' }, { sentence: 'Que diriez-vous ## ?', pronoun: 'du', linker: 'ou' }];

function buildCocktailSentence(cocktails) {
  var sentence = sentences[findRandomIndex()];
  var cocktailsString = "";

  cocktails.forEach(function (cocktail, index) {
    cocktailsString += sentence.pronoun + ' ' + cocktail.name;

    // Nothing at the end of the list
    if (index !== cocktails.length - 1) {
      // Linker word for the before last, comma for everything else
      cocktailsString += index === cocktails.length - 2 ? ' ' + sentence.linker + ' ' : ', ';
    }
  });

  var builtSentence = sentence.sentence.replace('##', cocktailsString);

  // Let's respect some basic human language rules
  builtSentence = builtSentence.charAt(0).toUpperCase() + builtSentence.substr(1);

  return builtSentence;
}

function findRandomIndex() {
  return Math.floor(Math.random() * sentences.length);
}

exports.search = search;
exports.findRandomIndex = findRandomIndex;
exports.sentences = sentences;
exports.advise = advise;