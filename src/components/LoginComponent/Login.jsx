import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';
import { FormGroup, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';
import login from './login.css';

const customStyles = {
    content: {
        top: '500px',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-30%',
        width: '60%',
        transform: 'translate(-50%, -50%)'
    }
};

const IP = "10.31.1.166";

Modal.setAppElement('#root');


class LoginComponent extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            modalIsOpen: false,
            value: '',
            pseudo: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: '',
            adrHome: '',
            errorLogin: false,
            loginAction: true
        };


        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.choiceLogin = this.choiceLogin.bind(this);

        this.testSubmit = this.testSubmit.bind(this);

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
            this.setState({loginAction: false });
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

        
        console.log("test 2");

        axios.post("http://" + IP + ":8080/user/login", user, headers)
            .then((response) => {
                if (!response.data) {
                    this.setState({errorLogin: true });

                    setTimeout(() => {
                        this.setState({errorLogin: false });
                    }, 2000);
                } else {
                    console.log(response.data);
                    this.closeModal();
                }
            })
            .catch((error) => {
                alert("Erreur serveur");
            })

        
    }

    registerSubmit(event) {
        var user = new User();
        user.email = this.state.pseudo;
        user.username = this.state.pseudo;
        user.password = this.state.password;
        event.preventDefault();
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
                        <Col sm={3} md={3}>
                            <h2>Sign In / Register</h2>
                        </Col>
                        <Col sm={6} md={6}>
                        </Col>
                        <Col sm={3} md={3}>
                            <p className="closeModal" onClick={this.closeModal}>X</p>
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