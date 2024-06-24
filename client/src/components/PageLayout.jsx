import { useEffect, useState } from "react";
import {Row, Col, ListGroup, ListGroupItem, Button, Container} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function NotFoundLayout() {
    return (
        <Container>
            <Row><img src="/404_not_found.webp" alt="page not found"  className="img-fluid my-3" style={{ maxWidth: '80 %', height: 'auto' }}/></Row>
            <Row><HomeButton></HomeButton></Row>
        </Container>
    );
}

function Home(props) {

    return (
        <Container className="justify-content-center mb-5">
        <Row className="mx-auto text-center py-1">
            <Col>
                <h2>Welcome to the game!</h2>
            </Col>
        </Row>
        <Row className="mx-auto justify-content-center  text-center mb-1">
            <Col> <Button onClick={() => {props.setAnonymousGame(true); props.handleNewRound();}}>Start Anonymous Round </Button></Col>
            { props.loggedIn ? <Col><Button onClick={() => {props.setAnonymousGame(false); props.handleNewRound();}}>Start entire Games (3 Round)</Button></Col> : null }
        </Row>
        <Row>
            <Container className="custom-container bg-light">
                
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
            </Container>
        </Row>
        </Container>
    );
};

function HomeButton() {
    const navigate = useNavigate();
      return (      
        <Button variant="outline-light" onClick={()=> navigate('/')}>Go Home</Button>
      )
}

export { NotFoundLayout, Home, HomeButton}