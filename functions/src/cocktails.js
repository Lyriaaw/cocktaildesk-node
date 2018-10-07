// @flow
import { get } from './api';


const sentences = [
  {sentence: "Je peux vous proposer ##.", pronoun: 'le', linker: 'et'},
  {sentence: "## devraient vous plaire.", pronoun: 'le', linker: 'ou'},
  {sentence: "Je pense ##.", pronoun: 'au', linker: 'ou'},
  {sentence: "Que diriez-vous ## ?", pronoun: 'du', linker: 'ou'},
];

const advise = (drink: string): Promise<string> => {
  return new Promise((r, re) => {
    search(drink).then(response => {
      return r(buildCocktailSentence(response))
    }).catch(error => {
      return r("Je n'ai pas trouvé de recette avec du " + drink);
    });

  });
}

function findRandomIndex(): number {
  return Math.floor(Math.random() * sentences.length);
}

function buildCocktailSentence(cocktails: Array<{name: string}>): string {
  let sentence = sentences[findRandomIndex()];

  let cocktailsString = "";

  cocktails.forEach((cocktail, index) => {
    cocktailsString += sentence.pronoun + ' ' + cocktail.name;

    if (index !== cocktails.length -1) {
      if (index === cocktails.length - 2) {
        cocktailsString += ' ' + sentence.linker + ' ';
      } else {
        cocktailsString += ', ';
      }
    }
  });

  let builtSentence = sentence.sentence.replace('##', cocktailsString);
  builtSentence = builtSentence.charAt(0).toUpperCase() + builtSentence.substr(1);

  return builtSentence;
}


function search(drink: string): Promise<Array<{name: string}>> {
  return new Promise((r, re) => {
    get('/drink?name=' + drink).then(response => {
      return r(response.data);
    }).catch(error => {
      re(new Error('No cocktail found'));
    });
  });
}



export {
  search,
  findRandomIndex,
  sentences,
  advise,
 };
