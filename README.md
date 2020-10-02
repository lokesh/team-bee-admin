
# Hive Words

## Quick start

```
npm run serve // Compiles and hot-reloads for development
npm run build // Compiles and minifies for production
npm run lint
```

## To-do

**Next**
- [x] Mobile layout
- [x] Add genius flag to progress bar. Once met, change to yellow bg and add 👑
- [x] Review GameView created lifecycle method
- [x] Add check so user progress for a puzzle isn't created multiple times
- [x] Push to Heroku
- [x] Odd flash on mobile on tap.
- [ ] Consolidate API and vue app into single project?
- [ ] Flag for local API development

**UI**
- [ ] Add feedback when delete, shuffle, and enter are pressed with kbd

**Real-time**
- [ ] Use socket.io to relay word additions between players
- [ ] Design distinct notifications for real-time.

**Gameplay**
- [ ] Once answers revealed, disable submitting new words for that puzzle for that user?

**User mgmt and security**
- [ ] Think about token for teams. Requiring a token to see user list on login.
- [ ] User sign up form
- [ ] API authentication

**Puzzles**
- [ ] Auto-gen puzzles

**Before sharing**
- [ ] Find a domain and final name
- [ ] Update design to prevent any confusion with the original NYT game.
- [ ] Give credit where credits are due for game design.

## Architecture

### API

```
GET    /users
GET    /users/:id
GET    /puzzles
POST   /puzzles
GET    /puzzles/:id
GET    /puzzles/:id/users
GET    /puzzles/:id/users/:userId
POST   /puzzles/:id/users/:userId
PUT    /puzzles/:id/users/:userId
```

### Data init and bootstrapping

- **User**: We store the current user in localStorage and store it on app start up. If we don't find it, we have a router guard that will route them to Login screen.
- **Users**: Loaded on app creation.
- **Puzzles**: Loaded on app creation.


App.js - created...

- Load user list
- Load puzzle list

users: [id, name]
puzzles: [id, name, date]

- Set current puzzle as puzzle who has latest date that is not in future

puzzle: id, name, date, config, userProgress

### Data CRUD

#### Puzzles

Manually enter in DB.

#### Users

Manually enter in DB.


### For next time

- **PostgreSQL**: I spent way to much time fighting postgres. It was challenging to figure out things that should have been easy such as picking out the right data types and setting proper defaults (e.g. '{}'::character varying[] to set a default empty varchar array). The docs are bad.
- User mgmt
- API auth
- Polling for DB writes?


_Scratchpad_

It took a couple tries, but I'm happy with the db schema and the Vuex store organization. Write down some of the issues I ran into in the two prev iterations.


1. Prefer initializing your store's initial state with all desired fields upfront.
2. When adding new properties to an Object, you should either:
* Use Vue.set(obj, 'newProp', 123), or
* Replace that Object with a fresh one. For example, using the object spread syntax
 we can write it like this:
state.obj = { ...state.obj, newProp: 123 }


