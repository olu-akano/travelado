import React from 'react'
import Geocoder from 'react-map-gl-geocoder'
import './style.css'

export const SearchForm = ({ mapRef, mapboxApiKey, handleGeocoderViewportChange, geocoderContainerRef }) => {
    const geolocateControlStyle = {
        left: 10,
        top: 10
    };

    return (
        <>
            {/* <div
                ref={geocoderContainerRef}
                style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    zIndex: 1,
                    width: 50

                }}
            /> */}
            <Geocoder
                // style={geolocateControlStyle}
                containerRef={geocoderContainerRef}
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={mapboxApiKey}
                position="top-right"

            />



        </>
    )
}




