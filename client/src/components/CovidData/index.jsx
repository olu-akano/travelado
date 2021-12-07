import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';

// import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1Ijoic2FqYTM2IiwiYSI6ImNrd3JtMWtzazBpM2syb285dTN4dWNyd2sifQ.L5VJBCeE8JNppDI41T7CpQ";

export const CovidData = ({ mapboxElRef }) => {
    // DOM element to render map

    const fetcher = (url) =>
        fetch(url)
            .then((r) => r.json())
            .then((data) =>
                data.map((point, index) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [point.coordinates.longitude, point.coordinates.latitude]
                    },
                    properties: {
                        id: index,
                        country: point.country,
                        province: point.province,
                        cases: point.stats.confirmed,
                        deaths: point.stats.deaths
                    }
                }))
            );

    // const { data } = useSWR('https://corona.lmao.ninja/v2/jhucsse', fetcher);
    // console.log(data)


    // Initialize our map
    useEffect(() => {
        if (data) {
            const average = data.reduce((total, next) => total + next.properties.cases, 0) / data.length;
            const min = Math.min(...data.map((item) => item.properties.cases));
            const max = Math.max(...data.map((item) => item.properties.cases));





        }
    }, [data]);

    return (
        <div >

        </div>
    );
}

