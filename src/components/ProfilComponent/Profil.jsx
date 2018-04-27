import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio, Grid } from 'react-bootstrap';
import Session from '../../Session';
import Config from '../../Config';
import ListDestinatorComponent from '../ListDestinatorComponent/ListDestinator';
import Slider from 'rc-slider';
import Geocode from 'react-geocode';

import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";

//images
import smoke from '../../image/smoke.png';
import music from '../../image/music.png';
import blabla from '../../image/blabla.png';
import woman from '../../image/woman.png';
import man from '../../image/man.png';
import loginImg from '../../image/login.png';

Geocode.setApiKey("AIzaSyA50y7GQTZUHEo5e2kKHffvzv9xOUGop3E");

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const imageStyle = {
    width: '100px'
};

const DRIVER = "Driver";
const MAN = "Man";
const google = window.google;

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
            sexe: '',
            smoke: false,
            music: false,
            speak: false,
            womanOption: false,
            manOption: false,
            radiusCircle: 0,
            statusUser: DRIVER,
            destLatitude: 0,
            destLongitude: 0,
            homeLatitude: 0,
            homeLongitude: 0,
            adrHome: '',
            adrDest: ''
        }
        this.initProfil();
        this.radiusChange = this.radiusChange.bind(this);
        this.choiceOption = this.choiceOption.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    initProfil() {
        let session = super.getSession();

        if (session) {
            let user = new User();
            user.token = JSON.parse(session).token;

            axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/user/profile", JSON.stringify(user), axiosConfig)
                .then((response) => {
                    if (!response.data) {
                    } else {
                        let sexe = "Woman";
                        if (response.data.male) {
                            sexe = "Man";
                        }

                        if (!response.data.driver) {
                            this.setState({ statusUser: "Passenger" });
                        }

                        this.setState({
                            pseudo: response.data.username,
                            email: response.data.email,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            sexe: sexe,
                            birthday: response.data.birthDate,
                            smoke: response.data.smoke,
                            music: response.data.music,
                            speak: response.data.speak,
                            manOption: response.data.man,
                            womanOption: response.data.woman,
                            radiusCircle: response.data.radiusCircle,
                            destLatitude: response.data.destLatitude,
                            destLongitude: response.data.destLongitude,
                            homeLatitude: response.data.homeLatitude,
                            homeLongitude: response.data.homeLongitude
                        });

                        Geocode.fromLatLng(response.data.homeLatitude.toString(), response.data.homeLongitude.toString()).then(
                            response => {
                                const address = response.results[0].formatted_address;
                                this.setState({ adrHome: address });
                            },
                            error => {
                                console.error(error);
                            }
                        );

                        Geocode.fromLatLng(response.data.destLatitude.toString(), response.data.destLongitude.toString()).then(
                            response => {
                                const address = response.results[0].formatted_address;
                                this.setState({ adrDest: address });
                            },
                            error => {
                                console.error(error);
                            }
                        );
                    }
                })
                .catch((error) => {
                    alert("Erreur serveur");
                });
        }
    }

    getStatusByValue(status, stateStatus) {
        let statusResult = false;
        if (stateStatus === status) {
            statusResult = true;
        }
        return statusResult;
    }

    sendToUpdateHttp(user) {
        axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/user/update", JSON.stringify(user), axiosConfig).then((response) => {
            alert("Data updated is ok !");
        }).catch((error) => {
            alert("Erreur serveur");
        });
    }

    updateUser() {
        let session = super.getSession();
        var user = new User();
        user.password = this.state.password;
        user.smoke = this.state.smoke;
        user.music = this.state.music;
        user.speak = this.state.speak;
        user.woman = this.state.womanOption;
        user.man = this.state.manOption;
        user.driver = this.getStatusByValue(DRIVER, this.state.statusUser);
        user.radiusCircle = this.state.radiusCircle.toString();

        user.destLatitude = this.state.destLatitude;
        user.destLongitude = this.state.destLongitude;
        user.homeLatitude = this.state.homeLatitude;
        user.homeLongitude = this.state.homeLongitude;
        user.token = JSON.parse(session).token;

        let DirectionsService = new google.maps.DirectionsService();
        if (user.driver) {
            DirectionsService.route({
                origin: new google.maps.LatLng(parseFloat(user.homeLatitude), parseFloat(user.homeLongitude)),
                destination: new google.maps.LatLng(parseFloat(user.destLatitude), parseFloat(user.destLongitude)),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (result.routes["0"].legs["0"].steps.length > 0) {
                    let Tbl = [];
                    result.routes["0"].legs["0"].steps.forEach(element => {
                        let latitude = element.start_location.lat();
                        let longitude = element.start_location.lng();
                        let coordonnee = { latitude: latitude, longitude: longitude };
                        Tbl.push(coordonnee);
                    });
                    user.segmentPositions = Tbl;
                    console.log(user);
                    this.sendToUpdateHttp(user);
                }
            });
        } else {
            console.log(user);
            this.sendToUpdateHttp(user);
        }


    }

    radiusChange(value) {
        this.setState({ radiusCircle: value });
    }

    choiceOption(e) {
        let status = this.state[e.target.alt];
        this.setState({ [e.target.alt]: !status });
    }

    render() {
        let content;
        let session = super.getSession();

        if (session) {
            content = (
                <div>
                    <Grid>
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
                                <p>Status: {this.state.statusUser}</p>
                                <FormGroup value={this.state.statusUser} onChange={this.handleInputChange} >
                                    <Radio name="statusUser" value="Driver" inline >Driver</Radio>{' '}
                                    <Radio name="statusUser" value="Passenger" inline>Passenger</Radio>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <h2><b>Address Home</b></h2>
                                <h3>{this.state.adrHome}</h3>
                            </Col>
                            <Col md={6}>
                                <h2><b>Address Destination</b></h2>
                                <h3>{this.state.adrDest}</h3>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={1}></Col>
                            <Col md={3}>
                                <img src={smoke} style={imageStyle} onClick={this.choiceOption} className={this.state.smoke ? 'optionSelected' : null} alt="smoke" />
                            </Col>
                            <Col md={3}>
                                <img src={music} style={imageStyle} onClick={this.choiceOption} className={this.state.music ? 'optionSelected' : null} alt="music" />
                            </Col>
                            <Col md={3}>
                                <img src={blabla} style={imageStyle} onClick={this.choiceOption} className={this.state.speak ? 'optionSelected' : null} alt="speak" />
                            </Col>
                        </Row>
                        <p></p>

                        <Row>
                            <Col md={3}></Col>
                            <Col md={3}>
                                <img src={woman} style={imageStyle} onClick={this.choiceOption} className={this.state.womanOption ? 'optionSelected' : null} alt="womanOption" />
                            </Col>
                            <Col md={3}>
                                <img src={man} style={imageStyle} onClick={this.choiceOption} className={this.state.manOption ? 'optionSelected' : null} alt="manOption" />
                            </Col>
                        </Row>
                        <hr />

                        <div>
                            <ControlLabel>Radius meeting point</ControlLabel>
                            <h3>{this.state.radiusCircle} meters</h3>
                        </div>
                        <Slider min={0} max={2000} defaultValue={this.state.radiusCircle} onChange={this.radiusChange} />
                        <p></p>

                        <button className="btn btn-success" onClick={this.updateUser}>Update data</button>


                    </Grid>
                    <div>
                        <ListDestinatorComponent key="listDest" />
                    </div>
                </div>
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