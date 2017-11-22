import React, { Component } from 'react';

class WeatherDisplay extends Component {

  render() {
    return (
      <div className = 'weather-display'>
        <h2>{this.props.city}</h2>
        <h3 className = 'temp'>{this.props.temp}&deg;C</h3>
        <h3 className = 'weather'>{this.props.weather}</h3>
      </div>

    );
  }
}

export default WeatherDisplay;
