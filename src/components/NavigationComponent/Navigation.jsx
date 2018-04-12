import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


class NavigationComponent extends React.Component {

    render() {
        return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#brand">MyWorkCar React</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  Home
                </NavItem>
                <NavItem eventKey={2} href="#">
                  Around me
                </NavItem>
                <NavItem eventKey={3} href="#">
                  About
                </NavItem>
                
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={4} href="#">
                  Login
                </NavItem>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default NavigationComponent;