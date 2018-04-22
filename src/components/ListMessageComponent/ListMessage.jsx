import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';
import MessageComponent from '../MessageComponent/Message';

import Session from '../../Session';

const textareaStyle = {
    width: '100%',
    height: '100px',
    border: '2px solid #2a71db87',
    borderRadius: '10px',
    resize: 'none'
}

class ListMessageComponent extends Session {

    constructor() {
        super();
        this.state = {
            messageToSend: '',
            listMessage: [
                {
                    date: "10/10/2018",
                    title: "Bonjour , tu vas bien !",
                    status: "send"
                },
                {
                    date: "Zizi2",
                    title: "Ouais ça roule et toi ?",
                    status: "recive"
                },
                {
                    date: "Zizi2",
                    title: "Ouais ça roule et toi ?",
                    status: "recive"
                },
                {
                    date: "Zizi2",
                    title: "Ouais ça roule et toi ?",
                    status: "recive"
                },
                {
                    date: "Zizi2",
                    title: "Ouais ça roule et toi ?",
                    status: "recive"
                }
            ]

        }

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    sendMessage() {
        let messageValue = this.state.messageToSend;
        if(messageValue) {
            let date = "DATE A VOIR";
            let messageObject = {
                date: date,
                title: messageValue,
                status: "send"
            }
            this.setState({listMessage: this.state.listMessage.concat(messageObject)});
        }
        else {
            alert('Message is empty');
        }
        
    }


    _renderObject() {
        return Object.entries(this.state.listMessage).map(([key, value], i) => {

            return (
                <MessageComponent key={i} status={value.status} date={value.date} title={value.title} />

            )
        })
    }

    render() {
        return (
            <Grid>
                <Row>
                    {this._renderObject()}
                </Row>
                <Row>
                    <textarea name="body" style={textareaStyle} name="messageToSend" onChange={this.handleChange} value={this.state.messageToSend}>
                    </textarea>
                    <button className="btn btn-primary" onClick={this.sendMessage} >Send</button>

                </Row>
            </Grid>
        )
    }

}

export default ListMessageComponent;