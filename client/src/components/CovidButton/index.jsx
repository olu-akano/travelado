import React from 'react'
import './style.css'

export const CovidButton = () => {
    return (
        <div>

            <form action="/covidpage">
                <input className="CovidButton" type="submit" value="Latest COVID-19 spread!" />
            </form>

        </div>
    )
}
