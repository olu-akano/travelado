import React from 'react'
import Geocoder from 'react-map-gl-geocoder'

export const SearchForm = ({ mapRef, mapboxApiKey, handleGeocoderViewportChange }) => {

    return (
        <>
            <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={mapboxApiKey}
                position="top-right"
            />

        </>
    )
}