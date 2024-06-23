import { Container, Col, Row, Button, Form, Modal , CardGroup} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Timer from './Timer.jsx';
import PropTypes from "prop-types";

import MemeCard from './Meme.jsx';
import CaptionCard from './Caption.jsx';

function Round(props){

  
    return (
        <Container fluid className="flex-grow-1 d-flex flex-column">
            <Row><h1>Round {props.count + 1 }</h1></Row>
            <Row className="mx-auto">
                <Col>
                    {props.meme && < MemeCard id={props.meme.id} path_img={props.meme.path_img} />}
                </Col>
                <Col>
                    {props.seconds && <Timer seconds={props.seconds} handleEndTimer={props.handleEndRound} />}
                </Col>
            </Row>

            <Row><h3>Choose one of these captions! Only two of them are correct!</h3></Row>
            <Row>
            <CardGroup>
                {props.captions && props.captions.map((caption) => (
                    <Col key={caption.id} >
                        <CaptionCard id={caption.id} description={caption.description} onClick={() => props.setSelectedCaption(caption)}/>
                    </Col>
                ))}
            </CardGroup>
            </Row>
        </Container>
    );
}

Round.propTypes = {
    count: PropTypes.number,
    meme: PropTypes.object,
    captions: PropTypes.array,
    selectedCaption: PropTypes.object,
    setSelectedCaption: PropTypes.func,
    handleEndRound: PropTypes.func
};

function RoundResult(props){
    return (
        <Container fluid className="flex-grow-1 d-flex flex-column">
            <Row className="mx-auto">
                <Col>
                    <h3>You scored {props.point}</h3>
                    {props.meme && < MemeCard id={props.meme.id} path_img={props.meme.path_img} />}
                </Col>

                <Col>
                    <h3>Correct Captions</h3>
                    <CardGroup>
                        {props.correctCaptions && props.correctCaptions.map((caption) => (
                            <Col key={caption.id} >
                                <CaptionCard id={caption.id} description={caption.description} />
                            </Col>
                        ))}
                    </CardGroup>
                </Col>
                <Col>
                    <h3>Your Caption Choice</h3>
                    <Col key={props.selectedCaption.id} >
                        <CaptionCard id={props.selectedCaption.id} description={props.selectedCaption.description}/>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

function GameResult(props){

    return (
        <Container fluid className="flex-grow-1 d-flex flex-column">
            <Row className="mx-auto">
                <Col>
                    <h3>Game Over</h3>
                    <h3>Your final score is {props.total_point} . Here the list of your rounds</h3>
                </Col>
            </Row>
            {props.rounds && props.rounds.map((round) => (
                <Row key={round.id} className="mx-auto">
                    <RoundResult point={round.point} meme={round.meme} correctCaptions={round.correctCaptions}
                      selectedCaption={round.selectedCaption ? round.selectedCaption : {"id": -1 , "description": "No caption selected"}} />
                </Row>
            ))}
        </Container>
    );
};

export {Round, RoundResult, GameResult};