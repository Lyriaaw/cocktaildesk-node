// @flow
import { get } from './api';

function advise(drink: string): Promise<string> {
  return new Promise((r, re) => {
    search(drink).then(response => {
      return r(buildCocktailSentence(response))
    }).catch(error => {
      return r(`Je n'ai pas trouvé de recette avec du ${drink}`);
    });

  });
}

function search(drink: string): Promise<Array<{name: string}>> {
  return new Promise((r, re) => {
    get(`/drink?name=${drink}`).then(response => {
      return r(response.data);
    }).catch(error => {
      re(new Error('No cocktail found'));
    });
  });
}


const sentences = [
  {sentence: 'Je peux vous proposer ##.', pronoun: 'le', linker: 'et'},
  {sentence: '## devraient vous plaire.', pronoun: 'le', linker: 'ou'},
  {sentence: 'Je pense ##.', pronoun: 'au', linker: 'ou'},
  {sentence: 'Que diriez-vous ## ?', pronoun: 'du', linker: 'ou'},
];

function buildCocktailSentence(cocktails: Array<{name: string}>): string {
  let sentence = sentences[findRandomIndex()];
  let cocktailsString: string = "";

  cocktails.forEach((cocktail, index) => {
    cocktailsString += `${sentence.pronoun} ${cocktail.name}`;

    // Nothing at the end of the list
    if (index !== cocktails.length -1) {
      // Linker word for the before last, comma for everything else
      cocktailsString += (index === cocktails.length - 2) ? ` ${sentence.linker} ` : ', ';
    }

  });

  let builtSentence = sentence.sentence.replace('##', cocktailsString);

  // Let's respect some basic human language rules
  builtSentence = builtSentence.charAt(0).toUpperCase() + builtSentence.substr(1);

  return builtSentence;
}

function findRandomIndex(): number {
  return Math.floor(Math.random() * sentences.length);
}



export {
  search,
  findRandomIndex,
  sentences,
  advise,
 };
