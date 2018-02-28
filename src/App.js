import React, { Component } from 'react';
import './App.css';
import Autocomplete from './Components/Autocomplete';

class App extends Component {
    constructor() {
        super();
        this.state= {
          // Flag for async loading data
          isDataLoading: true
        }
    }
    render() {
      if(this.state.isDataLoading) {
        return false;
      } else {
        return (
         <div className="App">
             <Autocomplete
               title={'Wybierz kraj:'}
               placeholder={'Wpis nazwę lub kod ISO2'}
               allItems={this.allItems}
               startValue={''}
               searchFields={['code', 'name']}
             />
         </div>
       )
     }
    }

    /*
    Event on starting Component, fetching countries data from API.
    */
    componentDidMount() {
      const countriesURL = 'https://restcountries.eu/rest/v2/all';
      const countries = [];
      fetch(countriesURL)
        .then(response => response.json())
        .then(data => {
          countries.push(...data);
          const filteredData = data.map(country => {
            return {name: country.name, code: country.alpha2Code, value: `${country.name} (${country.alpha2Code})`};
          });
          this.allItems = filteredData;

          this.setState({isDataLoading: false})
        })
        .catch(error => {
            console.log('There has been a problem while fetching countries: ', error.message);
        });
    }
}

export default App;
