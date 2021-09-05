
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

function App() {

  const [countries, setCountries] = useState([])
  const [searchCondition, setNewSearchCondition] = useState('')
  

  //getting data using a REST api
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
     .then(response => {
      setCountries(response.data)
     })
      
  }, [])

  const filterCountries = countries.filter(country => country.name.includes(searchCondition))

  const handleNewCondition = (event) => {
    console.log(countries)
    console.log(event.target.value)
    setNewSearchCondition(event.target.value)
}
  const showCountries = () => {
  if (filterCountries.length === 1) {
    return (
      <div>
        <h2>{filterCountries[0].name}</h2>
        <p>Capital: {filterCountries[0].capital}</p> 
        Population: {filterCountries[0].population}
        <h3> Languages </h3>
        {filterCountries.map(country =>
          <ul>
            {country.languages.map(language => 
              <li>
                {language.name}
              </li>)}
          </ul>
         )}
      <img src={filterCountries[0].flag} alt='flag' width='500' height='300'></img>
      </div>      
    )
  }
  if (filterCountries.length <= 10) {
    return (
      filterCountries.map(country => 
        <Country key={country.id} country={country} />
        )
    )
  } else return (
    <h3> Too many results, try another filter! </h3>
  )
  
}


  return (
    <div>
      <h1>Search for countries</h1>
      <form>
        search a country: <input 
        value={searchCondition}
        onChange={handleNewCondition}
        />
      </form>
      <h2>Results of search will be only showed with less than 10 matches</h2>
        <div>
          <ul>
            {showCountries()}
          </ul>
        </div>
    </div>

  )
}

export default App;
