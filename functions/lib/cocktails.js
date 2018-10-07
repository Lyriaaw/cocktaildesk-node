'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.advise = exports.sentences = exports.findRandomIndex = exports.search = undefined;

var _api = require('./api');

var sentences = [{ sentence: "Je peux vous proposer ##.", pronoun: 'le', linker: 'et' }, { sentence: "## devraient vous plaire.", pronoun: 'le', linker: 'ou' }, { sentence: "Je pense ##.", pronoun: 'au', linker: 'ou' }, { sentence: "Que diriez-vous ## ?", pronoun: 'du', linker: 'ou' }];


var advise = function advise(drink) {
  return new Promise(function (r, re) {
    search(drink).then(function (response) {
      return r(buildCocktailSentence(response));
    }).catch(function (error) {
      return r("Je n'ai pas trouvé de recette avec du " + drink);
    });
  });
};

function findRandomIndex() {
  return Math.floor(Math.random() * sentences.length);
}

function buildCocktailSentence(cocktails) {
  var sentence = sentences[findRandomIndex()];

  var cocktailsString = "";

  cocktails.forEach(function (cocktail, index) {
    cocktailsString += sentence.pronoun + ' ' + cocktail.name;

    if (index !== cocktails.length - 1) {
      if (index === cocktails.length - 2) {
        cocktailsString += ' ' + sentence.linker + ' ';
      } else {
        cocktailsString += ', ';
      }
    }
  });

  var builtSentence = sentence.sentence.replace('##', cocktailsString);
  builtSentence = builtSentence.charAt(0).toUpperCase() + builtSentence.substr(1);

  return builtSentence;
}

function search(drink) {
  return new Promise(function (r, re) {
    (0, _api.get)('/drink?name=' + drink).then(function (response) {
      return r(response.data);
    }).catch(function (error) {
      return r(new Error('No cocktail found'));
    });
  });
}

exports.search = search;
exports.findRandomIndex = findRandomIndex;
exports.sentences = sentences;
exports.advise = advise;