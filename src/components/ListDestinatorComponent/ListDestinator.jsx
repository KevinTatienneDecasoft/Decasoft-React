import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';
import DestinatorComponent from '../DestinatorComponent/Destinator';

import Session from '../../Session';

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const IP = "10.31.1.166";

class ListDestinatorComponent extends Session {

    constructor() {
        super();
            this.state = {
                listDestinator : []

            }

        this.loginSubmit();
    }

    loginSubmit() {
        let session = super.getSession();

        if (session) {

            let object = JSON.parse(session);

            let token = object.token;


            axios.post("http://" + IP + ":8080/chat/getAllMessages", token, axiosConfig)
                .then((res) => {
                    if (!res.data) {
                        console.log("error");
                    } else {
                        
                        this.setState({listDestinator:res.data});
                     
                    }
                })

        }

    }

    _renderObject() {
        
        let content = [];
        
            this.state.listDestinator.forEach(e => {
                
                let pseudo = Object.keys(e)[0];
                let tabMessage = e[pseudo];
                console.log(tabMessage.length)
                content.push(<DestinatorComponent pseudo={pseudo} nombre=""/>)
                
            })

        return content;
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