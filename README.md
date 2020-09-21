# Hive Words

## Quick start

```
npm run serve // Compiles and hot-reloads for development
npm run build // Compiles and minifies for production
npm run lint
```

## To-do

**Env** 
- [ ] Flag for local DB

**Design**
- [x] On key press, animate active
- [ ] Design update: Mobile layout, puzzle switcher, multi-user, hints
- [ ] Add limit to word length

**Data**
- [ ] Test fetching users and display on login
- [ ] Add basic milestones (genius, et al)
- [ ] Support puzzle switching, persist puzzle data

**Real-time**
- [ ] Use socket.io to relay word additions between players
- [ ] Design distinct notifications for real-time.

**Security**
- [ ] API authentication

**Puzzles**
- [ ] Auto-gen puzzles

**Before sharing**
- [ ] Update design to prevent any confusion with the original NYT game.
- [ ] Give credit where credits are due for game design.


## API 

### Quick reference


```
GET    /users                list users
---
XGET    /puzzles              listPuzzles
XPOST   /puzzles              createPuzzle
GET    /puzzles/:id          showPuzzle
# GET  /puzzles/:id/progress show progress
---
GET    /progress/:id
PUT    /progress/:id
GET    /progress?puzzle=:id
# GET    /progress?user=:id
GET    /progress?user=:id&puzzle=:id
---
```

## PostgresSQL tables

**users**
- id: Integer (primary key, serial)
- name: String

**puzzles**
- id: Integer (primary key, serial)
- name: String
- config: JSON

config
- centerLetter: String
- outerLetters: [String]
- answers: [String]

**user_puzzle**
- id: Integer (primary key, serial)
- puzzleId: Integer (foreign key)
- userId: Integer (foreign key)
- progress: JSON

progress
- foundWords: [String]
- hint: Boolean
- revealed: Boolean

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
