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
    assert.equal(typeof recipe, 'object');
  });

  it('Should return a jager bomb', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(recipe.name, 'Jager bomb');
  });

  it('Should contains quantities', async () => {
    const recipe = await search('Jager bomb');
    assert(recipe.quantity.length != 0);
  });

  it('Should build ingredients with \'et\'', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(buildIngredients(recipe.quantity), 'il vous faut 4 cl de jagermeister et 6 cl de redbull. ');
  });

  it('Should build ingredients with \',\'', async () => {
    const recipe = await search('Gin Tonic');
    assert.equal(buildIngredients(recipe.quantity), 'il vous faut 5 cl de gin, 5 cl de schweppes et 1 cl de jus de citron. ');
  });

  it('Should return a string', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(typeof composeSentence(recipe), 'string');
  });

  it ('Should return a complete recipe', async () => {
    const recipe = await findRecipe('Jager bomb');
    assert.equal(recipe, 'Pour faire un Jager bomb, il vous faut 4 cl de jagermeister et 6 cl de redbull. Versez le Jager, Placez une bombe, Dégustez');
  });

  it('Should not found any cocktail', async () => {
    const recipe = await findRecipe('fezkjhbzef');
    assert.equal(recipe, 'Je ne connais pas le cocktail fezkjhbzef');
  });


});
