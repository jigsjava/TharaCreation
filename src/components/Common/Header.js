import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Header() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.success("Successfully Logged Out", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/login");
    }

    const handleProfile = () => {
          navigate("/profile");
    }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
              <NavDropdown.Item  onClick={handleLogOut}>
               Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;