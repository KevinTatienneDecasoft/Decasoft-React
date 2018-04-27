import React from 'react';
import axios from 'axios';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Session from '../../Session';
import Config from '../../Config';
import MessageModel from '../../models/messageModel';

const google = window.google;

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const centerStyle = {
    textAlign: "center"
}

const MyMapComponent = compose(
    withProps({
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
        {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.userLat), lng: parseFloat(props.userLng) }} onClick={props.onMarkerClick} />}
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
    )


const MyMap2Component = compose(
    withProps({
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

    constructor() {
        super();
        this.contactUser = this.contactUser.bind(this);
    }

    map = true;

    /*componentWillMount() {
        // navigator.geolocation.getCurrentPosition(
        //   position => {
        //     this.setState({ lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) });
        //   },
        //   error => console.log(error)
        // );
    }*/

    componentDidMount() {
        let session = super.getSession();
        if (session) {
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
                    this.setState({ data: response.data })
                }
            })
            .catch((error) => {
                alert(error);
            });

    }

    contactUser(e) {
        let session = super.getSession();
        if (session) {
            let contact = e.target.id;
            let messageValue = "Hello";

            let sendMessagePost = new MessageModel();
            sendMessagePost.token = JSON.parse(session).token;
            sendMessagePost.message = messageValue;
            sendMessagePost.toUsername = contact;
            console.log(sendMessagePost);

            axios.post("http://" + Config.IP() + ":" + Config.PORT() + "/chat/send", JSON.stringify(sendMessagePost), axiosConfig).then((res) => {
                window.location.href = "/nameAccount";
            });
        }
    }

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

    routedMap = ({ match }) => {
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

        let session = super.getSession();
        if (session) {

            this.state.data.forEach((e, index) => {

                if (e.user.username !== JSON.parse(session).username) {
                    content.push(
                        <tr key={index}>
                            <td>{e.user.username}</td>
                            <td><Link to={"/" + e.userID + "/" + e.userLatitude + "/" + e.userLongitude + "/" + e.meLatitude + "/" + e.meLongitude}
                            >On the Road !</Link></td>
                            <td>{e.distance} m</td>
                            <td><button onClick={this.contactUser} id={e.user.username} className="btn btn-primary">Contact</button></td>
                        </tr>
                    );
                }

            });
        }


        return content;

    }

    render() {
        let tableRender;

        let session = super.getSession();
        if (session) {
            tableRender = (
                <table className="table">
                    <thead>
                        <tr>
                            <th style={centerStyle} >Username</th>
                            <th style={centerStyle}>Meeting point</th>
                            <th style={centerStyle}>Distance</th>
                            <th style={centerStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderObject()}
                    </tbody>
                </table>
            );
        }

        return (
            <Router>
                <div>
                    {tableRender}

                    <hr />

                    <Route exact path="/" component={this.initialMap} />
                    <Route path="/:id/:userLat/:userLng/:meLat/:meLng" component={this.routedMap} />
                </div>
            </Router>
        )
    }
}

export default MapComponent;