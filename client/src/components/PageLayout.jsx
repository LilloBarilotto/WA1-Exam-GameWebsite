import { useEffect, useState } from "react";
import {Row, Col, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundLayout() {
    return (
        <>
            <Row><Col><h2>Error: page not found!</h2></Col></Row>
            <Row><Col> <img src="/GitHub404.png" alt="page not found" className="my-3" style={{display: 'block'}}/></Col></Row>
            <Row><Col> <Link to="/" className="btn btn-primary mt-2 my-5">Go Home!</Link> </Col></Row>
        </>
    );
}

function Home(props) {

    return (
        <>
        <Row className="mx-auto">
            <Col>
                <h2>Welcome to the game!</h2>
            </Col>
        </Row>
        <Row className="mx-auto">
            <Col> <Button onClick={() => {props.setAnonymousGame(true); props.handleNewRound();}}>Start Anonymous Round </Button></Col>
            { props.loggedIn ? <Col><Button onClick={() => {props.setAnonymousGame(false); props.handleNewRound();}}>Start entire Games (3 Round)</Button></Col> : null }
        </Row>
        <Row><h3>Here some rules:</h3></Row>
        <Row>
            <Col>< ListGroup>
                <ListGroup.Item>1. There will be a Meme and 7 captions!</ListGroup.Item>
                <ListGroup.Item>2. You must choose the best captions for the meme!</ListGroup.Item>
                <ListGroup.Item>3. You have 30 seconds to decide, otherwise no points!</ListGroup.Item>
            </ListGroup></Col>
            <Col>< ListGroup>
                <ListGroup.Item>4. If the caption is right, you will receive 5 points! 0 if failed or not answer is given u.u</ListGroup.Item>
                <ListGroup.Item>5. The round is Anonymous, not stored into the database!</ListGroup.Item>
                <ListGroup.Item>6. If you are logged in, you can start a game with 3 rounds, and after all you will see the results and they will be added to your history games!</ListGroup.Item>
            </ListGroup></Col>
        </Row>
        <Row><h3>Exclusive content if you are logged in!</h3></Row>
        <Row>
            <Col>< ListGroup>
                <ListGroup.Item>1. You can retrieve all your pasts games!!</ListGroup.Item>
                <ListGroup.Item>2. See the global ranking of other user, try to beat them!</ListGroup.Item>
            </ListGroup></Col>
        </Row>
        </>
    );
};

export { NotFoundLayout, Home}