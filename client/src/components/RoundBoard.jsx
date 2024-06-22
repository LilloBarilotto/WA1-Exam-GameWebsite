import { Container, Col, Row, Button, Form, Modal , CardGroup} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Timer from './Timer.jsx';
import API from './../API.mjs';
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
                    <Timer seconds={30} handleEndTimer={props.handleEndRound} />
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

export default Round;