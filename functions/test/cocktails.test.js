import assert from 'assert';
import {
   search,
   findRandomIndex,
   sentences,
   advise,
 } from '../src/cocktails';

describe('Cocktails', () => {
  it('Cocktail with schweppes should return Montélimard in first place', async () => {
    const result = await search('schweppes');
    assert.equal(result[0].name, "Montélimard");
  });

  it('Cocktail with schweppes should return a string', async () => {
    const result = await advise('schweppes');
    assert.equal(typeof result, "string");
  });

  it('Should give random index inside the array of sentences', () => {
    for (let it = 0; it < 100; it++) {
      assert(findRandomIndex() < sentences.length)
    }
  });

  it('Should return a string', async () => {
    const foundSentence = await advise('schweppes');
    assert(typeof foundSentence == "string");
  });

  it('Should find nothing', async () => {
    const foundSentence = await advise('fzekjfhvzekjzhef');
    assert.equal(foundSentence, "Je n'ai pas trouvé de cocktail pour vous");
  });
});
