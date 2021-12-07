import React, { useEffect } from 'react'
import axios from 'axios'
import cheerio from 'cheerio'

export const WebScraper = () => {



    // const url = 'https://www.gov.uk/guidance/red-list-of-countries-and-territories';

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
