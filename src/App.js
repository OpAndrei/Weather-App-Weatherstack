import React from 'react';
import Axios from 'axios';
import './App.css';
import DisplayWeather from './components/DisplayWeather';
import Navbar from './components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  //State
  state = {
    //Variables
    coords: {
      latitude: 44,
      longitude: 24
    },
    data: {},
    inputData: ''
  }

  componentDidMount() {
    //get device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({ coords: newCoords });

        //Api call
        Axios.get(`http://api.weatherstack.com/current?access_key=d5ad81fcad013917b88e00a0eda9a0f8&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res => {
          let weatherData = {
            location: res.data.location.name,
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }

          this.setState({ data: weatherData });

        })
      })
    } else {
      console.log('Not supported')
    }
  }

  //Track the input field
  change = (value) => {
    this.setState({ inputData: value })
  }

  changeWeather = (event) => {
    event.preventDefault();

    //Api call
    Axios.get(`http://api.weatherstack.com/current?access_key=d5ad81fcad013917b88e00a0eda9a0f8&query=${this.state.inputData}`).then(res => {
      let weatherData = {
        location: res.data.location.name,
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }

      this.setState({ data: weatherData });
    })
  }


  render() {
    return (
      <div className="App">
        <div className='container'>
          <Navbar changeWeather={this.changeWeather} changeRegion={this.change} />
          <DisplayWeather weatherData={this.state.data} />
        </div>
      </div>
    );
  }

}

export default App;