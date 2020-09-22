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
- [ ] On init, sort puzzle list by date and load most recent
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

### For next time

- User mgmt
- API auth
- Polling for DB writes?
