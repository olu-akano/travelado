import React, { useRef, useEffect, useState, useCallback } from 'react'
import Geocoder from 'react-map-gl-geocoder'

export const SearchForm = ({ mapRef, mapboxApiKey }) => {

    const handleGeocoderViewportChange = useCallback(newViewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
        });
    },
        []
    );


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




