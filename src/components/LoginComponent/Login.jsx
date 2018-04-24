import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio } from 'react-bootstrap';
import login from './login.css';
import Session from '../../Session';
import Slider from 'rc-slider';
import Geocode from 'react-geocode';
import 'rc-slider/assets/index.css';

//images
import smoke from '../../image/smoke.png';
import music from '../../image/music.png';
import blabla from '../../image/blabla.png';
import woman from '../../image/woman.png';
import man from '../../image/man.png';
import loginImg from '../../image/login.png';
import Config from '../../Config';

const customStyles = {
    content: {
        marginTop: '22%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-30%',
        width: '40%',
        height: '900px',
        transform: 'translate(-50%, -50%)'
    }
};

//const IP = "10.31.1.166";
const IP = "192.168.0.11";
const DRIVER = "Driver";
const MAN = "Man";
const HOME = "Home";
const DEST = "Dest";

Geocode.setApiKey("AIzaSyA50y7GQTZUHEo5e2kKHffvzv9xOUGop3E");

Modal.setAppElement('#root');

const imageStyle = {
    width: '70%'
};

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};


class LoginComponent extends Session {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            value: '',
            pseudo: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: '',
            adrHome: '',
            sexe: MAN,
            statusUser: DRIVER,
            adrDest: '9 rue de gembloux 31500 Toulouse',
            errorLogin: false,
            successRegister: false,
            loginAction: true,
            smoke: false,
            music: false,
            speak: false,
            womanOption: false,
            manOption: false,
            radiusCircle: 500,
            destLatitude: 0,
            destLongitude: 0,
            homeLatitude: 0,
            homeLongitude: 0
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
        this.choiceLogin = this.choiceLogin.bind(this);
        this.radiusChange = this.radiusChange.bind(this);


        this.choiceOption = this.choiceOption.bind(this);

        this.testSubmit = this.testSubmit.bind(this);

    }

    choiceOption(e) {
        let status = this.state[e.target.alt];
        this.setState({ [e.target.alt]: !status });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    choiceLogin(e) {
        let status = e.target.id;
        if (status === "true") {
            this.setState({ loginAction: true });
        } else {
            this.setState({ loginAction: false });
        }

    }

    testSubmit(e) {
        e.preventDefault();
        console.log("submit");
    }

    loginSubmit(event) {
        event.preventDefault();
        var user = new User();
        user.email = this.state.pseudo;
        user.username = this.state.pseudo;
        user.password = this.state.password;

        var headers = {
            'Content-Type': 'application/json'
        }

        axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/user/login", user, headers)
            .then((response) => {
                if (!response.data) {
                    this.setState({ errorLogin: true });

                    setTimeout(() => {
                        this.setState({ errorLogin: false });
                    }, 2000);
                } else {
                    user.password = "";
                    user.token = response.data.token;
                    super.setSession(JSON.stringify(user));
                    window.location.reload();
                }
            })
            .catch((error) => {
                alert("Erreur serveur");
            });
    }

    getDateFr(dateEn) {
        var parts = dateEn.split('-');
        return parts[2] + '/' + parts[1] + '/' + parts[0];
    }

    getStatusByValue(status, stateStatus) {
        let statusResult = false;
        if (stateStatus === status) {
            statusResult = true;
        }
        return statusResult;
    }

    radiusChange(value) {
        this.setState({ radiusCircle: value });
    }

    // Get latidude & longitude from address.
    getLongLat(adr, status) {
        let responseCoord = null;
        return Geocode.fromAddress(adr).then(
            response => {
                responseCoord = response.results[0].geometry.location;

                if (status === DEST) {
                    this.setState({
                        destLatitude: responseCoord.lat,
                        destLongitude: responseCoord.lng
                    });
                } else {
                    this.setState({
                        homeLatitude: responseCoord.lat,
                        homeLongitude: responseCoord.lng
                    });
                }

            },
            error => {
                console.error(error);
            }
        );

    }

    registerSubmit(event) {
        event.preventDefault();
        var user = new User();
        user.firstName = this.state.firstName;
        user.lastName = this.state.lastName;
        user.email = this.state.email;
        user.username = this.state.pseudo;
        user.password = this.state.password;
        user.smoke = this.state.smoke;
        user.music = this.state.music;
        user.speak = this.state.speak;
        user.woman = this.state.womanOption;
        user.man = this.state.manOption;
        user.driver = this.getStatusByValue(DRIVER, this.state.statusUser);
        user.male = this.getStatusByValue(MAN, this.state.sexe);

        let dateENG = this.state.birthday;
        user.birthDate = this.getDateFr(dateENG);
        user.radiusCircle = this.state.radiusCircle.toString();

        let adrHome = this.state.adrHome;
        let adrDest = this.state.adrDest;

        this.getLongLat(adrHome, HOME).then(result => this.getLongLat(adrDest, DEST)).then(result => {
            user.destLatitude = this.state.destLatitude;
            user.destLongitude = this.state.destLongitude;
            user.homeLatitude = this.state.homeLatitude;
            user.homeLongitude = this.state.homeLongitude;
            
            //console.log(user);
            axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/user/register", user, axiosConfig).then((response) => {
                if (!response.data) {
                    
                } else {
                    console.log(response);
                    this.setState({ successRegister: true });

                    setTimeout(() => {
                        this.setState({ successRegister: false });
                        this.setState({ loginAction: true });
                    }, 2000);
                }
            }).catch((error) => {
                alert("Erreur serveur");
            });
        });
    }

    render() {

        function DynamicForm(label, type, name, value, placeholder, handleInputChange) {
            let result;

            if (type !== "checkbox") {
                result = (
                    <FormGroup>
                        <ControlLabel>{label}</ControlLabel>
                        <FormControl
                            type={type}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={handleInputChange}
                            required="true"
                        />
                        <FormControl.Feedback />
                    </FormGroup>);
            }

            return result;
        }
        let loginForm;

        if (this.state.loginAction) {
            loginForm =
                (
                    <form onSubmit={this.loginSubmit}>
                        {DynamicForm("Pseudo / Email:", "text", "pseudo", this.state.pseudo, "Enter pseudo or email", this.handleInputChange)}
                        {DynamicForm("Password:", "password", "password", this.state.password, "Enter password", this.handleInputChange)}
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </form>
                );
        } else {
            loginForm =
                (
                    <form onSubmit={this.registerSubmit}>
                        {DynamicForm("Pseudo:", "text", "pseudo", this.state.pseudo, "Enter pseudo", this.handleInputChange)}
                        {DynamicForm("Email:", "email", "email", this.state.email, "Enter email", this.handleInputChange)}
                        {DynamicForm("Password:", "password", "password", this.state.password, "Enter password", this.handleInputChange)}

                        {DynamicForm("FirstName:", "text", "firstName", this.state.firstName, "Enter firstName", this.handleInputChange)}
                        {DynamicForm("LastName:", "text", "lastName", this.state.lastName, "Enter lastName", this.handleInputChange)}

                        {DynamicForm("Birthday:", "date", "birthday", this.state.birthday, "Enter birthday", this.handleInputChange)}
                        {DynamicForm("Address home:", "text", "adrHome", this.state.adrHome, "Enter Address Home", this.handleInputChange)}
                        {DynamicForm("Address Destination:", "text", "adrDest", this.state.adrDest, "", this.handleInputChange)}

                        <FormGroup value={this.state.sexe} onChange={this.handleInputChange} >
                            <Radio name="sexe" value="Man" inline >Man</Radio>{' '}
                            <Radio name="sexe" value="Woman" inline>Woman</Radio>
                        </FormGroup>

                        <FormGroup value={this.state.statusUser} onChange={this.handleInputChange} >
                            <Radio name="statusUser" value="Driver" inline >Driver</Radio>{' '}
                            <Radio name="statusUser" value="Passenger" inline>Passenger</Radio>
                        </FormGroup>

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

                        <p></p>
                        <div className="center">
                            <ControlLabel>Radius meeting point</ControlLabel>
                            <h3>{this.state.radiusCircle} meters</h3>
                        </div>
                        <Slider min={0} max={2000} defaultValue={500} onChange={this.radiusChange} />
                        <p></p>
                        <input className="btn btn-primary" type="submit" value="Register" />
                    </form>
                );
        }

        return (
            <div>
                <p className="loginTitle" onClick={this.openModal}>Sign In / Register</p>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <Row>
                        <Col sm={8} md={8}>
                            <h2>Sign In / Register</h2>
                        </Col>
                        <Col sm={1} md={1}>
                        </Col>
                        <Col sm={3} md={3}>
                            <p className="closeModal" onClick={this.closeModal}>X</p>
                        </Col>
                    </Row>
                    <Row>

                        <Col sm={4} md={4}>
                        </Col>

                        <Col sm={4} md={4}>
                            <img src={loginImg} style={imageStyle} alt="login" />
                        </Col>

                        <Col sm={4} md={4}>
                        </Col>
                    </Row>


                    <Row className="center centerBtn">
                        <Col sm={6} md={6} onClick={this.choiceLogin} id="true">Login</Col>
                        <Col sm={6} md={6} onClick={this.choiceLogin} id="false">Register</Col>
                    </Row>

                    {loginForm}
                    {this.state.errorLogin ? <div class="alert alert-danger" role="alert">Error pseudo or password, retry login</div> : null}
                    {this.state.successRegister ? <div class="alert alert-success" role="alert">Register ok ! Sign in now !</div> : null}
                </Modal>

            </div>

        );
    }

}

export default LoginComponent;