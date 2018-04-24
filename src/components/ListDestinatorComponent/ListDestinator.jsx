import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';
import DestinatorComponent from '../DestinatorComponent/Destinator';
import ListMessageComponent from '../ListMessageComponent/ListMessage';

import Session from '../../Session';
import Config from '../../Config';

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

class ListDestinatorComponent extends Session {

    constructor() {
        super();
        this.state = {
            listDestinator: []

        }

        this.getAllMessages();
    }

    getAllMessages() {
        let session = super.getSession();

        if (session) {

            let object = JSON.parse(session);

            let token = object.token;


            axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/chat/getAllMessages", token, axiosConfig).then((res) => {
                if (!res.data) {
                    console.log("error");
                } else {
                    console.log(res.data);
                    //this.setState({ listDestinator: res.data });
                }
            });
        }

    }

    _renderObject() {

        let content = [];

        this.state.listDestinator.forEach(e => {

            let pseudo = Object.keys(e)[0];
            let tabMessage = e[pseudo];
            console.log(tabMessage.length)
            content.push(<DestinatorComponent pseudo={pseudo} nombre="" />)

        })

        return content;
    }

    render() {
        return (
            <Row>
                <Col md={3}>
                    <ul class="list-group">
                        <DestinatorComponent pseudo="toto" number="20" />
                        <DestinatorComponent pseudo="titi" number="20" />
                    </ul>
                </Col>
                <Col md={9}>
                    <ListMessageComponent />
                </Col>
                {this._renderObject()}
            </Row>
        )
    }

}

export default ListDestinatorComponent;