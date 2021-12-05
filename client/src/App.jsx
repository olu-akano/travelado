import React, { useRef, useEffect, useState } from 'react';
import './style.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ';

const mapStyle = {
    width: '100%',
    height: 600
}

const mapboxApiKey = 'pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ';

export const App = () => {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [viewport, setViewport] = React.useState(
        {
            latitude: 51.5072,
            longitude: 0.1276,
            zoom: 10
        });


    const CustomPopup = ({ index, marker, closePopup }) => {
        return (
            <Popup
                latitude={marker.latitude}
                longitude={marker.longitude}
                onClose={closePopup}
                closeButton={true}
                closeOnClick={false}
                offsetTop={-30}
            >
                <p>{marker.name}</p>
            </Popup>
        )
    };



    const [markers, setMarkers] = React.useState(
        [{
            latitude: 51.5072,
            longitude: 0.1276,
            name: 'test-1'
        }, {
            latitude: 56.5072,
            longitude: 5.1276,
            name: 'test-2'
        }, {
            latitude: 46.5072,
            longitude: -10.1276,
            name: 'test-3'
        },]);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };





    const onSelected = (item) => {
        setMarker({
            name: item.place_name,
            longitude: item.center[0],
            latitude: item.center[1]
        })
    }



    const markerCollection = [];
    markers.forEach((marker, index) => {
        markerCollection.push(
            <Marker
                key={index}
                longitude={marker.longitude}
                latitude={marker.latitude}>
                <div className="marker temporary-marker"><span></span></div>
            </Marker>
        )
    })


    const addMarker = (clickedLocation) => {
        let long = clickedLocation.lngLat[0]
        let lat = clickedLocation.lngLat[1]

        //place to show the popup so that the user can enter details




        setMarkers([
            ...markers,
            {
                latitude: lat,
                longitude: long,
                title: 'Review',
                review: 'abc',
                rating: 5,
                timestamp: '13:44:00'
            }
        ])

        console.log(long)
        console.log(lat)

    }




    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={auth}
                                onChange={handleChange}
                                aria-label="login switch"
                            />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Trevalado
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <br></br>
            <ReactMapGL
                mapboxApiAccessToken={mapboxApiKey}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                {...viewport}
                {...mapStyle}
                onViewportChange={(viewport) => setViewport(viewport)}
                onClick={(clickedLocation) => addMarker(clickedLocation)}
            >
                {markerCollection}

            </ReactMapGL>
        </>
    );
}

// 1. 
// 2. Change color of marker to red
// 3.  