import PropTypes from "prop-types";
import { Container} from "react-bootstrap";
import { LoginButton, LogoutButton } from "./Auth";

import { Navbar, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header>
          <Navbar bg="primary" variant="dark" expand="lg" className="py-1 py-md-2 border-bottom">
            <Container fluid className="align-items-center">
              <Navbar.Brand className="text-white h2"
                onClick={(e) => {
                e.preventDefault();
                navigate("/");
                }}
              >What do you meme?
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                <Nav className="me-auto ms-auto justify-content-center" id="centered-navbar">
                  {props.loggedIn && (
                    <Nav.Link
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
                <Nav>
                  <Nav.Item className="ml-md-auto">
                    {props.loggedIn ? <LogoutButton logout={props.handleLogout} /> : <LoginButton />}
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      );
}


Header.propTypes = {
    handleLogout: PropTypes.func,
    user: PropTypes.object,
    loggedIn: PropTypes.bool
}

export default Header;