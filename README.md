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
- [ ] Add feedback when delete, shuffle, and enter are pressed with kbd

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


## Brainstorming

Localstorage:
User Id

### 1. Is user set?
No -> Forward to login screen.
TODO: Router guard

Once user chosen, update in store:
user: id, name

### 2. Load data upfront

- Load user list
- Load puzzle list

users: [id, name]
puzzles: [id, name, date]

- Set current puzzle as puzzle who has latest date that is not in future

puzzle: id, name, date, config, userProgress



// getters
userProgress




## API

### Quick reference

```
GET    /users
GET    /users/:id
GET    /users/:id/puzzles/:id
PUT    /users/:id/puzzles/:id // Not implemented
GET    /puzzles
POST   /puzzles
GET    /puzzles/:id
```

```
// API graveyard
GET /progress/:id
PUT /progress/:id
GET /progress?puzzle=:id
GET /progress?user=:id
GET /progress?user=:id&puzzle=:id

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
