import React, { useRef, useEffect, useState, useCallback } from 'react';
// import './style.css';
import ReactMapGL from 'react-map-gl';



import {CovidData, CountrySelect, HomePageButton } from '../../components'


const mapStyle = {
    width: '100vw',
    height: '100vh'
}

const mapboxApiKey = 'pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ';
// hide access token

export const Covidpage = () => {


    // const [currentUser, setCurrentUser] = useState("Saja");
    // const [auth, setAuth] = useState(true);
    // const [anchorEl, setAnchorEl] = useState(null);
    const [viewport, setViewport] = useState(
        {
            latitude: 40.7306,
            longitude: 34.4710,
            zoom: 1.2
        });

    const [covidDataCountries, setCovidDataCountries] = useState([]);

    const mapRef = useRef();
    // const mapboxElRef = useRef(null);

    // const handleViewportChange = useCallback(
    //     (newViewport) => setViewport(newViewport),
    //     []
    // );



    // events
    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };




    return (
        <>

            {covidDataCountries.length && (
                <CountrySelect covidDataCountries={covidDataCountries} setViewport={setViewport} />
            )}
            <br></br>
            <ReactMapGL
                ref={mapRef}
                mapboxApiAccessToken={mapboxApiKey}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                {...viewport}
                {...mapStyle}
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <br></br>
                <HomePageButton />

                <CovidData setCovidDataCountries={setCovidDataCountries} />




            </ReactMapGL>

        </>
    );
}