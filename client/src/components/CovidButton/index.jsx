import React from 'react'
import './style.css'

export const CovidButton = () => {
    return (
        <div>

            <form action="/covidpage">
                <input className="CovidButton" type="submit" value="See latest COVID-19 spread!" />
            </form>

        </div>
    )
}
