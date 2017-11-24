import React, { Component } from 'react';

class WeatherDisplay extends Component {

  render () {

    var weather = this.props.weather;
    return (
      <div className = 'weather-display'>
        <h2>{this.props.city}</h2>
        <h3 className = 'temp'>{this.props.temp}<sup>&deg;C</sup></h3>
        <img src={this.props.icon} alt={this.props.weather} className='weather-icon'/>
        <h3 className = 'weather'>{this.props.weather}</h3>
      </div>

    );
  }
}

export default WeatherDisplay;
