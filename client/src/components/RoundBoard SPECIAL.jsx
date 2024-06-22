/**

import { Container, Col, Row, Button, Form, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Timer from './Timer.jsx';
import API from './API.js';
import MemeCard from './Meme.jsx';
import CaptionCard from './Caption.jsx';

function Round(props){
    const [meme, setMeme] = useState({});
    const [captions, setCaptions] = useState([]);
    const [selectedCaption, setSelectedCaption] = useState({});

    useEffect(() => {
        API.getRandomMeme(props.roundIds)
        .then(res => {
            setMeme({
                id: res.id,
                url: res.url
            });
            
            setCaptions(res.captions);
        });
    }, []);

    const onDragStart = (e, caption) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(caption));
    };

    const onDrop = (e) => {
        e.preventDefault();
        const caption = JSON.parse(e.dataTransfer.getData("text"));
        setSelectedCaption(caption);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <MemeCard id={meme.id} path_img={meme.path_img} />
                    <div onDrop={onDrop} onDragOver={onDragOver} style={{ border: '2px dashed gray', minHeight: '50px', margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        { selectedCaption.id ? <CaptionCard id={selectedCaption.id} description={selectedCaption.description} /> : "Drop your caption here"}
                    </div>
                </Col>
            </Row>
            <Row>
                {captions.map((caption) => (
                    <Col key={caption.id} xs={12} md={4} lg={3}>
                        <div draggable onDragStart={(e) => onDragStart(e, caption)}>
                            <CaptionCard id={caption.id} description={caption.description} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Round;
*/