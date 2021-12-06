import React from 'react'
import { GeolocateControl } from 'react-map-gl';

export const GeoLocater = () => {


    const geolocateControlStyle = {
        right: 10,
        top: 10
    };

    return (
        <>
            <GeolocateControl
                style={geolocateControlStyle}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                auto
            />
        </>
    )
}
