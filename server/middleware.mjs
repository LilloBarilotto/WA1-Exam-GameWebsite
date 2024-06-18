'use strict';



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

  