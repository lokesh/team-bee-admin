# Hive Words

## To-do

**Design**
- [x] On key press, animate active
- [ ] Design update: Mobile layout, puzzle switcher, multi-user, hints
- [ ] Add limit to word length

**Data**
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

User
- id Integer
- name

Puzzle
- id
- name
- centerLetter
- outerLetters
- answers

PuzzleProgress
- puzzleId
- userId
- foundWords
- hint
- reveal


**`GET /users`**
Kept cached for name lookup and for the login screen.

**`GET /puzzles`**
For use in puzzle switcher.

**`GET /puzzle-progress/PUZZLE_ID`**
users array []
  {
    userId: Int,
    foundWords: []
    hint: Boolean
    revealed: Boolean
  }

POST /puzzle-progress/PUZZLE_ID/USER_ID

foundWords: []
hint
revealed



## Quick start

```
npm run serve // Compiles and hot-reloads for development
npm run build // Compiles and minifies for production
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
