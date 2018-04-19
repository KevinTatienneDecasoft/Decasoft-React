import React from 'react';
import axios from 'axios';

const IP = "10.31.1.166";

class AroundMeComponent extends React.Component {

    state = {
        lat: null,
        lng: null,
        data: []
    }

    componentDidMount() {
        this.setCurrentPosition();
    }

    // componentWillUnmount() {
    //     this.state = this.getInitialState();
    // }

    // getInitialState = () => {
    //     const initialState = {
    //         lat: null,
    //         lng: null
    //     };
    //     return initialState;
    // }

    setCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude)
                setTimeout(() => {
                    this.setState({ lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) });
                }, 2000);
                setTimeout(() => {
                    this.getAroundMe();
                }, 3000);
            },
            error => console.log(error)
        );
    }

    getAroundMe = () => {

        var position = {
            'latitude': this.state.lat,
            'longitude': this.state.lng
        }

        var headers = {
            'Content-Type': 'application/json'
        }

        axios.post("http://" + IP + ":8080/map/aroundMe", position, headers)
            .then((response) => {
                if (!response.data) {
                } else {
                    console.log(response.data);
                    this.setState({ data: response.data[0] })
                }
            })
            .catch((error) => {
                alert(error);
            })

        
    }

    render() {
        return(
         <div> { this.state.data.username } : { this.state.data.username } </div>   
        )
    }

}

export default AroundMeComponent;