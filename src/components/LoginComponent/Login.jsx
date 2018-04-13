import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import User from '../../models/user';

const customStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const IP = "10.31.1.166";

Modal.setAppElement('#root');


class LoginComponent extends React.Component {

    constructor() {
        super();


        this.state = {
            modalIsOpen: false,
            pseudo: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: '',
            adrHome: '',
            errorLogin: false,
            loginAction: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    loginSubmit(event) {
        console.log('Pseudo : ' + this.state.pseudo);
        console.log('pwd : ' + this.state.password);
        var user = new User();
        user.email = this.state.pseudo;
        user.username = this.state.pseudo;
        user.password = this.state.password;
        console.log(user);

        var headers = {
            'Content-Type': 'application/json'
        }

        axios.post("http://" + IP + ":8080/user/login", user, headers)
            .then((response) => {
                console.log(response.data);
                if (!response.data) {
                    this.setState({ ["errorLogin"]: true });

                    setTimeout(() => {
                        this.setState({ ["errorLogin"]: false });
                    }, 2000);
                } else {
                    this.closeModal();
                }
            })
            .catch((error) => {
                alert("Erreur serveur");
            })

        event.preventDefault();
    }

    registerSubmit(event) {
        var user = new User();
        user.email = this.state.pseudo;
        user.username = this.state.pseudo;
        user.password = this.state.password;
        console.log(user);

        
        event.preventDefault();
    }

    render() {
        let login;

        if(this.state.loginAction) {
            login =
            (
                <form onSubmit={this.loginSubmit}>
                    <label>
                        Pseudo / Email:
            <input
                            name="pseudo"
                            type="text"
                            value={this.state.pseudo}
                            onChange={this.handleInputChange}
                            required />
                    </label>
                    <label>
                        Password:
            <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required />
                    </label>
                    <input type="submit" value="Login" />
                </form>
            );
        } else {
            login =
            (
                <form onSubmit={this.registerSubmit}>
                    <label>
                        Pseudo / Email:
                        <input
                            name="pseudo"
                            type="text"
                            value={this.state.pseudo}
                            onChange={this.handleInputChange}
                            required />
                    </label>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required />
                    </label>
                    <label>
                        FirstName:
                        <input
                            name="firstName"
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                            required />
                    </label>
                    <label>
                        LastName:
                        <input
                            name="lastName"
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                            required />
                    </label>
                    <label>
                        Birthday:
                        <input
                            name="birthday"
                            type="date"
                            value={this.state.birthday}
                            onChange={this.handleInputChange}
                            required />
                    </label>
                    <label>
                        Address home:
                        <input
                            name="adrHome"
                            type="text"
                            value={this.state.adrHome}
                            onChange={this.handleInputChange}
                            required />
                    </label>

                    <input type="submit" value="Register" />
                </form>
            );
        }

        


        return (
            <div>
                <button onClick={this.openModal}>Sign In / Register</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Sign In</h2>
                    <button onClick={this.closeModal}>X</button>

                    {login}
                    {this.state.errorLogin ? <p>Error pseudo or password, retry please</p> : null}

                </Modal>

            </div>
        );
    }
}

export default LoginComponent;