import React, { Component } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay.js';
import sunnyIcon from './assets/sunny-icon.svg';
import rainyIcon from './assets/rain-icon.svg';
import cloudyIcon from './assets/cloud-icon.svg';
import windyIcon from './assets/windy-icon.svg';

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

          // if function for rendering icons
          const weather = response.data.query.results.channel.item.condition.text;

          if (weather.includes('Sunny')) {
            var icon = sunnyIcon
          } else if (weather.includes('Showers')) {
            var icon = rainyIcon
          } else if (weather.includes('Cloudy')) {
            var icon = cloudyIcon
          } else if (weather.includes('Breezy')) {
            var icon = windyIcon
          } else {
            var icon = cloudyIcon
          }

          this.setState({
            temp: tempInC,
            weather: weather,
            icon: icon
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
          <option value='Vancouver'>Vancouver, Canada</option>
          <option value='Paris'>Paris, France</option>
          <option value='Sydney'>Sydney, Australia</option>
          <option value='London'>London, UK</option>
          <option value='New York'>New York, USA</option>
        </select>

        {/* Only render component if a city was selected */}
        {this.state.value !== 'none' &&
          <WeatherDisplay
            city = {this.state.value}
            temp = {this.state.temp}
            weather = {this.state.weather}
            icon = {this.state.icon}
          />
        }
      </div>
    );
  }
}

export default WeatherApp;
