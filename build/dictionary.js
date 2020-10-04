const fetch = require('node-fetch');
const fs = require('fs');
const { resolve } = require('path');``

// Files
const US_ENGLISH_JSON = resolve(process.cwd(), './public/data/usa-61k.json')
const COMMON_WORDS_TXT = resolve(process.cwd(), './public/data/usa-10k.txt')
const CUSTOM_ADD_TXT = resolve(process.cwd(), './public/data/custom-add.txt')
const CUSTOM_REMOVE_TXT = resolve(process.cwd(), './public/data/custom-remove.txt')
const BAD_WORDS_TXT = resolve(process.cwd(), './public/data/bad-words.txt')
const DICTIONARY_JSON = resolve(process.cwd(), './public/data/dictionary.json')

function appendFromTextFile(file) {
  const str = fs.readFileSync(file, 'utf-8');
  const arr = str.split('\n');
  arr.forEach(word => {
    dictionary.push(word);
  })
}

function removeFromTextFile(file) {
  const str = fs.readFileSync(file, 'utf-8');
  const arr = str.split('\n');
  arr.forEach(word => {
    let index = dictionary.indexOf(word);
    if (index !== -1) {
      dictionary.splice(index, 1);
    }
  })
}


async function main() {

  // Start with 61,000 US English words data set
  const data = JSON.parse(fs.readFileSync(US_ENGLISH_JSON, 'utf-8'));
  dictionary = Object.keys(data);

  // Add 10,000 most frequently used English words
  appendFromTextFile(COMMON_WORDS_TXT);

  // Add manually compiled list of words
  appendFromTextFile(CUSTOM_ADD_TXT);

  // Dedupe
  const set = new Set(dictionary);
  dictionary = [...set];

  // Remove words manually chosen for deleting
  removeFromTextFile(CUSTOM_REMOVE_TXT);

  // Filter bad words
  removeFromTextFile(BAD_WORDS_TXT);

  // Filter words shorter than 4 characters
  dictionary = dictionary.filter(word => {
    return word.length >= 4;
  })

  // Filter words that use more than 7 unique characters
  dictionary = dictionary.filter(word => {
    return new Set(word.split('')).size <= 7;
  })

  fs.writeFileSync(DICTIONARY_JSON, JSON.stringify(dictionary, null, 2));
  console.log('Success:', DICTIONARY_JSON);
}

// Global
let dictionary = [];

// Initialize
main();
