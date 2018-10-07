// @flow

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const  { advise } = require('./lib/cocktails');


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
  conv.ask('Ah, tu veux une recette !!');
});





exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
