import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToCompare, setCountriesToCompare] = useState([])
  const [filtering, setFiltering] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
      setCountriesToCompare(response.data)
    })
  }, [])

  const handleOnChange = (event) => {
    // regex case insensitive
    const regex = new RegExp(event.target.value, 'i')
    const filteredCountries = countriesToCompare.filter((country) => {
      return country.name.match(regex)
    })
    filteredCountries.length < 250 ? setFiltering(true) : setFiltering(false)
    setCountries(filteredCountries)
  }

  if (!filtering) {
    return (
      <div>
        find countries <input onChange={handleOnChange} />
        {countries.map((country) => {
          return <div key={country.numericCode}>{country.name}</div>
        })}
      </div>
    )
  } else if (countries.length > 10) {
    return (
      <div>
        find countries <input onChange={handleOnChange} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length < 10 && countries.length > 2) {
    return (
      <div>
        find countries <input onChange={handleOnChange} />
        {countries.map((country) => {
          return (
            <div key={country.numericCode}>
              {country.name}
              <button onClick={() => setCountries([country])}>show</button>
            </div>
          )
        })}
      </div>
    )
  } else if (countries.length === 0) {
    return (
      <div>
        find countries <input onChange={handleOnChange} />
        <p>No such country</p>
      </div>
    )
  } else {
    return (
      <div>
        find countries <input onChange={handleOnChange} />
        <h1>{countries[0].name}</h1>
        <p>capital {countries[0].capital}</p>
        <p>population {countries[0].population}</p>
        <h2>languages</h2>
        <ul>
          {countries[0].languages.map((language) => {
            return <li key={language.iso639_1}>{language.name}</li>
          })}
        </ul>
        <img
          src={countries[0].flag}
          alt="country flag"
          style={{ width: '100px', height: '100px' }}
        />
      </div>
    )
  }
}

export default App
