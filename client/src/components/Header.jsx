import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { LoginButton, LogoutButton } from "./Auth";

import { Navbar, Nav , Button} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    return <header className="py-1 py-md-2 border-bottom bg-primary">
        <Container fluid className="gap align-items-center ">
            <Row>
                <Col > {/* Adjusted for medium devices and up */}
                    <span className="h3 text-white">What do you meme? </span>
                </Col> 
                <Col className="d-flex justify-content-center">
  <Navbar bg="transparent" expand="lg" variant="dark">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {props.loggedIn && (
          <Nav.Link
            href="/leaderboard"
            className={location.pathname === "/leaderboard" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              navigate("/leaderboard");
            }}
            disabled={location.pathname === "/leaderboard"}
          >
            Leaderboard
          </Nav.Link>
        )}
        <Nav.Link
          href="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          disabled={location.pathname === "/"}
        >
          Home
        </Nav.Link>
        {props.loggedIn && (
          <Nav.Link
            href="/games"
            className={location.pathname === "/games" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              navigate("/games");
            }}
            disabled={location.pathname === "/games"}
          >
            Games
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</Col>
                <Col className="d-flex align-items-center justify-content-end"> {/* Adjusted for medium devices and up */}
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