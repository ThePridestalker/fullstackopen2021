import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
    }

    axios
      .get('http://api.weatherstack.com/current', { params })
      .then((response) => {
        setWeather([response.data])
      })
  }, [country.capital])

  if (weather.length > 0) {
    const currentCapitalWeather = weather[0].current

    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((language) => {
            return <li key={language.iso639_1}>{language.name}</li>
          })}
        </ul>
        <img
          src={country.flag}
          alt="country flag"
          style={{ width: '100px', height: '100px' }}
        />
        <h2>Weather in {country.capital}</h2>
        <p>
          <b>temperature:</b> {currentCapitalWeather.temperature} °C
        </p>
        <img
          src={currentCapitalWeather.weather_icons[0]}
          alt="weather icon"></img>
        <p>
          <b>wind:</b> {currentCapitalWeather.wind_speed} mph direction{' '}
          {currentCapitalWeather.wind_dir}
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.iso639_1}>{language.name}</li>
        })}
      </ul>
      <img
        src={country.flag}
        alt="country flag"
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  )
}

export default Country
