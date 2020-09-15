# Hive Words

## To-do

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


## Schema & API 

### PostgresSQL tables

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

### Rest-like API

GET    /users     index 
GET    /user/:id  show
POST   /users     create
PUT    /users/:id update
DELETE /users/:id destroy

**`GET /users`** index
Kept cached for name lookup and for the login screen.

**`GET /puzzles`** index
For use in puzzle switcher.

**`GET /puzzle-progress/PUZZLE_ID`** show

**`POST /puzzle-progress/PUZZLE_ID/USER_ID`** create
progress JSON

**`PUT /puzzle-progress/PUZZLE_ID/USER_ID`** update
progress JSON


## Quick start

```
npm run serve // Compiles and hot-reloads for development
npm run build // Compiles and minifies for production
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
