import {Row, Col, ListGroup, ListGroupItem, Button, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFoundLayout() {
    return (
        <Container>
            <Row><img src="/404_not_found.webp" alt="page not found"  className="img-fluid my-3" style={{ maxWidth: '80%', height: 'auto' }}/></Row>
            <Row >
                <Col className="justify-content-center"><HomeButton></HomeButton></Col>
            </Row>
        </Container>
    );
}

function ErrorLayout() {
    return (
        <Container>
            <Row  className="justify-content-center"><img src="/422-status-code.png" alt="422 status code page"  className="img-fluid my-3" style={{ maxWidth: '60%', height: 'auto' }}/></Row>
            <Row><Col className="justify-content-center"><p className="h3"> The content that you try to sent into our website has changed in unexpected way, please try again. The changes will not be insert in our website.</p></Col></Row>
            <Row >
                <Col className="justify-content-center"><HomeButton></HomeButton></Col>
            </Row>
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
        <Button variant="primary" onClick={()=> navigate('/')}>Go Home</Button>
      )
}

function NotAuthorizedPage () {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <Row><img src="/error_401.png" alt="not authorized view" className="img-fluid" style={{ height: 'auto' }} /></Row>
            <Row className="justify-content-center">
                <Col className="justify-content-center"><HomeButton></HomeButton></Col>
            </Row>
        </Container>
    );

}

export { NotFoundLayout, Home, HomeButton, NotAuthorizedPage, ErrorLayout}