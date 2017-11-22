import React, { Component } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay.js';

class WeatherApp extends Component {
  constructor(props){
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  // Event handler to handle change on selected cities
  handleChange(event) {
      // Set chosen city in state
      this.setState({ value: event.target.value}, () => {
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

  render() {

    return (
      <div>
        <h1>Weather App</h1>
        <select value={this.state.value} onChange={this.handleChange}>
          <option>Select a City</option>
          <option value='Vancouver, BC'>Vancouver, Canada</option>
          <option value='Hong Kong, HK'>Hong Kong, China</option>
          <option value='Sydney'>Sydney</option>
          <option value='London'>London</option>
          <option value='New York'>New York</option>
        </select>

        {/* Only render component if a city was selected */}
        {this.state.value != '' &&
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
