'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRecipe = exports.buildIngredients = exports.composeSentence = exports.search = undefined;

var _api = require('./api');

function findRecipe(name) {
  return new Promise(function (r, re) {
    search(name).then(function (response) {
      return r(composeSentence(response));
    }).catch(function (error) {
      return r('Je ne connais pas le cocktail ' + name);
    });
  });
}


function search(cocktail) {
  return new Promise(function (r, re) {
    (0, _api.get)('/recipe?name=' + cocktail).then(function (response) {
      return r(response.data);
    }).catch(function (error) {
      re(new Error('No cocktail found'));
    });
  });
}

function composeSentence(recipe) {
  var recipeText = 'Pour faire un ' + recipe.name + ', ';
  recipeText += buildIngredients(recipe.quantity);
  recipeText += recipe.recipe;
  return recipeText;
}

function buildIngredients(quantities) {
  var recipeText = 'il vous faut ';

  quantities.forEach(function (quantity, index) {
    recipeText += quantity.quantity + ' ' + quantity.unit + ' de ' + quantity.drink.name;

    // Nothing at the end of the list
    if (index !== quantities.length - 1) {
      // Linker word for the before last, comma for everything else
      recipeText += index === quantities.length - 2 ? ' et ' : ', ';
    }
  });

  recipeText += '. ';
  return recipeText;
}

exports.search = search;
exports.composeSentence = composeSentence;
exports.buildIngredients = buildIngredients;
exports.findRecipe = findRecipe;