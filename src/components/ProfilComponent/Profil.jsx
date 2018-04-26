import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';

import Session from '../../Session';
import Config from '../../Config';

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

class ProfilComponent extends Session {

    constructor() {
        super();
        this.state = {
            pseudo: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: '',
            adrHome: '',
            sexe: ''
        }
        //this.handleChange = this.handleChange.bind(this);
    }

    render() {
            let content;
            let session = super.getSession();
    
            if (session) {
                let user = new User();
                user.token = JSON.parse(session).token;
    
                axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/user/profile", JSON.stringify(user), axiosConfig)
                .then((response) => {
                    if (!response.data) {
                    } else {
                        let sexe = "Woman";
                        if(response.data.male) {
                            sexe = "Man";
                        }
    
                        this.setState({
                            pseudo: response.data.username,
                            email: response.data.email,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            sexe: sexe
                        });
                    }
                })
                .catch((error) => {
                    alert("Erreur serveur");
                });
    
    
                content = (
                    <Grid>
                        <Row>
                            <h1>PERSONNAL INFORMATION</h1>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <h2><b>Firstname</b></h2>
                                <h3>{this.state.firstName}</h3>
                            </Col>
                            <Col md={4}>
                                <h2><b>Lastname</b></h2>
                                <h3>{this.state.lastName}</h3>
                            </Col>
                            <Col md={4}>
                                <h2><b>Email</b></h2>
                                <h3>{this.state.email}</h3>
                            </Col>
                        </Row>
    
                        <Row>
                            <Col md={4}>
                                <h2><b>Gender</b></h2>
                                <h3>{this.state.sexe}</h3>
                            </Col>
                            <Col md={4}>
                                <h2><b>Birthday</b></h2>
                                <h3>{this.state.birthday}</h3>
                            </Col>
                            <Col md={4}>
                                <h2><b>Position</b></h2>
                                <h3>TODO</h3>
                            </Col>
                        </Row>
                    </Grid>
                );
            }
        

        return (
            <div>
                {content}
            </div>
        )
    }

}

export default ProfilComponent;