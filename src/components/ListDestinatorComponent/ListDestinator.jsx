import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';
import DestinatorComponent from '../DestinatorComponent/Destinator';

import Session from '../../Session';

const headers = {
    'Content-Type': 'application/json'
}
const IP = "10.31.1.166";
class ListDestinatorComponent extends Session {

    constructor() {
        super();
        this.state = {
            listDestinator: [
                {
                    pseudo: "Zizi",
                    nombre: 15
                },
                {
                    pseudo: "Zizi2",
                    nombre: 18
                }]

        }

        this.loginSubmit();
    }

    loginSubmit() {
        let session = super.getSession();

        if (session) {

            console.log(session);
            let object = JSON.parse(session);
            let accountName = object.token;
            console.log(accountName);


            
            axios.post("http://" + IP + ":8080/chat/getAllMessages", accountName, headers)
                .then((response) => {
                    if (!response.data) {
                        console.log("error");
                    } else {
                        console.log(response.data);
                       
                        
                       // window.location.reload();
                    }
                })
                .catch((error) => {
                    alert("Erreur serveur");
                });
                
        }

    }

    _renderObject() {
        return Object.entries(this.state.listDestinator).map(([key, value], i) => {
            console.log(value.pseudo);
            return (
                <DestinatorComponent key={i} pseudo={value.pseudo} number={value.nombre} />

            )
        })
    }

    render() {
        return (
            <Grid>
                <Row>
                    {this._renderObject()}
                </Row>
            </Grid>
        )
    }

}

export default ListDestinatorComponent;