import React from 'react'

export const SearchForm = () => {


    // mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtc2FtdXh1bWVkIiwiYSI6ImNrd3MybGxuODBrdWIzMWxzcWt3OWozMGkifQ.NQEvNUAlbCWFBctLYFuYAQ';
    // const map = new mapboxgl.Map({
    // container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v11',
    // center: [-79.4512, 43.6568],
    // zoom: 13
    // });

    // // Add the control to the map.
    // map.addControl(
    // new MapboxGeocoder({
    // accessToken: mapboxgl.accessToken,
    // mapboxgl: mapboxgl
    // })
    // );

    return (
        <>
            <input type="text" className="search" placeholder="Search for Locations" />


        </>
    )
}




