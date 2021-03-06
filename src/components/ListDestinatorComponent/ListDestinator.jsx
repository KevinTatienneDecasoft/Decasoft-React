import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';
import DestinatorComponent from '../DestinatorComponent/Destinator';
import MessageComponent from '../MessageComponent/Message';

import Session from '../../Session';
import Config from '../../Config';

import chatImg from '../../image/chat.png';
import profilImg from '../../image/img_avatar2.png';
import MessageModel from '../../models/messageModel';

const imageStyle = {
    width: '50%'
};

const textareaStyle = {
    width: '100%',
    height: '100px',
    border: '2px solid #2a71db87',
    borderRadius: '10px',
    resize: 'none'
}

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
            messageToSend: '',
            contactUsername: '',
            displayForm: false,
            listDestinator: [],
            listMessage: []
        }


        this.updateDestinators();
        this.openChat = this.openChat.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
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
                    this.setState({ listDestinator: res.data });
                    this.getListMessages();
                }
            });
        }
    }

    updateDestinators() {
        let session = super.getSession();
        let self = this;
        this.getAllMessages(this);
        setInterval(function () {
            self.getAllMessages(self);
        }, 10000);

    }

    timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    getListMessages() {
        let contactUsername = this.state.contactUsername;

        if (contactUsername != '') {
            let session = super.getSession();

            let tabMessages = [];
            this.state.listDestinator.forEach(e => {

                let pseudo = Object.keys(e)[0];
                let tabMessage = e[pseudo];

                //console.log(contactUsername, pseudo);

                if (contactUsername === pseudo) {

                    tabMessage.forEach(listmessage => {
                        var date = this.timeConverter(listmessage.timestamp);

                        let statusItem;
                        let className;
                        if (listmessage.fromUsername !== JSON.parse(session).username) {
                            statusItem = "reception";
                            className = "receveMessage";
                        } else {
                            statusItem = "send";
                            className = "sendMessage";
                        }

                        let item = {
                            date: date,
                            title: listmessage.message,
                            status: statusItem,
                            className: className
                        };

                        tabMessages.push(item);
                    });

                }

            });
            this.setState({
                listMessage: tabMessages,
                displayForm: true
            });
        }


    }

    openChat(e) {
        let pseudo = e.target.id;
        this.setState({ contactUsername: pseudo });
        this.updateDestinators();
/*
        let session = super.getSession();

        let tabMessages = [];
        this.state.listDestinator.forEach(e => {

            let pseudo = Object.keys(e)[0];
            let tabMessage = e[pseudo];
            tabMessage.forEach(listmessage => {
                var date = this.timeConverter(listmessage.timestamp);

                let statusItem;
                let className;
                if (listmessage.fromUsername === session.username) {
                    statusItem = "reception";
                } else {
                    statusItem = "send";
                }

                let item = {
                    date: date,
                    title: listmessage.message,
                    status: statusItem
                };

                tabMessages.push(item);
            });

        });
        this.setState({
            listMessage: tabMessages,
            displayForm: true
        });*/
    }

    sendMessage() {
        let session = super.getSession();
        let messageValue = this.state.messageToSend;

        if (messageValue) {
            let sendMessagePost = new MessageModel();
            sendMessagePost.token = JSON.parse(session).token;
            sendMessagePost.message = messageValue;
            sendMessagePost.toUsername = this.state.contactUsername;
            console.log(sendMessagePost);

            axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/chat/send", JSON.stringify(sendMessagePost), axiosConfig).then((res) => {
                this.setState({ messageToSend: '' });
                this.getAllMessages();
            });
        }
        else {
            alert('Message is empty');
        }

    }


    render() {
        let result;
        let content = [];

        if (this.state.listDestinator.length == 0) {
            result = (<div><h3>Aucun messages, allez sur l'onglet Map pour contacter un utilisateur sur votre chemin</h3></div>);
        } else {
            this.state.listDestinator.forEach((e, index) => {

                let pseudo = Object.keys(e)[0];
                let tabMessage = e[pseudo];
                content.push(
                    <Col key={index} className="destinator list-group-item">
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
                        <p>{tabMessage.length} message(s)</p>
                    </Col>
                );

            });

            result = content;
        }

        let messagesChat = [];

        this.state.listMessage.forEach((e, index) => {
            messagesChat.push(<MessageComponent key={index} title={e.title} status={e.status} date={e.date} />);
        });

        let renderForm;
        if (this.state.displayForm) {
            let formContent = (
                <div>
                    <textarea name="body" style={textareaStyle} name="messageToSend" onChange={this.handleChange} value={this.state.messageToSend}>
                    </textarea>
                    <button className="btn btn-primary" onClick={this.sendMessage} >Send</button>
                </div>
            );
            renderForm = formContent;
        }

        let session = super.getSession();
        if (session) {
            return (
                <div>
                    <Row>
                        <Col md={3}>
                            <ul className="list-group">
                                {result}
                            </ul>
                        </Col>
                        <Col md={9}>
                            <Row>
                                {messagesChat}
                            </Row>
                            <Row>
                                {renderForm}
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        }
        else {
            return null;
        }
    }

}

export default ListDestinatorComponent;