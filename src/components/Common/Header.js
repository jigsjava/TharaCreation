import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartIcon } from '../../assets/icons';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';


function Header() {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("cartItems");
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
          <Nav.Link href="/addcart" className="cart-icon">
            <CartIcon />
            {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
          </Nav.Link>
            <Nav.Link href="/history">OrderHistory</Nav.Link>
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