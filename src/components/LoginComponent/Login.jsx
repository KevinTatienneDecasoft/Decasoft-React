import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col, Radio } from 'react-bootstrap';
import login from './login.css';
import Session from '../../Session';

//images
import smoke from '../../image/smoke.png';
import music from '../../image/music.png';
import blabla from '../../image/blabla.png';
import woman from '../../image/woman.png';
import man from '../../image/man.png';
import loginImg from '../../image/login.png';

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

const IP = "10.31.1.166";

Modal.setAppElement('#root');

const imageStyle = {
    width: '70%'
};


class LoginComponent extends Session {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            value: '',
            pseudo: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: '',
            adrHome: '',
            sexe: 'Man',
            statusUser: 'Driver',
            adrDest: '9 rue de gembloux 31500 Toulouse',
            errorLogin: false,
            loginAction: true,
            smoke: false,
            music: false,
            speak: false,
            womanOption: false,
            manOption: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
        this.choiceLogin = this.choiceLogin.bind(this);

        this.choiceOption = this.choiceOption.bind(this);

        this.testSubmit = this.testSubmit.bind(this);

    }

    choiceOption(e) {
        let status = this.state[e.target.alt];
        this.setState({ [e.target.alt]: !status });
        console.log(this.state);
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
        console.log(this);
        var user = new User();
        user.email = this.state.pseudo;
        user.username = this.state.pseudo;
        user.password = this.state.password;

        var headers = {
            'Content-Type': 'application/json'
        }

        axios.post("http://" + IP + ":8080/user/login", user, headers)
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
            })


    }

    registerSubmit(event) {
        event.preventDefault();
        var user = new User();
        user.email = this.state.pseudo;
        user.username = this.state.pseudo;
        user.password = this.state.password;
        user.birthDate = this.state.birthday;
        user.adrHome = this.state.adrHome;
        user.adrDest = this.state.adrDest;
        user.smoke = this.state.smoke;
        user.music = this.state.music;

        console.log(user);
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
                        {DynamicForm("Pseudo / Email:", "text", "pseudo", this.state.pseudo, "Enter pseudo or email", this.handleInputChange)}
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
                                <img src={smoke} style={imageStyle} onClick={this.choiceOption} className={this.state.smoke ? 'optionSelected': null} alt="smoke" />
                            </Col>
                            <Col md={3}>
                                <img src={music} style={imageStyle} onClick={this.choiceOption} className={this.state.music ? 'optionSelected': null} alt="music" />
                            </Col>
                            <Col md={3}>
                                <img src={blabla} style={imageStyle} onClick={this.choiceOption} className={this.state.speak ? 'optionSelected': null} alt="speak" />
                            </Col>
                        </Row>
                        <p></p>

                        <Row>
                            <Col md={3}></Col>
                            <Col md={3}>
                                <img src={woman} style={imageStyle} onClick={this.choiceOption} className={this.state.womanOption ? 'optionSelected': null} alt="womanOption" />
                            </Col>
                            <Col md={3}>
                                <img src={man} style={imageStyle} onClick={this.choiceOption} className={this.state.manOption ? 'optionSelected': null} alt="manOption" />
                            </Col>
                        </Row>


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
                    

                    <Row className="center">
                        <Col sm={6} md={6} onClick={this.choiceLogin} id="true">Login</Col>
                        <Col sm={6} md={6} onClick={this.choiceLogin} id="false">Register</Col>
                    </Row>

                    {loginForm}
                    {this.state.errorLogin ? <p>Error pseudo or password, retry please</p> : null}

                </Modal>

            </div>

        );
    }

}

export default LoginComponent;