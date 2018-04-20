import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutComponent from '../AboutComponent/About';
import MapComponent from '../MapComponent/Map';
import AroundMeComponent from '../AroundMeComponent/AroundMe';


class FindDriverComponent extends React.Component {

  // constructor(props) {
  //   super();
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       // this.setState({ lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) });
  //       this.state = {
  //         lat : parseFloat(position.coords.latitude),
  //         lng : parseFloat(position.coords.longitude)
  //       };
  //     },
  //     error => console.log(error)
  //   );
  // }

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
  
  AroundMe = () => (
    <div>
      <h2>Around Me</h2>
      <AroundMeComponent lat={this.props.lat} lng={this.props.lng} />
    </div>
  );

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aroundMe">Around Me</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
    
          <hr />
    
          <Route exact path="/" component={this.Home} />
          <Route path="/aroundMe" component={this.AroundMe} />
          <Route path="/about" component={this.About} />
        </div>
      </Router>
    );
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