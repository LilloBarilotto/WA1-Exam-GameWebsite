// imports
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';

import { body, validationResult, check } from 'express-validator';

import passport from 'passport';
import passportLocal from 'passport-local';

import UserDAO from './dao/user-dao.mjs';
import MemeDAO from './dao/meme-dao.mjs';
import RoundDAO from './dao/round-dao.mjs';
import CaptionDAO from './dao/caption-dao.mjs';


// init express and Dao modules
const app = new express();
const port = 3001;

const userDAO = new UserDAO();
const memeDAO = new MemeDAO();
const gameDAO = new RoundDAO();
const captionDAO = new CaptionDAO();

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// initialize and configure HTTP sessions
app.use(session({
  secret: 'Pero quanto a te, quanto quel che non puoi fare per tu per te qualcosa da poter fare potrebbe esserci',
  resave: false,
  saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());


/** Initialize and configure passport */
passport.use(new passportLocal.Strategy((email, password, done) => {
  /** verification callback for authentication */
  userDao.getUser(email, password).then(user => {
    if (user)
      done(null, user);
    else
      done(null, false, { message: 'email or password wrong' });
  }).catch(err => {
    done(err);
  });
}));

/** serialize and de-serialize the user (user object <-> session)
 *  we serialize the user id and we store it in the session: the session is very small in this way
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
// This is so powerful because now we can access data stored in the db for the current user, simply writing req.user
// I have to write another api to make frontend able to user the same information: this api is app.get('/api/sessions/current')
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    // SE SONO AUTENTICATO POSSO PROCEDERE A CHIAMARE LA FUNZIONE CHE SEGUE, CHE SARA' IL CORPO DELLE RICHIESTE GET/POST
    return next();
  // altrimenti ritorno l'errore e non proseguo al prossimo middleware
  return res.status(401).json({ error: 'not authenticated' });
}








/************************************* USER'S API ****************************************/

app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// logout
app.delete('/api/sessions/current', isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });
});


/************************************* MEME'S API ****************************************/
app.get('/api/memes', (req, res) => {
  memeDao.getMemes()
    .then(memes => res.json(memes))
    .catch(() => res.status(500).end());
});

app.get('/api/memes/:id', (req, res) => {
  memeDao.getMeme(req.params.id)
    .then(meme => {
      if (meme)
        res.json(meme);
      else
        res.status(404).end();
    })
    .catch(() => res.status(500).end());
});


/************************************* GAME'S API ****************************************/
app.get('/api/games', isLoggedIn, (req, res) => {
  gameDao.getGames(req.user.id)
    .then(games => res.json(games))
    .catch(() => res.status(500).end());  
});

//TODO gestione body e salvataggio dei round
app.post('/api/games', isLoggedIn, (req, res) => {
  gameDao.createGame(req.user.id)
    .then(game =>{
   //   rounds = body.rounds.map(round => {id: round.id, caption: round.caption, meme: round.meme}); 
      res.status(201).json(game);
    })
    .catch(() => res.status(500).end());
});

//aggiungere controllo per vedere se l'utente ha richiesto un suo game e non di altri utenti
app.get('/api/games/:id', isLoggedIn, (req, res) => {
  gameDao.getGame(req.params.id)
    .then(game => {
      if (game)
        res.json(game);
      else
        res.status(404).end();
    })
    .catch(() => res.status(500).end());
});

app.get('/api/rounds/:id', isLoggedIn, (req, res) => {
  gameDao.getRound(req.params.id)
    .then(round => res.json(round))
    .catch(() => res.status(500).end());
});

app.get('api/rounds/', isLoggedIn, (req, res) => {
  gameDao.getRounds(req.user.id)
    .then(rounds => res.json(rounds))
    .catch(() => res.status(500).end());
});


/************************************* CAPTION'S API ****************************************/
app.get('api/captions', (req, res) => {
  captionDao.getCaptions()
    .then(captions => res.json(captions))
    .catch(() => res.status(500).end());
});

app.get('api/captions/best', (req, res) => {
  captionDao.getBestCaption(req.body.memeId)
    .then(captions => res.json(captions))
    .catch(() => res.status(500).end());
});

app.get('api/captions/random', (req, res) => {
  captionDao.getCaptionsN(5)
    .then(captions => res.json(captions))
    .catch(() => res.status(500).end());
});