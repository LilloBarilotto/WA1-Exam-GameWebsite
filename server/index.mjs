// imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

import UserDAO from './user-dao.mjs';
import MemeDAO from './meme-dao.mjs';
import CaptionDAO from './caption-dao.mjs';
import GameDAO from './game-dao.mjs';

import dayjs from 'dayjs';

const userDAO = new UserDAO();
const memeDAO = new MemeDAO();
const captionDAO = new CaptionDAO();
const gameDAO = new GameDAO();

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


app.get('/api/users', (req, res) => {
  userDAO.getUsers()
    .then(users => res.json(users))
    .catch(() => res.status(500).end());
});


/************************************* MEME'S API ****************************************/
app.get('/api/memes/random', async (req, res) => {
  try {

    const meme = await memeDAO.getRandMeme(req.body.ids || []);
    console.log(meme);
  
    const bestcaptions = await captionDAO.getBestCaption(meme.id);
    console.log(bestcaptions);    
  
    const randomCaptions = await captionDAO.getRandomCaptions(meme.id);
    console.log(randomCaptions);
    // Combine captions and randomCaptions
    const allCaptions = [...bestcaptions, ...randomCaptions];

    console.log(4);
    // Shuffle the combined array
    for (let i = allCaptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCaptions[i], allCaptions[j]] = [allCaptions[j], allCaptions[i]];
    }

    console.log(5);
    const response = {
      id: meme.id,
      path_img: meme.path_img,
      captions: allCaptions
    };

    console.log(6);
    res.json(response);
  } catch (error) {
    res.status(500).end();
  }
});

/************************************* GAME'S API ****************************************/
app.get('/api/games', isLoggedIn, (req, res) => {
  gameDAO.getGames(req.user.id)
    .then(games => res.json(games))
    .catch(() => res.status(500).end());  
});

async function calculatePoint(round) {

  try{
  const meme = await memeDAO.getMeme(round.meme_id);
  const roundBestCaptions = round.captionsIds.filter(captionId => captionDAO.isBestCaption(meme.id, captionId)). 
    map(async (captionId) => await captionDAO.getCaption(captionId))
  ;
  
  const selected_caption = await captionDAO.getCaption(round.selected_caption_id);
  const point = (round.selected_caption_id && roundBestCaptions.some(caption => caption.id == selected_caption.id)) ? 5 : 0;

  const response = {
    point: point,
    meme: meme,
    captions: {
      first_best_caption: roundBestCaptions[0],
      second_best_caption: roundBestCaptions[1],
      selected_caption: selected_caption
    }
  };

  return response;
  }
  catch(error){
    return 0;
  }
}

//TODO gestione body e salvataggio dei round
app.post('/api/games', isLoggedIn, async (req, res) => {
    try{
      let rounds = req.body.rounds.map(round => calculatePoint(round));

      // try to add the game and the rounds
      let game = {
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        user_id: req.user.id,
        total_points: rounds.reduce((acc, round) => acc + round.point, 0)
      };

      const game_id = await gameDAO.addGame(game);
      rounds = rounds.map(round => ({...round, game_id : game_id}));
      
      await Promise.all(rounds.map(round =>
        gameDAO.addRound({
          meme_ID: round.meme.id,
          first_best_caption_ID: round.captions.first_best_caption.id,
          second_best_caption_ID: round.captions.second_best_caption.id,
          selected_caption_ID: round.captions.selected_caption.id,
          point: round.point,
          game_ID: game_id
        })
      ));
      
      res.json({id: game_id})

    }catch(error){
      if (game_id)
        gameDAO.deleteGame(game_id);
      res.status(500).end();
    }
});

app.get('/api/games/:id', isLoggedIn, async (req, res) => {
  try{
    const game = await gameDAO.getGame(req.params.id);
    if(game.user_id != req.user.id)
      res.status(401).end();

    const temp_rounds = await gameDAO.getRounds(req.params.id);

    // CREATE A FUNCTION TO DO THAT
    const rounds = await Promise.all(temp_rounds.map(async round => {
      const meme = await memeDAO.getMeme(round.meme_id);
      const first_best_caption = await captionDAO.getCaption(round.first_best_caption_id);
      const second_best_caption = await captionDAO.getCaption(round.second_best_caption_id);
      const selected_caption = await captionDAO.getCaption(round.selected_caption_id) || null;
      return {
        id: round.id,
        point: round.point,
        meme: meme,
        captions: {
          first_best_caption: first_best_caption,
          second_best_caption: second_best_caption,
          selected_caption: selected_caption
        }
      };
    }));

    response = {
      ...game,
      rounds: rounds
    }

  }
  catch(error){
    res.status(500).end();
  }
});

app.get('/api/games/anonymous', (req, res) => {
  const response = calculatePoint(req.body.round);

  if (response != 0)
    res.json(response);
  else
    res.status(500).end();
});

/************************************* Activate the server ****************************************/
const port=3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});