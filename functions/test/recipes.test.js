import assert from 'assert';
import {
  search,
  composeSentence,
  buildIngredients,
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

  it('Should build ingredients string', async () => {
    const recipe = await search('Jager bomb');
    assert.equal(buildIngredients(recipe.quantity), "il vous faut 4 cl de Jagermeister et 6 cl de Redbull. ");
  });






});
