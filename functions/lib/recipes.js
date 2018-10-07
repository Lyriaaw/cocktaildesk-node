'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildIngredients = exports.composeSentence = exports.search = undefined;

var _api = require('./api');

function composeSentence(recipe) {
  console.log('Coposing sentence for', recipe);

  var recipeText = "Voici la recette du " + recipe.name + ": ";

  recipeText += buildIngredients(recipe.quantity);

  recipeText += recipe.recipe;

  console.log('Recipe text : ', recipeText);
  return recipeText;
}


function buildIngredients(quantities) {
  var recipeText = "il vous faut ";

  quantities.forEach(function (quantity, index) {
    recipeText += quantity.quantity + " " + quantity.unit;
    recipeText += " de " + quantity.drink.name;

    if (index !== quantities.length - 1) {
      if (index === quantities.length - 2) {
        recipeText += " et ";
      } else {
        recipeText += ', ';
      }
    }
  });
  recipeText += ". ";
  return recipeText;
}

function search(cocktail) {
  return new Promise(function (r, re) {
    (0, _api.get)('/recipe?name=' + cocktail).then(function (response) {
      return r(response.data);
    }).catch(function (error) {
      return re(new Error('No cocktail found'));
    });
  });
}

function find_recipe(name) {
  return new Promise(function (r, re) {
    search(name).then(function (response) {
      return r(composeSentence(response));
    }).catch(function (error) {
      return re(error);
    });
  });
}

exports.search = search;
exports.composeSentence = composeSentence;
exports.buildIngredients = buildIngredients;