import React, { useRef, useEffect, useState, useCallback } from 'react';
import './style.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
// import Geocoder from 'react-map-gl-geocoder'


import { GeoLocater, SearchForm } from './components'



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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';



import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ';
// hide access token

const mapStyle = {
    width: '100%',
    height: 600
}

const mapboxApiKey = 'pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ';

export const App = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentClickedMarkerLatLng, setcurrentClickedMarkerLatLng] = useState([0, 0]);
    const [titleField, setTitleField] = useState("");
    const [commentField, setCommentField] = useState("");
    const [ratingField, setRatingField] = useState(0);
    const [currentUser, setCurrentUser] = useState("Saja");
    const mapRef = useRef();

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewport, setViewport] = useState(
        {
            latitude: 51.5072,
            longitude: 0.1276,
            zoom: 10
        });

    const [markers, setMarkers] = useState([]);


    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(newViewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
        });
    },
        []
    );


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

    useEffect(() => {

    }, [])

    // events


    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDialogClose = () => {
        setDialogOpen(false);
    }




    const showDialog = (clickedLocation) => {
        let lat = clickedLocation.lngLat[1]
        let lng = clickedLocation.lngLat[0]

        setcurrentClickedMarkerLatLng([lat, lng])
        setDialogOpen(true)
    }



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






    const addMarker = () => {
        const lat = currentClickedMarkerLatLng[0]
        const lng = currentClickedMarkerLatLng[1]

        setMarkers([
            ...markers,
            {
                latitude: lat,
                longitude: lng,
                title: titleField,
                comment: commentField,
                rating: ratingField,
                userName: currentUser
            }
        ])
    }

    const markerCollection = [];
    markers.forEach((marker, index) => {
        markerCollection.push(
            <div key={index}>

                <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude} >
                    <div className="marker temporary-marker"><span></span></div>
                </Marker >
                <Popup
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="top">
                    <div>{marker.title}</div>
                    <div>{marker.userName}</div>
                    <div>{marker.comment}</div>
                    <div>{marker.rating}</div>

                </Popup>

            </div >



        )
    })

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
                ref={mapRef}
                mapboxApiAccessToken={mapboxApiKey}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                {...viewport}
                {...mapStyle}
                onViewportChange={(viewport) => setViewport(viewport)}
                onClick={(clickedLocation) => showDialog(clickedLocation)}
            >

                <SearchForm mapRef={mapRef} mapboxApiKey={mapboxApiKey} viewport={viewport} handleGeocoderViewportChange={handleGeocoderViewportChange} />
                <GeoLocater />

                {markerCollection}
            </ReactMapGL>
            <Dialog open={dialogOpen}>
                <DialogTitle>Trevalago marker</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add your comments here!
                    </DialogContentText>
                    <TextField
                        requried
                        value={titleField}
                        onChange={(e) => setTitleField(e.target.value)}
                        margin="dense"
                        id="title"
                        helperText="Give your comment a title"
                        type="text"
                        fullWidth
                        variant='outlined'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={addMarker}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}