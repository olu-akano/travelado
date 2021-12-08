import React, { useEffect } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'

// CORS issues, need to fix

export const WebScraper = () => {


    useEffect(() => {
        axios(url)
            .then(res => {
                const page = res.data
                const $ = cheerio.load(page)
                const countries = []
                $('td:even', page).each(function () {
                    country = $(this).text()
                    countries.push(country)
                })
                console.log(countries)
                //Do something else with the array here
            })
            .catch(err => console.log(err))

    }, [])


    return (
        <div>
            <h1>corona testing</h1>
        </div>
    )
}