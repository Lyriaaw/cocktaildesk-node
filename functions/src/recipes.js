// @flow
import { get } from './api';

function composeSentence(recipe: Object): string {
  console.log('Coposing sentence for', recipe);

  let recipeText: string = "Voici la recette du " + recipe.name + ": ";

  recipeText += buildIngredients(recipe.quantity);

  recipeText += recipe.recipe;

  console.log('Recipe text : ', recipeText);
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
      return re(new Error('No cocktail found'));
    });
  });
}

function find_recipe(name: string): Promise<string> {
  return new Promise((r, re) => {
    search(name).then((response) => {
      return r(composeSentence(response))
    }).catch(error => {
      return re(error);
    });
  });
}


export {
  search,
  composeSentence,
  buildIngredients,
 };
