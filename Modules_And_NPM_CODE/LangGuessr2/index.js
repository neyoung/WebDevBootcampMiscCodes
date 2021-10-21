// Description: This is my attempt 
const franc = require('franc');
const langs = require('langs');
const colors = require('colors');
const input = process.argv[2];

console.log('Welcome to the Language Guesser App. Please enter some text and the application will return the language name.'.blue);

// Checks that an argument was entered
if (input) {
    let languageCode = franc(input);
    // console.log(languageCode);
    if(languageCode === 'und')
        console.log('Could not match a language. Please try again with a larger sample.'.red);
    else {
        let language = langs.where("3", languageCode);
        console.log(language.name.green);
    }
}