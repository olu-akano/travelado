import React from 'react'
import './style.css'

export const HomePageButton = () => {
    return (
        <div>

            <form action="/home">
                <input className="HomePageButton" type="submit" value="Homepage" />
            </form>

        </div>
    )
}
