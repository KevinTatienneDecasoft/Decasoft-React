import React from 'react';
import axios from 'axios';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Session from '../../Session';
import Config from '../../Config';
 
const google = window.google;
 
const MyMapComponent = compose(
    withProps({
        // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5zOp4ahputzG8w9VcDdImo91Asb7PUr4",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 43.6042600, lng: 1.4436700 }}>
        {/* lat: 43.6042600, lng: 1.4436700 */}
        {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.userLat), lng: parseFloat(props.userLng) }} onClick={props.onMarkerClick} />}
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
    )
 
 
const MyMap2Component = compose(
    withProps({
        // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5zOp4ahputzG8w9VcDdImo91Asb7PUr4",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();
 
            DirectionsService.route({
                // origin: new google.maps.LatLng(43.618963199999996, 1.4338141),
                // destination: new google.maps.LatLng(43.6042600, 1.4430500),
                origin: new google.maps.LatLng(parseFloat(this.props.originLat), parseFloat(this.props.originLng)),
                destination: new google.maps.LatLng(parseFloat(this.props.destLat), parseFloat(this.props.destLng)),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 43.6042600, lng: 1.4436700 }}>
        {props.directions && <DirectionsRenderer directions={props.directions}
            origin={new google.maps.LatLng(parseFloat(props.originLat), parseFloat(props.originLng))}
            destination={new google.maps.LatLng(parseFloat(props.destLat), parseFloat(props.destLng))}
        />}
    </GoogleMap>
    )
 
const MyMap3Component = compose(
    withProps({
        // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5zOp4ahputzG8w9VcDdImo91Asb7PUr4",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();
 
            DirectionsService.route({
                // origin: new google.maps.LatLng(43.618963199999996, 1.4338141),
                // destination: new google.maps.LatLng(43.6042600, 1.4430500),
                origin: new google.maps.LatLng(parseFloat(this.props.originLat), parseFloat(this.props.originLng)),
                destination: new google.maps.LatLng(parseFloat(this.props.destLat), parseFloat(this.props.destLng)),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 43.6042600, lng: 1.4436700 }}>
        {props.directions && <DirectionsRenderer directions={props.directions}
            origin={new google.maps.LatLng(parseFloat(props.originLat), parseFloat(props.originLng))}
            destination={new google.maps.LatLng(parseFloat(props.destLat), parseFloat(props.destLng))}
        />}
    </GoogleMap>
    )
 
class MapComponent extends Session {
 
    map = true;
 
    componentWillMount() {
        // navigator.geolocation.getCurrentPosition(
        //   position => {
        //     this.setState({ lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) });
        //   },
        //   error => console.log(error)
        // );
    }
 
    componentDidMount() {
        // const DirectionsService = new google.maps.DirectionsService();
 
        // DirectionsService.route({
        //     origin: new google.maps.LatLng(41.8507300, -87.6512600),
        //     destination: new google.maps.LatLng(41.8525800, -87.6514100),
        //     travelMode: google.maps.TravelMode.DRIVING,
        // }, (result, status) => {
        //     if (status === google.maps.DirectionsStatus.OK) {
        //         this.setState({
        //         directions: result,
        //         });
        //     } else {
        //         console.error(`error fetching directions ${result}`);
        //     }
        // });
 
        let session = super.getSession();
        if (session) {
            // console.log(JSON.parse(session).token);
            this.getTrajet(JSON.parse(session).token);
        }
    }
 
    componentWillReceiveProps() {
    }
 
    state = {
        isMarkerShown: true,
        lat: null,
        lng: null,
        data: []
    }
 
    getTrajet = (tokenFromSession) => {
 
        var token = {
            'token': tokenFromSession
        }
 
        var headers = {
            'Content-Type': 'application/json'
        }
 
        axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/map/onTheRoad", token, headers)
            .then((response) => {
                if (!response.data) {
                } else {
                    // console.log(response.data);
                    this.setState({ data: response.data })
                }
            })
            .catch((error) => {
                alert(error);
            });
 
    }
 
    // componentDidMount() {
    //     this.delayedShowMarker()
    // }
 
    // delayedShowMarker = () => {
    //     setTimeout(() => {
    //         this.setState({ isMarkerShown: true })
    //     }, 5000)
    // }
 
    // handleMarkerClick = () => {
    //     this.setState({ isMarkerShown: false })
    //     this.delayedShowMarker()
    // }
 
    initialMap = () => (
        <div>
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                userLat={this.props.lat}
                userLng={this.props.lng}
            />
        </div>
    );
 
    routedMap = ({match}) => {
        if (this.map) {
            this.map = false;
            return (
                <div>
                    <MyMap2Component
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                        originLat={match.params.userLat}
                        originLng={match.params.userLng}
                        destLat={match.params.meLat}
                        destLng={match.params.meLng}
                    />
                </div>
            );
        } else {
            this.map = true;
            return (
                <div>
                    <MyMap3Component
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                        originLat={match.params.userLat}
                        originLng={match.params.userLng}
                        destLat={match.params.meLat}
                        destLng={match.params.meLng}
                    />
                </div>
            );
        }
       
    }
 
    _renderObject() {
 
        let content = [];
 
        let position = {
           
        }
 
        this.state.data.forEach(e => {
 
            // let position = {
            //     ['userLat' + e.id]: e.userLatitude, [userLong + e.id]: e.userLongitude, [meLat + e.id]: e.meLatitude, [meLong + e.id]: e.meLongitude
            // }
            console.log(e);
           
            content.push(
            <tr>
                <td>{e.user.username}</td>
                <td><Link to={ "/" + e.userID + "/" + e.userLatitude + "/" + e.userLongitude + "/" + e.meLatitude + "/" + e.meLongitude }
                    >On the Road !</Link></td>
                <td>{e.distance} m</td>
                <td>Action</td>
            </tr>
 
               
            )
 
        })
 
        return content;
 
    }
 
    render() {
        return (
            <Router>
                <div>
                    {/* <ul> */}
                        {/* <li>
                        <Link to="/">Home</Link>
                    </li> */}
                        {/* <li> */}
                            {/* <Link to="/routedMap">On the Road !</Link> */}
 
 
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Meeting point</th>
                                    <th>Distance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this._renderObject()}
                            </tbody>
                        </table>
 
                        {/* </li> */}
                    {/* </ul> */}
 
                    <hr />
 
                    <Route exact path="/" component={this.initialMap} />
                    <Route path="/:id/:userLat/:userLng/:meLat/:meLng" component={this.routedMap} />
                </div>
            </Router>
 
 
 
 
        )
    }
}
 
export default MapComponent;