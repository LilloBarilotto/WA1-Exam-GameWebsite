import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { LoginButton, LogoutButton } from "./Auth";

function Header(props) {
    return <header className="py-1 py-md-3 border-bottom bg-primary">
        <Container fluid className="gap-3 align-items-center">
            <Row>
                <Col md={4}> {/* Adjusted for medium devices and up */}
                    <a href="/"
                       className="d-flex align-items-center justify-content-center justify-content-md-start h-100 link-light text-decoration-none">
                        <span className="h3 mb-0">What do you meme? </span>
                    </a>
                </Col> 
                <Col md={8}className="d-flex align-items-center justify-content-end"> {/* Adjusted for medium devices and up */}
                    <span className="ml-md-auto">
                        { props.loggedIn ? <LogoutButton logout={props.handleLogout} /> : <LoginButton/>  }
                    </span>
                </Col>
            </Row>
        </Container>
    </header>;
}


Header.propTypes = {
    handleLogout: PropTypes.func,
    user: PropTypes.object,
    loggedIn: PropTypes.bool
}

export default Header;