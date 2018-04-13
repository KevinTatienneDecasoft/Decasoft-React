import React from 'react';
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap';

const labelSizePlus = {
    fontSize: '18px'
};
const sizeButton = {
    width: '150px'
};


class AboutComponent extends React.Component {

    constructor() {
        super();
        this.state ={
            status : true,
            classFaq : '',
            classAbout : ''
        }
        
        this.handleClickFaq = this.handleClickFaq.bind(this);
        this.handleClickAbout = this.handleClickAbout.bind(this);

    }

     handleClickFaq(e) {
        e.preventDefault();
        this.setState({["status"]:true});
       
    
        console.log('The link was clicked.');
    
    }
    
     handleClickAbout(e) {
        e.preventDefault();
        this.setState({["status"]:false});
        
    
        console.log('The link was clicked.');
    
    }
    render() {

        let content;

        if (this.state.status==true) {
            content = (
            <div className={this.state.classFaq}>
                <Row className="show-grid">
                    <Col sm={6} md={4}>

                    </Col>
                    <Col sm={6} md={4}>
                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">How to use ?</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <label style={labelSizePlus}>
                                    <b>Step 1</b>
                                </label>
                                < br />
                                <label>Create an account or log in</label>
                                < br />
                                <label style={labelSizePlus}>
                                    <b>Step 2</b>
                                </label>
                                < br />
                                <label>In the "map" tab, look at who is on your route</label>
                                < br />
                                <label style={labelSizePlus}>
                                    <b>Step 3</b>
                                </label>
                                < br />

                                <label>Contact different drivers</label>
                                < br />
                                <label style={labelSizePlus}>
                                    <b>Step 4</b>
                                </label>
                                < br />
                                <label>Wait until he agrees to take you</label>
                                < br />
                            </Panel.Body>
                        </Panel>
                    </Col>

                    <Col sm={6} md={4}>

                    </Col>

                </Row>
                <Row className="show-grid">
                    <Col sm={6} md={4}>

                    </Col>
                    <Col sm={6} md={4}>
                        <div>
                            <Panel bsStyle="info">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">How to stay connected ?</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <label style={labelSizePlus}>
                                        <b>Step 1</b>
                                    </label>
                                    < br />
                                    <label>open the login page</label>
                                    < br />
                                    <label style={labelSizePlus}>
                                        <b>Step 2</b>
                                    </label>
                                    < br />
                                    <label>when you log in, check the box 'Remember me' to stop having to enter your login details. If you
                                    log out, you will have to enter your logins</label>
                                    < br />
                                </Panel.Body>
                            </Panel>
                        </div>
                    </Col>

                    <Col sm={6} md={4}>

                    </Col>

                </Row>
                <Row className="show-grid">
                    <Col sm={6} md={4}>

                    </Col>
                    <Col sm={6} md={4}>
                        <div>
                            <Panel bsStyle="info">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">How to contact a driver ?</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <label>In the map tab, if you have drivers on your route, you will have two choices:</label>
                                    < br />
                                    <label style={labelSizePlus}>
                                        <b>Choice 1</b>
                                    </label>
                                    < br />
                                    <label>by email, by clicking on it you will be redirected directly to your mailbox with the driver at
                                        destination.
                                </label>
                                    < br />
                                    <label style={labelSizePlus}>
                                        <b>Choice 2</b>
                                    </label>
                                    < br />
                                    <label>by message, the site offers its own chat to users, communicate directly with the driver for more
                                        fluidity
                                </label>
                                    < br />
                                </Panel.Body>
                            </Panel>
                        </div>
                    </Col>

                    <Col sm={6} md={4}>

                    </Col>

                </Row>
                <Row className="show-grid">
                    <Col sm={6} md={4}>

                    </Col>
                    <Col sm={6} md={4}>
                        <div>
                            <Panel bsStyle="info">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Where is the meeting point ?</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    <label>In the map tab, if you have drivers on your route, you have the opportunity to have the trip
                                        to the meeting point. The trip is calculated for a walk.
                                </label>
                                    < br />
                                </Panel.Body>
                            </Panel>
                        </div>
                    </Col>

                    <Col sm={6} md={4}>

                    </Col>

                </Row>

            </div>
            )
                }else{

                    content = (
                        <div className={this.state.classFaq}>
                        
                        <Row className="show-grid">
                            <Col sm={6} md={4}>
        
                            </Col>
                            <Col sm={6} md={4}>
                                    <Panel bsStyle="info">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">Dev team My-Work-Car</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                        <br />
                                        <label>
                                            Julien FONTAS
                                        </label>
                                        <br />
                                        <label>
                                            Kevin TATIENNE
                                        </label>
                                        <br />
                                        <label>
                                            Jeremy BOCCHI
                                        </label>
                                        <br />
                                        <label>
                                            thomas GAGEY
                                        </label>
                                        <br />
                                        <label>
                                            Richard POSTEL
                                        </label>
                                        <br />
                                        <br />
                                        </Panel.Body>
                                    </Panel>
                                
                            </Col>
        
                            <Col sm={6} md={4}>
        
                            </Col>
        
                        </Row>
                        <Row className="show-grid">
                            <Col sm={6} md={4}>
        
                            </Col>
                            <Col sm={6} md={4}>
                                <div>
                                    <Panel bsStyle="info">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">Projet My-Work-Car</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                        <label>
                                                technology used for the WebSite : <br />
                                                HTML / CSS / AJAX / JQUERY / W3.CSS 
                                        </label>
                                        <br />
                                        <label>
                                                technology used for the Server :<br />
                                                SPRING / JEE
                                        </label>
                                        <br />
                                        
                                        </Panel.Body>
                                    </Panel>
                                </div>
                            </Col>
        
                            <Col sm={6} md={4}>
        
                            </Col>
        
                        </Row>
                        <Row className="show-grid">
                            <Col sm={6} md={4}>
        
                            </Col>
                            <Col sm={6} md={4}>
                                <div>
                                    <Panel bsStyle="info">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">LICENCE</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                        <br />
                                        <label>
                                            Copyright © 2018 - Team My-Work-Car
                                        </label>
                                        <br />
                                        </Panel.Body>
                                    </Panel>
                                </div>
                            </Col>
        
                            <Col sm={6} md={4}>
        
                            </Col>
        
                        </Row>
        
                    </div>)
            }
        
        return (
            
            <Grid>
                <Row className="show-grid" >
                    <Col sm={6} md={4}>
                    </Col>
                    <Col sm={6} md={4}>
                        <Panel bsStyle="info">

                            <Panel.Body>
                                <Button onClick={this.handleClickFaq} style={sizeButton}>FAQ</Button>

                                <Button onClick={this.handleClickAbout} style={sizeButton}>ABOUT</Button>
                            </Panel.Body>
                        </Panel>

                    </Col>
                    <Col sm={6} md={4}>
                    </Col>
                </Row>
                {content}
                    
                
            </Grid>

            
            
            
        );
    }
}



export default AboutComponent;