import { useEffect, useState } from 'react'
import {Container, Toast, ToastBody} from 'react-bootstrap/';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import API from "./API.mjs";

import { NotFoundLayout , Home, CaptionList, RoundLayout} from './components/PageLayout.jsx';
import { LoginForm }  from './components/Auth.jsx';
import GameNavBar from './components/GameNavBar.jsx';
import { Timer } from './components/Game.jsx';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);


  const [rounds, setRounds] = useState([]);  // array of completed rounds
  const [anonymousGame, setAnonymousGame] = useState(false);
  const [game, setGame] = useState(null);
  const [meme, setMeme] = useState(null);

  const setFeedbackFromError = (err) => {
    let message = '';
    if (err.message) message = err.message;
    else message = "Unknown Error";
    setFeedback(message); // Assuming only one error message at a time
  };

  const handleLogin = async (credentials) => {
    API.login(credentials)
      .then(user => {
        setUser(user);
        setLoggedIn(true);
        setFeedback("Welcome back, " + user.nickname + "!");
      })
      .catch(err => {
        setFeedback(err.message);
      });
  };

  const handleLogout = async () => {
    API.logout()
      .then(() => {
        setUser(null);
        setLoggedIn(false);
      })
      .catch(err => {
        setFeedback(err.message);
      });
  };  

  const handleEndRound = async (round) => { // When the timer ends, the round is completed

    let new_round = {
      meme_ID : meme.id,
      first_best_caption_ID : round.first_best_caption_ID,
      second_best_caption_ID : round.second_best_caption_ID,
      selected_caption_ID : round.selected_caption_ID ? round.selected_caption_ID : null,
    }

    setRounds([...rounds, new_round]);
  }

  useEffect (() => { // When the rounds array is updated, the game is completed
    if(rounds.length == 0) return;
    
    if(rounds.lenght== 1 && anonymousGame){
      // render the result! -> GameLayout or RoundLayout?
    }else if (rounds.length === 3 && !anonymousGame && loggedIn){
      // send the info tho SERVER
      // navigate to the result page!


    } else{
      // You have other round to play!
    }

  }, [rounds]);


  // every useEffect has 2 calls because of the strict mode (Trust completely stackoverflow)
  useEffect(() => {
    API.getCurrentUser()
    .then(user => {
      setLoggedIn(true);
      setUser(user);  // here you have the user info, if already logged in
    }).catch(e => {
        if(loggedIn)    // printing error only if the state is inconsistent (i.e., the app was configured to be logged-in)
            setFeedbackFromError(e);
        setLoggedIn(false); setUser(null);
    }); 
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
    <GameNavBar loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Container fluid className="flex-grow-1 d-flex flex-column">
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} feedback={feedback}/>} />
          <Route path="/captions" element={<CaptionList/>}/>
          <Route path="/play" element={<RoundLayout count={rounds.length} handleEndRound={handleEndRound} />}/>
          <Route path="*" element={<NotFoundLayout/>}/>    
        </Routes>
        <Toast
          show={feedback !== ''}
          autohide
          onClose={() => setFeedback('')}
          delay={4000}
          position="top-end"
          className="position-fixed end-0 m-3"
        >
          <ToastBody>
            {feedback}
          </ToastBody>
        </Toast>
      </Container>
    </div>
  );

}

export default App