import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { LoginButton, LogoutButton } from "./Auth";

import { Navbar, Nav , Button} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    return <header className="py-1 py-md-3 border-bottom bg-primary">
        <Container fluid className="gap-3 align-items-center ">
            <Row>
                <Col md={3}> {/* Adjusted for medium devices and up */}
                    <span className="h3 mb-0 text-white">What do you meme? </span>
                </Col> 
                <Col md={6} className="d-flex justify-content-center">
                        <Row >
                            <Col>
                                <Button variant={location.pathname === "/" ? "light" : "outline-light"}
                                    onClick={() => navigate("/")}
                                    disabled={location.pathname === "/"}
                                > Home
                                </Button>
                            </Col>
                            <Col>
                                {props.loggedIn && <Button variant={location.pathname === "/games" ? "light" : "outline-light"}
                                    onClick={() => navigate("/games")}
                                    disabled={location.pathname === "/games"}
                                > Games
                                </Button>}
                            </Col>
                        </Row>
                </Col>
                <Col md={3}className="d-flex align-items-center justify-content-end"> {/* Adjusted for medium devices and up */}
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