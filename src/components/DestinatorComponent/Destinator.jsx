import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio } from 'react-bootstrap';

import chatImg from '../../image/chat.png';
import profilImg from '../../image/img_avatar2.png';

import Session from '../../Session';

const imageStyle = {
    width: '50%'
};

class DestinatorComponent extends Session {

    constructor() {
        super();
        this.openChat = this.openChat.bind(this);
    }

    openChat(e) {
        let pseudo = e.target.id;
        console.log(pseudo);
    }


    render() {
        var pseudo = this.props.pseudo;
        var messages = this.props.number;
        return (
            <Col className="destinator list-group-item">
                <Row>
                    <Col md={4}>
                        <img src={profilImg} style={imageStyle} alt="profil-image" />
                    </Col>
                    <Col md={4}>
                        <p>{pseudo}</p>
                    </Col>
                    <Col md={4}>
                        <img src={chatImg} style={imageStyle} onClick={this.openChat} alt="chat" id={pseudo} />
                    </Col>
                </Row>
                <p>{messages} message(s)</p>
            </Col>

        );
    }

}

export default DestinatorComponent;