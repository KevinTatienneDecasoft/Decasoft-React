import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio } from 'react-bootstrap';

import Session from '../../Session';

class DestinatorComponent extends Session {

    constructor() {
        super();
    }


    render() {
       console.log(this.props);
        var pseudo = this.props.pseudo;
        var count = this.props.number;
        return (
            <Col  className="destinator">

                <p>{pseudo}</p>
                <p>{count} message(s)</p>

            </Col>

        );
    }

}

export default DestinatorComponent;