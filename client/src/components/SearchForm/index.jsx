import React from 'react'
import Geocoder from 'react-map-gl-geocoder'
import './style.css'

export const SearchForm = ({ mapRef, mapboxApiKey, handleGeocoderViewportChange, geocoderContainerRef }) => {

    return (
        <>
            <div
                ref={geocoderContainerRef}
                style={{
                    marginLeft: '45%',
                    marginTop: -50,
                    zIndex: 1,
                    width: 50

                }}
            />
            <Geocoder
                containerRef={geocoderContainerRef}
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={mapboxApiKey}

            />



        </>
    )
}