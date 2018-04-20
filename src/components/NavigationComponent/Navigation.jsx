import React from 'react';
import LoginComponent from '../LoginComponent/Login';

import { Nav, Navbar, NavItem } from 'react-bootstrap';

class NavigationComponent extends React.Component {

  componentWillMount() {
    
  }

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
                  {/* <Link to={'/findDriver'}> */}
                    Around me
                  {/* </Link> */}
                </NavItem>
                <NavItem eventKey={3} href="#">
                  About
                </NavItem>
                
              </Nav>
              <Nav pullRight>
              <LoginComponent />
                <NavItem>
                
                </NavItem>
                
              </Nav>
            </Navbar.Collapse>
            
        </Navbar>
        
        );
    }
}

export default NavigationComponent;