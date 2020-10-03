const fetch = require('node-fetch');
const fs = require('fs');
const { resolve } = require('path');``

// Files
const US_ENGLISH_JSON = resolve(process.cwd(), './public/data/usa-61k.json')
const COMMON_WORDS_TXT = resolve(process.cwd(), './public/data/usa-10k.txt')
const CUSTOM_ADD_TXT = resolve(process.cwd(), './public/data/custom-add.txt')
const BAD_WORDS_TXT = resolve(process.cwd(), './public/data/bad-words.txt')
const DICTIONARY_JSON = resolve(process.cwd(), './public/data/dictionary.json')

function appendFromTextFile(file) {
  const str = fs.readFileSync(file, 'utf-8');
  const arr = str.split('\n');
  arr.forEach(word => {
    dictionary.push(word);
  })
}

async function main() {

  // 1. Start with 61,000 US English words data set
  const data = JSON.parse(fs.readFileSync(US_ENGLISH_JSON, 'utf-8'));
  dictionary = Object.keys(data);
  // -- 61337 words --


  // 2. Add 10,000 most frequently used English words
  appendFromTextFile(COMMON_WORDS_TXT);
  // -- 71337 words --


  // 3. Add custom.json: Short, manually compiled list of words
  appendFromTextFile(CUSTOM_ADD_TXT);
  // -- 71348 words --

  // 4. Dedupe
  const set = new Set(dictionary);
  dictionary = [...set];
  // -- 62698 words --

  // 4. Filter bad words
  const badStr = fs.readFileSync(BAD_WORDS_TXT, 'utf-8');
  const badArr = badStr.split('\n');
  badArr.forEach(word => {
    let index = dictionary.indexOf(word);
    if (index !== -1) {
      dictionary.splice(index, 1);
    }
  })
  // -- 62513 words --

  // 5. Filter words shorter than 4 characters
  dictionary = dictionary.filter(word => {
    return word.length >= 4;
  })
  // -- 61142 words --

  // 6. Filter words that use more than 7 unique characters
  dictionary = dictionary.filter(word => {
    return new Set(word.split('')).size <= 7;
  })
  // -- 39048 words--

  fs.writeFileSync(DICTIONARY_JSON, JSON.stringify(dictionary, null, 2));
  console.log('Success:', DICTIONARY_JSON);
}

// Global
let dictionary = [];

// Initialize
main();
