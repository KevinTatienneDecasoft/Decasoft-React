import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutComponent from '../AboutComponent/About';
import MapComponent from '../MapComponent/Map';
import AroundMeComponent from '../AroundMeComponent/AroundMe';


// class FindDriverComponent extends React.Component {

// }


const FindDriverComponent = () => (
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

      <Route exact path="/" component={Home} />
      <Route path="/aroundMe" component={AroundMe} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
    <MapComponent />
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
    <AboutComponent />
  </div>
);

const AroundMe = () => (
  <div>
    <h2>Around Me</h2>
    <AroundMeComponent />
  </div>
);

export default FindDriverComponent;