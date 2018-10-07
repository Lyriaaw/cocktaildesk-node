// @flow

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const  { advise } = require('./lib/cocktails');
const { findRecipe } = require('./lib/recipes');

const app = dialogflow()

app.intent('search_cocktail', (conv, {drink}) => {
  return new Promise((r, re) => {
    advise(drink).then(response => {
      conv.ask(response);
      r();
    }).catch(error => {
      conv.ask('Je ne parviens pas à trouver de cocktail');
      r();
    });
  })
});

app.intent('get_recipe', (conv, {cocktail}) => {
  return new Promise((r, re) => {
    findRecipe(cocktail).then(response => {
      conv.ask(response);
      return r();
    }).catch(error => {
      conv.ask('Je ne parviens pas à trouver la recette');
      return r();
    });
  });
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
