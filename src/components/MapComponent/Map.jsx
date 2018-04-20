import React from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                origin: new google.maps.LatLng(43.618963199999996, 1.4338141),
                destination: new google.maps.LatLng(43.6042600, 1.4430500),
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
        {/* lat: 43.6042600, lng: 1.4436700 */}
            {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.userLat), lng: parseFloat(props.userLng) }} onClick={props.onMarkerClick} />}
            {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
    )

class MapComponent extends React.Component {

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
    }

    state = {
        isMarkerShown: true,
        lat: null,
        lng: null
    }

    getTrajet = () => {

        var position = {
            'latitude': this.props.lat,
            'longitude': this.props.lng
        }

        var headers = {
            'Content-Type': 'application/json'
        }

        axios.post("http://" + IP + ":8080/map/aroundMe", position, headers)
            .then((response) => {
                if (!response.data) {
                } else {
                    console.log(response.data);
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

    routedMap = () => (
        <div>
            <MyMap2Component
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            userLat={this.props.lat}
            userLng={this.props.lng}
            />
            <button type="button" class="btn btn-primary" onClick={this.getTrajet}>on the road</button>
        </div>
    );
    

    render() {
        return (
            <Router>
                <div>
                    <ul>
                    {/* <li>
                        <Link to="/">Home</Link>
                    </li> */}
                    <li>
                        <Link to="/routedMap">On the Road !</Link>
                    </li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={this.initialMap} />
                    <Route path="/routedMap" component={this.routedMap} />
                </div>
            </Router>


            
            
        )
    }
}   

export default MapComponent;