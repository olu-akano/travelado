import React, { useRef, useEffect, useState, useCallback } from 'react';
import './style.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';



import { GeoLocater, SearchForm, RegisterOrLogin, CovidData, CountrySelect, WebScraper } from './components'



// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/Forfix'mGroup';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

const mapStyle = {
    width: '10vw',
    height: '100vh'
}

const mapboxApiKey = 'pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ';
// hide access token

export const App = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentClickedMarkerLatLng, setcurrentClickedMarkerLatLng] = useState([0, 0]);
    const [titleField, setTitleField] = useState("");
    const [commentField, setCommentField] = useState("");
    const [ratingField, setRatingField] = useState(0);
    const [formError, setFormError] = useState(false);
    const [currentUser, setCurrentUser] = useState("Saja");
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewport, setViewport] = useState(
        {
            latitude: 40.7306,
            longitude: 34.4710,
            zoom: 1.2
        });

    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState({});

    const [covidDataCountries, setCovidDataCountries] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const mapRef = useRef();
    const geocoderContainerRef = useRef();
    const mapboxElRef = useRef(null);
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

    const resetForm = () => {
        setTitleField("")
        setCommentField("")
        setRatingField(0)
        setFormError(false)
    };


    const showDialog = (clickedLocation) => {
        let lat = clickedLocation.lngLat[1]
        let lng = clickedLocation.lngLat[0]
        clickedLocation.stopImmediatePropagation()
        console.log(clickedLocation)

        if (auth) {
            setcurrentClickedMarkerLatLng([lat, lng])
            setDialogOpen(true)
        }
    }

    const handleDialog = (clickedLocation) => {
        showDialog(clickedLocation)
    }



    const addMarker = () => {
        const lat = currentClickedMarkerLatLng[0]
        const lng = currentClickedMarkerLatLng[1]
        if (titleField !== "" && commentField !== "" && ratingField !== 0) {
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

            setDialogOpen(false)
            resetForm()
        } else {
            setFormError(true)
        }
    }

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker)
        setShowPopup(true)

    }


    const markerCollection = [];
    markers.forEach((marker, index) => {
        markerCollection.push(
            <Marker
                onClick={() => { handleMarkerClick(marker) }}
                key={index}
                longitude={marker.longitude}
                latitude={marker.latitude}
            >
                <div className="marker temporary-marker"><span></span></div>
            </Marker>
        )
    })


    const formErrorDiv = () => {
        if (formError) {
            return <div style={{ 'color': 'red' }}><strong>Please complete all fields</strong></div>
        }
    }


    return (
        <>
            {/* <Box sx={{ flexGrow: 1 }}>
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
            </Box> */}



            <ReactMapGL
                ref={mapRef}
                mapboxApiAccessToken={mapboxApiKey}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                {...viewport}
                {...mapStyle}
                onViewportChange={(viewport) => setViewport(viewport)}
                onDblClick={handleDialog}
            >
                <RegisterOrLogin />
                <br></br>
                <CovidData setCovidDataCountries={setCovidDataCountries}/>
                <SearchForm mapRef={mapRef} mapboxApiKey={mapboxApiKey} geocoderContainerRef={geocoderContainerRef} handleGeocoderViewportChange={handleGeocoderViewportChange} />

            
                {markerCollection}
                {showPopup && (<Popup
                    latitude={selectedMarker.latitude}
                    longitude={selectedMarker.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setShowPopup(false)}
                    anchor="top" >
                    <div>{selectedMarker.title}</div>
                    <div>{selectedMarker.comment}</div>
                    <div>{selectedMarker.rating}/5</div>
                    <div>{selectedMarker.userName}</div>
                    {/* <div>{marker.timestamp}</div> */}
                </Popup>)}

            </ReactMapGL>
            {covidDataCountries.length && (
                    <CountrySelect covidDataCountries={covidDataCountries} />
            )}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Trevalado Marker</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add your comments here!
                    </DialogContentText>
                    <TextField
                        value={titleField}
                        onChange={(e) => setTitleField(e.target.value)}
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        label="Title"
                        helperText="Give your comment a title"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={commentField}
                        onChange={(e) => setCommentField(e.target.value)}
                        required
                        margin="dense"
                        id="comment"
                        label="Comment"
                        multiline
                        minRows="3"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <br></br>
                    <br></br>
                    <Rating
                        value={ratingField}
                        onChange={(e) => setRatingField(Number(e.target.value))}
                        name="rating"
                        precision={0.5}
                        size="large"
                    />
                    <br></br>
                    <br></br>
                    {formErrorDiv()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={addMarker}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}