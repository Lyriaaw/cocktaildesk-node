// @flow

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const  { advise } = require('./lib/cocktails');
const { findRecipe } = require('./lib/recipes');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = dialogflow()

app.intent('search_cocktail', (conv, {drink}) => {
  console.log('Searching cocktails');
  return new Promise((r, re) => {
    advise(drink).then(response => {
      console.log('Found cocktail ', response);
      conv.ask(response);
      r();
    }).catch(error => {
      conv.ask('error');
      r();
    });
  })
});

app.intent('get_recipe', (conv, {cocktail}) => {
  console.log('Asking for a recipe of ' + cocktail);

  return new Promise((r, re) => {
    findRecipe(cocktail).then(response => {
      console.log('Found recipe : ' + response);
      conv.ask(response);
      return r();
    }).catch(error => {
      conv.ask('Error');
      return r();
    });
  });
});





exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
