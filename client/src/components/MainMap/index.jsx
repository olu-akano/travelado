import React, { useRef, useEffect, useState, useCallback } from 'react';
import './style.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';


import { GeoLocater, SearchForm, RegisterOrLogin, CovidData, CountrySelect, WebScraper } from './components'


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




export const MainMap = () => {

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
    const [showPopup, setShowPopup] = useState(false);
    const mapRef = useRef();
    const geocoderContainerRef = useRef();
    const mapboxElRef = useRef(null);


    return (
        <div>

        </div>
    )
}
