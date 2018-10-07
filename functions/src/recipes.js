// @flow
import { get } from './api';

function composeSentence(recipe: Object): string {
  let recipeText: string = "Pour faire un " + recipe.name + ", ";
  recipeText += buildIngredients(recipe.quantity);
  recipeText += recipe.recipe;
  return recipeText;
}

function buildIngredients(quantities: Array<Object>): string {
  let recipeText: string = "il vous faut ";

  quantities.forEach((quantity, index) => {
    recipeText += quantity.quantity + " " + quantity.unit;
    recipeText += " de " + quantity.drink.name;

    if (index !== quantities.length -1) {
      if (index === quantities.length - 2) {
        recipeText += " et "
      } else {
        recipeText += ', ';
      }
    }
  });
  recipeText += ". ";
  return recipeText;
}

function search(cocktail: string): Promise<Object> {
  return new Promise((r, re) => {
    get('/recipe?name=' + cocktail).then(response => {
      return r(response.data);
    }).catch(error => {
      re(new Error('No cocktail found'));
    });
  });
}

function findRecipe(name: string): Promise<string> {
  return new Promise((r, re) => {
    search(name).then((response: Object) => {
      return r(composeSentence(response))
    }).catch(error => {
      return r("Je ne connais pas le cocktail " + name);
    });
  });
}


export {
  search,
  composeSentence,
  buildIngredients,
  findRecipe,
 };
