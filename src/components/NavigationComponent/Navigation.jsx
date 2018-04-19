import React from 'react';
import LoginComponent from '../LoginComponent/Login';
import LogoutComponent from '../LogoutComponent/Logout';
import Session from '../../Session';

import { Nav, Navbar, NavItem } from 'react-bootstrap';

class NavigationComponent extends Session {

  constructor() {
    super();
  }

  render() {
    let session = super.getSession();

    let navCollapse;

    if (session) {
      let object = JSON.parse(session);
      let accountName = object.username;

      navCollapse = (
        <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">
            Home
                </NavItem>
          <NavItem eventKey={2} href="#">
            Map
                </NavItem>
          <NavItem eventKey={3} href="#">
            {accountName}
          </NavItem>
          <NavItem eventKey={4} href="#">
            {/* <Link to={'/findDriver'}> */}
            Around me
                  {/* </Link> */}
          </NavItem>
          <NavItem eventKey={5} href="#">
            About
                </NavItem>

        </Nav>
        <Nav pullRight>
          <LogoutComponent />
          <NavItem>

          </NavItem>

        </Nav>
        </Navbar.Collapse>
        );
    } else {
      navCollapse = (
        <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">Home</NavItem>
          <NavItem eventKey={4} href="#">
            {/* <Link to={'/findDriver'}> */}
            Around me
                  {/* </Link> */}
          </NavItem>
          <NavItem eventKey={5} href="#">
            About
                </NavItem>

        </Nav>
        <Nav pullRight>
        <LoginComponent />
          <NavItem>

          </NavItem>

        </Nav>
        </Navbar.Collapse>
        );

    }


    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">MyWorkCar React</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {navCollapse}

      </Navbar>

    );
  }
}

export default NavigationComponent;