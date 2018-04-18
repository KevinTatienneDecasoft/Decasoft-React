import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
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
            {props.isMarkerShown && <Marker position={{ lat: props.userLat, lng: props.userLng }} onClick={props.onMarkerClick} />}
        </GoogleMap>
    )

class MapComponent extends React.Component {

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
          },
          error => console.log(error)
        );
    }

    state = {
        isMarkerShown: false,
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        return (
            <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            userLat={this.state.lat}
            userLng={this.state.lng}
            />
        )
    }
}   

export default MapComponent;