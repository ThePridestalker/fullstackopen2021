import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

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

  return (
    <div>
      <Filter handleOnChange={handleOnChange} />
      <Content
        filtering={filtering}
        countries={countries}
        setCountries={setCountries}
      />
    </div>
  )
}

export default App
