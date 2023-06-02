import { Navbar, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <div>
            <Navbar bg="light" className='mt-3'>
            <Container>
            <div className="mt-2 d-flex justify-content-center mx-auto text-center">
                <div><a target="_blank" href="https://github.com/MEO666"><i className="bi bi-github ms-5"></i></a></div>
                <div><a target="_blank" href="https://www.linkedin.com/in/moad-el-otmani-a128a4256/"><i className="bi bi-linkedin ms-5"></i></a></div>
                <div><a target="_blank" href="https://www.facebook.com/profile.php?id=100008624955924"><i className="bi bi-facebook ms-5"></i></a></div>
            </div>
            </Container>
        </Navbar>
        
        <Navbar bg="primary" variant="dark" expand="lg" ms-auto>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/City">City</Nav.Link>
          <Nav.Link as={Link} to="/Zone">Zone</Nav.Link>
          <Nav.Link as={Link} to="/Series">Series</Nav.Link>
          <Nav.Link as={Link} to="/Specialites">Specialites</Nav.Link>
          <Nav.Link as={Link} to="/User">User</Nav.Link>
          <Nav.Link as={Link} to="/Restaurant">Restaurants</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        </div>
        
        
    );
}

export default Header;