import React from 'react';
import User from '../../models/user';
import './logout.css';
import Session from '../../Session';


class LogoutComponent extends Session {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        super.removeSession();
        window.location.reload();
    }

    render() {
        return (
            <div>
                <p className="logoutTitle" onClick={this.logout}>Logout</p>
            </div>
        );
    }

}

export default LogoutComponent;