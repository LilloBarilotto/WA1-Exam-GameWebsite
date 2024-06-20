import { useEffect, useState } from 'react'
import {Container, ToastBody, Toast} from 'react-bootstrap/';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import API from "./API.mjs";

import { NotFoundLayout , Home} from './components/PageLayout.jsx';
import {LoginForm}  from './components/Auth.jsx';
import GameNavBar from './components/GameNavBar.jsx';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleLogin = async (credentials) => {
    API.login(credentials)
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
      })
      .catch(err => {
        setFeedback(err.message);
      });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
    <GameNavBar loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Container fluid className="flex-grow-1 d-flex flex-column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} feedback={feedback}/>} />
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