import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutComponent from '../AboutComponent/About';
import MapComponent from '../MapComponent/Map';
import AroundMeComponent from '../AroundMeComponent/AroundMe';
import ProfilComponent from '../ProfilComponent/Profil';
import Session from '../../Session';


class FindDriverComponent extends Session {

  constructor() {
    super();
    this.state = {
      session: super.getSession()
    }


  }



  Home = () => (
    <div>
      <h2>Home</h2>
      <MapComponent lat={this.props.lat} lng={this.props.lng} />
    </div>
  );

  About = () => (
    <div>
      <h2>About</h2>
      <AboutComponent />
    </div>
  );

  Map = () => (
    <div>
      <h2>Map</h2>
      <MapComponent />
    </div>
  );

  AroundMe = () => (
    <div>
      <h2>Around Me</h2>
      <AroundMeComponent lat={this.props.lat} lng={this.props.lng} />
    </div>
  );

  NameAccount = () => (

    <div>
      <h2>{JSON.parse(this.state.session).username}</h2>
      <ProfilComponent />
    </div>
  );

  render() {
    if (this.state.session) {
      return (<Router>
        <div>
          <Route exact path="/" component={this.Home} />
          <Route path="/about" component={this.About} />
          <Route path="/map" component={this.Map} />
          <Route path="/nameAccount" component={this.NameAccount} />
        </div>
      </Router>);

    } else {


      return (
        <Router>
          <div>
            <Route exact path="/" component={this.Home} />
            <Route path="/about" component={this.About} />
          </div>
        </Router>

      );
    }
  }

}


// const FindDriverComponent = () => (
//   <Router>
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/aroundMe">Around Me</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//       </ul>

//       <hr />

//       <Route exact path="/" component={Home} />
//       <Route path="/aroundMe" component={AroundMe} />
//       <Route path="/about" component={About} />
//     </div>
//   </Router>
// );



export default FindDriverComponent;