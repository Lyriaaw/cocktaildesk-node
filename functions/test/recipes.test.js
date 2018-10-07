import assert from 'assert';
import {
  search,
  composeSentence,
  buildIngredients,
  findRecipe,
 } from '../src/recipes';


describe('Recipes', () => {
  it('Should return an object', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(typeof recipe, "object");
  });

  it('Should return a jager bomb', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(recipe.name, "Jager bomb");
  });

  it('Should contains quantities', async () => {
    const recipe = await search('Jager bomb');
    assert(recipe.quantity.length != 0);
  });

  it('Should build ingredients with \'et\'', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(buildIngredients(recipe.quantity), "il vous faut 4 cl de Jagermeister et 6 cl de Redbull. ");
  });

  it('Should build ingredients with \',\'', async () => {
    const recipe = await search('Montelimard');
    assert.equal(buildIngredients(recipe.quantity), "il vous faut 5 cl de Gin, 5 cl de Schweppes et 0.1 cl de Jus de citron. ");
  });

  it('Should return a string', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(typeof composeSentence(recipe), "string");
  });

  // it('Should throw an error', async () => {
  //   const response = await search('fzekjfhvzekjzhef');
  //   console.log('Error ? ', response);
  //   assert.throws(response, Error, "No cocktail found");
  // });

  it('Should not found any cocktail', async () => {
    const recipe = await findRecipe('fezkjhbzef');
    assert.equal(recipe, "Je ne connais pas le cocktail fezkjhbzef");
  });
});
