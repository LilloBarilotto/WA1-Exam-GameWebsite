// imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

import UserDAO from './user-dao.mjs';
import MemeDAO from './meme-dao.mjs';
import RoundDAO from './round-dao.mjs';
import CaptionDAO from './caption-dao.mjs';

const userDAO = new UserDAO();
const memeDAO = new MemeDAO();
const gameDAO = new RoundDAO();
const captionDAO = new CaptionDAO();

// init express and Dao modules
const app = express();
app.use(morgan('dev'));
app.use(express.json());

/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));

/** Initialize and configure passport */
passport.use(new LocalStrategy(async function verify(username, password, callback) {
  const user = await userDAO.getUser(username, password);
    if (!user)
      return callback(null, false, 'Incorrect username and/or password.');
    return callback(null, user);
}));

/** serialize and de-serialize the user (user object <-> session)*/
passport.serializeUser(function (user, callback) {
  callback(null, user);
});

// starting from the data in the session, we extract the current (logged-in) user
// This is so powerful because now we can access data stored in the db for the current user, simply writing req.user
// I have to write another api to make frontend able to user the same information: this api is app.get('/api/sessions/current')
passport.deserializeUser((user, callback) => {
  return callback(null, user);
});

// initialize and configure HTTP sessions
app.use(session({
  secret: 'Pero quanto a te, quanto quel che non puoi fare per tu per te qualcosa da poter fare potrebbe esserci',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not authorized' });
}



/************************************* USER'S API ****************************************/

app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      return res.status(401).json({error : info});
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
  req.logout(() => {
    res.end();
  });
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
  memeDAO.getMemes()
    .then(memes => res.json(memes))
    .catch(() => res.status(500).end());
});

app.get('/api/memes/:id', (req, res) => {
  memeDAO.getMeme(req.params.id)
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
  gameDAO.getGames(req.user.id)
    .then(games => res.json(games))
    .catch(() => res.status(500).end());  
});

//TODO gestione body e salvataggio dei round
app.post('/api/games', isLoggedIn, (req, res) => {
  gameDAO.createGame(req.user.id)
    .then(game =>{
      let rounds = req.body.rounds.map(round => ({...round, game_ID: game.id}));
      
      Promise.all(rounds.map(round => gameDAO.addRound(round)))
        .then(() => res.status(201).json(game))
        .catch(() => {
          gameDAO.deleteGame(game.id);  // Add DELETE ON CASCADE to the 'rounds' table in the db
          res.status(500).end();
        })
    .catch(() => res.status(500).end());
    });
});

//aggiungere controllo per vedere se l'utente ha richiesto un suo game e non di altri utenti
app.get('/api/games/:id', isLoggedIn, (req, res) => {
  gameDAO.getGame(req.params.id)
    .then(game => {
      if (game)
        res.json(game);
      else
        res.status(404).end();
    })
    .catch(() => res.status(500).end());
});

app.get('/api/rounds/:id', isLoggedIn, (req, res) => {
  gameDAO.getRound(req.params.id)
    .then(round => res.json(round))
    .catch(() => res.status(500).end());
});

app.get('/api/rounds/', isLoggedIn, (req, res) => {
  gameDAO.getRounds(req.user.id)
    .then(rounds => res.json(rounds))
    .catch(() => res.status(500).end());
});


/************************************* CAPTION'S API ****************************************/
app.get('/api/captions', (req, res) => {
  captionDAO.getCaptions()
    .then(captions => res.json(captions))
    .catch(() => res.status(500).end());
});

app.get('/api/captions/best', (req, res) => {
  captionDAO.getBestCaption(req.body.memeId)
    .then(captions => res.json(captions))
    .catch(() => res.status(500).end());
});

app.get('/api/captions/random', (req, res) => {
  captionDAO.getCaptionsN(5)
    .then(captions => res.json(captions))
    .catch(() => res.status(500).end());
});



/************************************* Activate the server ****************************************/
const port=3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});