import { useEffect, useState } from 'react'
// import {Container, Toast, ToastBody} from 'react-bootstrap/';
import {Route, Routes, useLocation, Navigate} from 'react-router-dom';


import './App.css';

import API from "./API.mjs";
// import { LoginButton, LogoutButton } from './components/Auth.mjs';
import GameNavBar from './components/GameNavBar.jsx';


function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  
  const [rounds, setRounds] = useState([]);
  const [meme, setMeme] = useState(null);
  const [game, setGame] = useState(null);
  const [games, setGames] = useState([]);

  //const pathname = useLocation();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // check if the user is logged in
    API.getCurrentUser()
      .then(user => {
        setUser(user);
        setLoggedIn(true);
      })
      .catch(() => {
        setUser(null);
        setLoggedIn(false);
      });
  }, []);

  const handleLogin = async (email, password) => {
    API.login(email, password)
      .then(user => {
        setUser(user);
        setLoggedIn(true);
        setFeedback("Welcome back, " + user.username + "!");
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
        
        setGame(null);
        setGames([]);
        setRounds([]);
        setCount(0);
      })
      .catch(err => {
        setFeedback(err.message);
      });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
    <GameNavBar loggedIn={loggedIn} handleLogout={handleLogout} />
    {/*
      <Container fluid className="flex-grow-1 d-flex flex-column">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={loggedIn ? <Navigate replace to='/'/> : <Login onLogin={handleLogin} />} />
          
          <Route path="/games" element={loggedIn ? <Games games={games} setGames={setGames} /> : <Navigate replace to='/login'/>} />
          <Route path="/games/:gameID" element={loggedIn ? <Game game={game} setGame={setGame} rounds={rounds} setRounds={setRounds}/> : <Navigate replace to='/login'/>} />

          <Route path="/users" element={loggedIn ? <Users /> : <Navigate replace to='/login'/>} />
          <Route path="/users/:userID" element={loggedIn ? <User /> : <Navigate replace to='/login'/>} />

          <Route path="*" element={<NotFoundLayout/>}/>    
        </Routes>
       
      </Container>
      <GameFooter />
      */}
    </div>
  );

}

export default App