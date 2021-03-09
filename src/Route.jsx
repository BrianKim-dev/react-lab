import React, {useState} from 'react';
import TextBox from './TextBox';
// import AwesomeButton from 'react-awesome-button/src/components/AwesomeButton';
// import AwesomeButtonProgress from 'react-awesome-button/src/components/AwesomeButtonProgress';
// import AwesomeButtonSocial from 'react-awesome-button/src/components/AwesomeButtonSocial';
// import { AwesomeButton } from "react-awesome-button";
import './Button.css';
// import AwesomeButtonStyles from "react-awesome-button";
// import {
//     AwesomeButton,
//     AwesomeButtonProgress,
//     AwesomeButtonSocial,
//   } from 'react-awesome-button';
//   import styles from 'react-awesome-button';
// import AwesomeButton from 'react-awes
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from 'axios';

function Route() {
    const [startLat, setStartLat] = useState(0);
    const [startLong, setStartLong] = useState(0);
    const [endLat, setEndLat] = useState(0);
    const [endLong, setEndLong] = useState(0);
    //TODO: Fill in the ? with appropriate names/values for a route.
    //Hint: The defaults for latitudes and longitudes were 0s. What might the default useState value for a route be?
    const [route, setRoute] = useState([]);

    const writeRoutes = () => {
        var rows = [];
        for (var i = 0; i < route.length; i++) {
            // note: we are adding a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<span>({route[i][0]}, {route[i][1]})</span>);
            rows.push(<br />)
        }
        return <div>{rows}</div>
    }

    /**
     * Makes an axios request.
     */
    const requestRoute = () => {
        const toSend = {
            //TODO: Pass in the values for the data. Follow the format the route expects!
            srclat : startLat.nativeEvent.data,
            srclong : startLong.nativeEvent.data,
            destlat : endLat.nativeEvent.data,
            destlong : endLong.nativeEvent.data
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                }
            }

            //Install and import this!
            //TODO: Fill in 1) location for request 2) your data 3) configuration
            axios.post(
            "http://localhost:4567/route",
            toSend,
            config
        )
            .then(response => {
            console.log(response.data);
            //TODO: Go to the Main.java in the server from the stencil, and find what variable you should put here.
            //Note: It is very important that you understand how this is set up and why it works!
            setRoute(response.data["route"]);
            })

            .catch(function (error) {
            console.log(error);

            });
        }
    return( 
        <div>
            <TextBox 
                label={"Start Latitude"} 
                change={setStartLat} />
            <TextBox 
                label={"Start Longitude"}
                change={setStartLong} />
            <TextBox 
                label={"End Latitude"}
                change={setEndLat} />
            <TextBox 
                label={"End Longitude"}
                change={setEndLong} />
            <AwesomeButton type="primary"
                onPress={requestRoute}>Button</AwesomeButton>
            {writeRoutes()}
        </div>
    )
}

export default Route;