import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import './style.css';



import { GeoLocater, SearchForm, RegisterOrLogin, CovidButton } from '../../components'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

const mapStyle = {
    width: '100vw',
    height: '100vh'
}

const mapboxApiKey = 'pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ';
// hide access token

export const Homepage = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentClickedMarkerLatLng, setcurrentClickedMarkerLatLng] = useState([0, 0]);
    const [titleField, setTitleField] = useState("");
    const [commentField, setCommentField] = useState("");
    const [ratingField, setRatingField] = useState(0);
    const [formError, setFormError] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [currentTime, setCurrentTime] = useState('');
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

    useEffect(() => {
        const getPins = async () => {
            try {
                const response = await axios.get('https://127.0.0.1:8000/reviews/home/')
                setMarkers(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPins();
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

        // if (localStorage.getItem('username')) {
        setcurrentClickedMarkerLatLng([lat, lng])
        setDialogOpen(true)
        // }
    }

    const handleDialog = (clickedLocation) => {
        showDialog(clickedLocation)
    }

    const commitToDb = async (newMarker) => {
        try {
            let response = await fetch('https://127.0.0.1:8000/reviews/create/', {
                method: "POST",
                body: JSON.stringify(newMarker),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            let jsonResponse = await response.json()
            console.log(jsonResponse.body)
        } catch (err) {
            console.log(err)
        }
    }

    const timeConvert = (timestamp) => {
        let today = new Date(Number(timestamp));
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    const addMarker = async () => {
        const lat = currentClickedMarkerLatLng[0]
        const lng = currentClickedMarkerLatLng[1]
        if (titleField !== "" && commentField !== "" && ratingField !== 0) {
            let newMarker = {
                latitude: lat,
                longitude: lng,
                title: titleField,
                body: commentField,
                rating: ratingField,
                username: localStorage.getItem('username'),
                date: timeConvert(new Date().getTime())
            }
            setMarkers([
                ...markers,
                newMarker
            ])
            await commitToDb(newMarker)
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

            <ReactMapGL
                ref={mapRef}
                mapboxApiAccessToken={mapboxApiKey}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                {...viewport}
                {...mapStyle}
                onViewportChange={(viewport) => setViewport(viewport)}
                onDblClick={handleDialog}
            >
                <div id='mainButtons'>
                    <RegisterOrLogin />
                    <CovidButton />

                </div>

                <SearchForm mapRef={mapRef} mapboxApiKey={mapboxApiKey} geocoderContainerRef={geocoderContainerRef} handleGeocoderViewportChange={handleGeocoderViewportChange} />



                {markerCollection}
                {showPopup && (<Popup
                    latitude={selectedMarker.latitude}
                    longitude={selectedMarker.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setShowPopup(false)}
                    anchor="top" >
                    <div className="card">
                        <label className="review">Place</label>
                        <h4 className="place">{selectedMarker.title}</h4>
                        <label className="review">Review</label>
                        <p>{selectedMarker.body}</p>
                        <label>Rating</label>
                        <div> Rating: {selectedMarker.rating}/5</div>
                        <label>Information</label>
                        <span className="username">
                            Created by <b>{selectedMarker.username}</b>
                        </span>
                        {/* <span className="date">{format(p.createdAt)}</span> */}
                        <span classname='date'> Date: {selectedMarker.date}</span>
                    </div>
                </Popup>)}

            </ReactMapGL>

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