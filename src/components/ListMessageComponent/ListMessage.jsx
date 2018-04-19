import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';
import MessageComponent from '../MessageComponent/Message';

import Session from '../../Session';


class ListMessageComponent extends Session {

    constructor() {
        super();
        this.state = {
            listMessage : [
                {
                    date : "10/10/2018",
                    title : "Bonjour , tu vas bien batard !",
                    status : "send"
                },
                {
                    date : "Zizi2",
                    title : "Ouais ça roule et toi ?",
                    status : "recive"
                }]

        }

    }

  

    _renderObject(){
		return Object.entries(this.state.listMessage).map(([key, value], i) => {
            
			return (
				<MessageComponent key={i} status={value.status} date={value.date} title={value.title}/>
                
			)
		})
	}

	render(){
		return(
            <Grid>
                <Row>
                    {this._renderObject()}
                </Row>
            </Grid>
		)
	}

}

export default ListMessageComponent;