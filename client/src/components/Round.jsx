import { Container, Col, Row, Button, Form, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from './API.js';


function Round(props){
    const [meme, setMeme] = useState(null);
    const [captions, setCaptions] = useState([]);
    
    useEffect(() => {
        API.getRandomMeme(props.roundIds)
        .then(meme => {
            setMeme(meme);
        });

    }, []);

}