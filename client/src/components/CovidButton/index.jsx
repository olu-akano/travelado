import React from 'react';
import Button from '@mui/material/Button';
import './style.css';

export const CovidButton = () => {
    return (
        <div>
            <Button action="/covidpage" value="See latest COVID-19 spread!"/>

            {/* <form action="/covidpage">
                <input className="CovidButton" type="submit" value="See latest COVID-19 spread!" />
            </form> */}

        </div>
    )
}
