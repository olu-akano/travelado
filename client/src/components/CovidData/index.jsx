import React, { useRef, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, Layer, Source } from 'react-map-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';


export const CovidData = ({ setCovidDataCountries }) => {
    const fetcher = (url) =>
        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                return data.map((point, index) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [Number(point.countryInfo.long), Number(point.countryInfo.lat)]
                    },
                    properties: {
                        id: index, 
                        country: point.country,
                        cases: point.cases,
                        deaths: point.deaths,
                        population: point.population,
                        flag: point.countryInfo.flag
                    }
                }))
            });


    const { data, error } = useSWR('https://disease.sh/v3/covid-19/countries', fetcher);

    if (!data) return <div>loading...</div>
    setCovidDataCountries(data)
    const average = data.reduce((total, next) => total + Number(next.properties.cases), 0) / data.length;
    const min = Math.min(...data.map((item) => Number(item.properties.cases)));
    const max = Math.max(...data.map((item) => Number(item.properties.cases)));

    const layerStyle = {
        id: 'circles',
        source: 'points', 
        type: 'circle',

        paint: {
            'circle-opacity': 0.75,
            'circle-stroke-width': 1,
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["get", "cases"],
                1,
                min,
                1000,
                8,
                average / 4,
                10,
                average / 2,
                14,
                average,
                18,
                max,
                50
            ],
            "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "cases"],
                min,
                "#ffffb2",
                max / 32,
                "#fed976",
                max / 16,
                "#feb24c",
                max / 8,
                "#fd8d3c",
                max / 4,
                "#fc4e2a",
                max / 2,
                "#e31a1c",
                max,
                "#b10026"
            ],
            "circle-stroke-width": [
                "interpolate",
                ["linear"],
                ["get", "cases"],
                1,
                1,
                max,
                1.75
            ],
        }
    };
    return (
        <>
            <Source id="my-data" type="geojson" data={{ type: 'FeatureCollection', features: data }}>
                <Layer
                    {...layerStyle}
                />

            </Source>
        </>
    );
}