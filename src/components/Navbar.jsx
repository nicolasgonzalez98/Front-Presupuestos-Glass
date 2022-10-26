import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function NavGlassDoor() {
    
    

    function logOut(){

        axios({
            method: 'post',
            url: '/authentication/logout',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            withCredentials: true
        })
        .then((res) => {
            if(res){
                //console.log('removiendo store')
                localStorage.setItem('id_user', 0)
            }
            
        })
    }

    return (
        <Navbar  bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">DecorGlass</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href='/budget'>Crear presupuesto</Nav.Link>
                    <NavDropdown title="Clientes" id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="#action/3.1">Mis clientes</NavDropdown.Item>
                        <NavDropdown.Item href='/create_client'>Agregar cliente</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Inventario" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Mi Inventario</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Crear articulo
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>*/}
                    </NavDropdown>
                    <Nav.Link 
                        href='/' 
                        type='button' 
                        variant="outline-success"
                        onClick={logOut}
                        >
                        Cerrar sesion
                    </Nav.Link>
                </Nav>
                <Form className="d-flex">
                    
                    
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavGlassDoor;

