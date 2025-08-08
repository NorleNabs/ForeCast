import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCloudSun } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

function NavbarComponent({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5" data-bs-theme="dark">
      <Container fluid className="mx-0" expand="lg">
        <Row className="g-0 w-100">
          <Col sm={6} className="d-flex justify-content-start">
            <Navbar.Brand href="#home" style={{ fontSize: "2rem" }}>
              <img
                alt=""
                src="src/Image/WeathCast.png"
                width="50"
                height="50"
                className="d-inline-block align-top rounded-circle"
              />{" "}
              ForeCaster
            </Navbar.Brand>
          </Col>
          <Col
            sm={6}
            className="d-flex justify-content-center align-items-center">
            <div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home" className="mx-2 fs-5">
                    <FaCloudSun /> Weather
                  </Nav.Link>
                  <Nav.Link href="#link" className="mx-2 fs-5">
                    <IoNewspaperOutline /> News
                  </Nav.Link>
                  <Navbar.Text className="mx-2 fs-5">
                    <IoPerson /> {user.username}
                  </Navbar.Text>
                  <NavDropdown id="basic-nav-dropdown" className="fs-5">
                    <NavDropdown.Item href="#action/3.1">
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onLogout}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
