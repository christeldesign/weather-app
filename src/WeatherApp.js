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
    this.handleWeatherData = this.handleWeatherData.bind(this);
  }

  // Event handler to handle change on selected city
  handleChange (event) {
    // Set chosen city in state
    this.setState({ value: event.target.value }, () => {
      // get weather info
      axios.get(`https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${this.state.value}')`)
           .then((response) => this.handleWeatherData(response))
    });
  }

  // Helper function to handle response data
  handleWeatherData (response) {
    // Information needed stored in response.data.query.results.channel.item.condition
    const weatherInfo = response.data.query.results.channel.item.condition;

    // Convert temperature to Celcius
    const tempInC = Math.round((weatherInfo.temp - 32) / 1.8);

    // if function for rendering icons
    const weatherText = weatherInfo.text;

    if (weatherText.includes('Sunny') || weatherText.includes('Clear')) {
      var icon = sunnyIcon
    } else if (weatherText.includes('Showers') || weatherText.includes('Rain') || weatherText.includes('Storm')) {
      var icon = rainyIcon
    } else if (weatherText.includes('Cloud')) {
      var icon = cloudyIcon
    } else if (weatherText.includes('Breezy') || weatherText.includes('Wind')) {
      var icon = windyIcon
    } else {
      // Catchall is cloudy
      var icon = cloudyIcon
    }

    this.setState({
      temp: tempInC,
      weather: weatherText,
      icon: icon
    })
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
          <option value='Toronto'>Toronto, Canada</option>
          <option value='Paris'>Paris, France</option>
          <option value='Sydney'>Sydney, Australia</option>
          <option value='Dubai'>Dubai, UAE</option>
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
