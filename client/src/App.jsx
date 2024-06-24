import { useEffect, useState } from 'react'
import {Container, Toast, ToastBody} from 'react-bootstrap/';
import { Route, Routes, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/App.css';
import './styles/Card.css';
import './styles/Meme.css';


import API from "./API.mjs";

import { NotFoundLayout , Home} from './components/PageLayout.jsx';
import { LoginForm }  from './components/Auth.jsx';
import Header from './components/Header.jsx';
import {Round, RoundResult, GameResult, GamesResult} from './components/RoundBoard.jsx';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState("Welcome to the game!");
  const navigate = useNavigate();

  const [rounds, setRounds] = useState([]);  // array of completed rounds
  const [meme, setMeme] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);

  const [anonymousGame, setAnonymousGame] = useState(false);
  const [game, setGame] = useState(null);
  const [seconds, setSeconds] = useState(0);

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

  const handleNewRound = () => {
    setSeconds(0);
    setSelectedCaption(null);

    API.getRandomMeme(rounds.map(round => round.meme_ID))
    .then(res => {
        setMeme({
            id: res.id,
            path_img: res.path_img
        });
        setCaptions([...res.captions]);
        setSeconds(30);

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
        setFeedback("Invalid email and/or password");
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

    setRounds((rounds ) => [...rounds, round]);
  }

  const handleGetGame = async (id) => {
    API.getGame(id)
    .then(game => {
      setGame(game);
    })
    .catch(err => {
      setFeedbackFromError(err);
    });
  };

  useEffect (() => { // When the rounds array is updated, the game is completed
    if(rounds.length === 0) return;
    
    API.getRoundResults(rounds[rounds.length - 1])
      .then(res => {
        if(res.point === 5){
          setFeedback("Correct! You got 5 points!");
        }else {
          setFeedback("Wrong! The correct captions were: '" + res.bestCaptions[0].description + "' and '" + res.bestCaptions[1].description + "' !");
        }
    
      });

    if(rounds.length === 1 && anonymousGame){
      API.getRoundResults(rounds[0])
      .then(res => {
        setGame(res);
        setRounds([]);
        setSelectedCaption(null);
        setSeconds(0);

        navigate('/result'); 
      })
    }else if (rounds.length === 3 && !anonymousGame && loggedIn){
      API.addGame(rounds)
      .then(game => {
        
        setGame(game);
        setRounds([]);
        setSelectedCaption(null);
        setSeconds(0);

        navigate('/games/' + game.id);
      })
    } else{
      handleNewRound();
    }

  }, [rounds]);

  return (
    <div className="min-vh-100 d-flex flex-column">
    <Header loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Container fluid className="flex-grow-1 d-flex flex-column">
      <Toast
      show={feedback !== ''}
      autohide
      onClose={() => setFeedback('')}
      delay={6000}
      position="top-end"
      className="position-fixed end-0 m-3"
      style={{ zIndex: 9999 }}  
    > 
      <ToastBody>{feedback}</ToastBody>
    </Toast>
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} handleNewRound={handleNewRound}
                setAnonymousGame={setAnonymousGame}    
            />}
          />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} feedback={feedback}/>} />
          <Route path="/play" element={<Round count={rounds.length} handleEndRound={handleEndRound}
            meme={meme} captions={captions} selectedCaption={selectedCaption} setSelectedCaption={setSelectedCaption}
            seconds={seconds}
            />}
          />
          {game && <Route path="/result" element={<RoundResult  point={game.point} meme={game.meme}
            correctCaptions={game.bestCaptions} selectedCaption={game.selectedCaption ? game.selectedCaption : {"id": -1 , "description": "No caption selected"}}
          />}
          />}
          {loggedIn &&  <Route path="/games/:id" element={<GameResult game={game} handleGetGame={handleGetGame} />}/>}
          {loggedIn &&  <Route path="/games" element={<GamesResult/>}/> }
          {loggedIn &&  <Route path="/leaderboard" element={<NotFoundLayout/>} /> }
          <Route path="*" element={<NotFoundLayout/>}/>    
        </Routes>
      </Container>
    </div>
  );

}

export default App