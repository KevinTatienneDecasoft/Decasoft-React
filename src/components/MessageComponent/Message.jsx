import React from 'react';
import Message from './Message.css';
import LoginComponent from '../LoginComponent/Login';

import { Nav, Navbar, NavItem } from 'react-bootstrap';

class MessageComponent extends React.Component {

  constructor() {
    super();
    
    
  }

  // Fonction permettant d'affecter la couleur au type de message 
 
    render() {
      console.log(this.props);
       let message ;
       let title = this.props.title;
       let status = this.props.status;
       let date = this.props.date;
       if (status=="send"){
          message = 
            (
              <div className="sendMessage">
                  
                    <p>{date}</p>
                    <p>{title}</p>
                  
              </div>
            )
        }else{
          message = 
            (
              <div className="receveMessage">
                 
                    <p>{date}</p>
                    <p>{title}</p>
                  
              </div>
            )

        }
        return (message)          
        
      
    }
}


export default MessageComponent;