import Country from './Country'

const Content = ({ filtering, countries, setCountries }) => {
  if (!filtering) {
    return (
      <div>
        {countries.map((country) => {
          return <div key={country.numericCode}>{country.name}</div>
        })}
      </div>
    )
  } else if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length < 10 && countries.length > 2) {
    return (
      <div>
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
        <p>No such country</p>
      </div>
    )
  } else {
    return <Country country={countries[0]} />
  }
}

export default Content
