import React, { Component } from 'react';
import axios from 'axios';

class WeatherDisplay extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className = 'weather-display'>
        <h2>Weather for {this.props.city}</h2>
        <h3>{this.props.temp}</h3>
        <h3>{this.props.weather}</h3>
      </div>

    );
  }
}

export default WeatherDisplay;
