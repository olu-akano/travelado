import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function CountrySelect({ covidDataCountries }) {
    
  const [currentSelectedCountry, setCurrentSelectedCountry] = React.useState("");
  const displayCountryDetails = () => {
    return (
        <>
            <div>
                Cases: {currentSelectedCountry.properties.cases}
            </div>
            <div>
                Deaths: {currentSelectedCountry.properties.deaths}
            </div>
            <div>
                Population: {currentSelectedCountry.properties.population}
            </div>
        </>
    )
  }
  return (
    <>
        <Autocomplete
        id="country-select-demo"
        sx={{ width: 300, backgroundColor: 'white' }}
        options={covidDataCountries}
        autoHighlight
        size="small"
        onChange={(event, newValue) => {
            setCurrentSelectedCountry(newValue);
        }}
        getOptionLabel={(option) => option.properties.country}
        renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
                loading="lazy"
                width="20"
                src={option.properties.flag}
                alt=""
            />
            {option.properties.country}
            </Box>
        )}
        renderInput={(params) => (
            <TextField
            {...params}
            label="Choose a country"
            inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            />
        )}
        />
        {currentSelectedCountry && (displayCountryDetails())}

    </>
  );
}