import PropTypes from "prop-types";
import {Col, Container, Row } from "react-bootstrap/";
import { LogoutButton, LoginButton } from './Auth';

function GameNavBar(props) {
    return <header className="py-1 py-md-3 border-bottom bg-primary">
        <Container fluid className="gap-3 align-items-center">
            <Row>
                <Col md={4}>
                    <a href="/"
                       className="d-flex align-items-center justify-content-center justify-content-md-start h-100 link-light text-decoration-none">
                        <i className="bi bi-collection-play me-2 flex-shrink-0"></i>
                        <span className="h5 mb-0">What do you meme? Manganella Edition </span>
                    </a>
                </Col>x 
                <Col md={8} className="d-flex align-items-center justify-content-end">
                    <span className="ml-md-auto">
                        { props.loggedIn ? <LogoutButton logout={props.handleLogout} /> : <LoginButton /> }
                    </span>
                </Col>
            </Row>
        </Container>
    </header>;
}

GameNavBar.propTypes = {
    handleLogout: PropTypes.func,
    user: PropTypes.object,
    loggedIn: PropTypes.bool
}

export default GameNavBar;