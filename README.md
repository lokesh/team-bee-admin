# 🐝Team Bee Admin


## 🛠 To-do

- [ ] Make sure not to save a combo of letters that was prev userd.



## 👨‍💻 Local development

### Quick reference

```
npm run serve // Compiles and hot-reloads for development
npm run build // Compiles and minifies for production
npm run lint
npm run dictionary // Builds dictionary.json
```

## 📖 Word lists

The list used is for building an answers list is constructed as follows:

1. Start with usa-61k.json
2. Add usa-10k.json: 10,000 most frequently used English words
3. Add custom.json: Short, manually compiled list of words
4. Filter bad words
5. Filter words shorter than 4 characters
6. Filter words that use more than


### USA English 10,000 words with highest frequency usage
`usa-10k.json`

Source: [https://github.com/first20hours/google-10000-english](https://github.com/first20hours/google-10000-english)


### USA English 61,000 words
`usa-61k.json`

Missing: cootie, ecotone, iconic, neocon, nonce, nontoxic, toon, toonie, convoyed, cocooned, coed, condo.


### English - 194,000 words
`eng-194k.txt`

Missing: ecotone, neocon, and toonies.

Source: [http://www.gwicks.net/dictionaries.htm](http://www.gwicks.net/dictionaries.htm)

### English - 466,000 words
`eng-466k.json`

Missing: neocon and toonie.

Source: [https://github.com/dwyl/english-words](https://github.com/dwyl/english-words)


### Bad words
`bad-words.json`

Sources:
- [https://github.com/MauriceButler/badwords](https://github.com/MauriceButler/badwords)
- [https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words)
