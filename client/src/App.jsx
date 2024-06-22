import { useEffect, useState } from 'react'
import {Container, Toast, ToastBody} from 'react-bootstrap/';
import { Route, Routes, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import API from "./API.mjs";

import { NotFoundLayout , Home} from './components/PageLayout.jsx';
import { LoginForm }  from './components/Auth.jsx';
import Header from './components/Header.jsx';
import Timer  from './components/Timer.jsx';
import Round from './components/RoundBoard.jsx';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  const [rounds, setRounds] = useState([]);  // array of completed rounds
  const [anonymousGame, setAnonymousGame] = useState(false);
  const [game, setGame] = useState(null);
  const [meme, setMeme] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);

  const handleNewRound = () => {
    API.getRandomMeme(rounds.map(round => round.meme_ID))
    .then(res => {
        setMeme({
            id: res.id,
            path_img: res.path_img
        });
        setCaptions([...res.captions]);

        navigate('/play');
    });
  }

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

  const handleEndRound = async () => { // When the timer ends, the round is completed

    const round = {
      meme_ID : meme.id,
      captionsIds: captions.map(caption => caption.id),
      selected_caption_ID : selectedCaption ? selectedCaption.id : null,
    }

    setRounds([...rounds, round]);
  }

  useEffect (() => { // When the rounds array is updated, the game is completed
    if(rounds.length == 0) return;
        
    if(rounds.lenght== 1 && anonymousGame){
      API.getRoundResults(rounds[0])
      .then(res => {
        setGame(res);
        navigate('/result'); 
      })
    }else if (rounds.length === 3 && !anonymousGame && loggedIn){
      API.addGame(rounds)
      .then(game => {
        setGame(game);
        navigate('/games/' + game.id);
      })
    } else{
      navigate('/play')
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
    <Header loggedIn={loggedIn} handleLogout={handleLogout}/>
    <Toast
      show={feedback !== ''}
      autohide
      onClose={() => setFeedback('')}
      delay={4000}
      position="top-end"
      className="position-fixed end-0 m-3"
    >
      <ToastBody>{feedback}</ToastBody>
    </Toast>
      <Container fluid className="flex-grow-1 d-flex flex-column">
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} handleNewRound={handleNewRound}
                setAnonymousGame={setAnonymousGame}    
            />}
          />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} feedback={feedback}/>} />
          <Route path="/play" element={<Round count={rounds.length} handleEndRound={handleEndRound}
            meme={meme} captions={captions} selectedCaption={selectedCaption} setSelectedCaption={setSelectedCaption}
            />}
          />
          { /** <Route path="/result" element={<NotFoundLayout/>}/> */}
          { /** <Route path="/games/:id" element={<NotFoundLayout/>}/> */}
          { /** <Route path="/games" element={<NotFoundLayout/>}/> */}
          { /** <Route path="/leaderboard" element={<NotFoundLayout/>}/> */}
          <Route path="*" element={<NotFoundLayout/>}/>    
        </Routes>
      </Container>
    </div>
  );

}

export default App