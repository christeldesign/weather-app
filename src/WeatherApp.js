import React, { Component } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay.js';

class WeatherApp extends Component {
  constructor (props) {
    super(props);
    this.state = { value: 'none' };

    this.handleChange = this.handleChange.bind(this);
  }

  // Event handler to handle change on selected cities
  handleChange (event) {
    // Set chosen city in state
    this.setState({ value: event.target.value }, () => {
      // get weather info
      axios.get(`https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${this.state.value}')`)
           .then((response) => {
          // Information needed stored in response.data.query.results.channel.item.condition

          // Convert temperature to Celcius
          const tempInF = response.data.query.results.channel.item.condition.temp
          const tempInC = Math.round((tempInF - 32)/1.8)

          this.setState({
            temp: tempInC,
            weather: response.data.query.results.channel.item.condition.text
          })
        })
    });
  }

  render () {

    document.title = 'Weather App | Christel Chan';

    return (
      <div>
        <h1>Weather App</h1>
        <p>Select a city to view its current weather</p>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value='none'>Select a City</option>
          <option value='Vancouver, BC'>Vancouver, Canada</option>
          <option value='Hong Kong, HK'>Hong Kong, HK</option>
          <option value='Sydney, Australia'>Sydney, Australia</option>
          <option value='London, UK'>London, UK</option>
          <option value='New York, USA'>New York, USA</option>
        </select>

        {/* Only render component if a city was selected */}
        {this.state.value !== 'none' &&
          <WeatherDisplay
            city = {this.state.value}
            temp = {this.state.temp}
            weather = {this.state.weather}
          />
        }
      </div>
    );
  }
}

export default WeatherApp;
