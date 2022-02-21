import React from 'react';
import Axios from 'axios';
import './App.css';
import DisplayWeather from './components/DisplayWeather';
import Navbar from './components/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  // TODO - add api call to get some data that you can use for the static weather data section - will not be updated

  // Store the weather api in a variable, easier to update when needed
  apiKey = "API_KEY";

  // Dummy data to avoid API data requests limit
  // CAN BE REMOVED after static data requests is linked

  // locationA = JSON.parse(JSON.stringify({ "request": { "type": "City", "query": "Tokyo, Japan", "language": "en", "unit": "m" }, "location": { "name": "Tokyo", "country": "Japan", "region": "Tokyo", "lat": "35.690", "lon": "139.692", "timezone_id": "Asia\/Tokyo", "localtime": "2022-02-21 05:34", "localtime_epoch": 1645421640, "utc_offset": "9.0" }, "current": { "observation_time": "08:34 PM", "temperature": 2, "weather_code": 116, "weather_icons": ["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0004_black_low_cloud.png"], "weather_descriptions": ["Partly cloudy"], "wind_speed": 39, "wind_degree": 330, "wind_dir": "NNW", "pressure": 1011, "precip": 0, "humidity": 41, "cloudcover": 25, "feelslike": -5, "uv_index": 1, "visibility": 10, "is_day": "no" } }));
  // locationC = JSON.parse(JSON.stringify({ "request": { "type": "City", "query": "Paris, France", "language": "en", "unit": "m" }, "location": { "name": "Paris", "country": "France", "region": "Ile-de-France", "lat": "48.867", "lon": "2.333", "timezone_id": "Europe\/Paris", "localtime": "2022-02-20 21:35", "localtime_epoch": 1645392900, "utc_offset": "1.0" }, "current": { "observation_time": "08:35 PM", "temperature": 13, "weather_code": 122, "weather_icons": ["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0004_black_low_cloud.png"], "weather_descriptions": ["Overcast"], "wind_speed": 41, "wind_degree": 220, "wind_dir": "SW", "pressure": 1008, "precip": 0, "humidity": 67, "cloudcover": 100, "feelslike": 10, "uv_index": 1, "visibility": 10, "is_day": "no" } }));
  // locationB = JSON.parse(JSON.stringify({ "request": { "type": "City", "query": "Barcelona, Spain", "language": "en", "unit": "m" }, "location": { "name": "Barcelona", "country": "Spain", "region": "Catalonia", "lat": "41.383", "lon": "2.183", "timezone_id": "Europe\/Madrid", "localtime": "2022-02-20 21:36", "localtime_epoch": 1645392960, "utc_offset": "1.0" }, "current": { "observation_time": "08:36 PM", "temperature": 10, "weather_code": 113, "weather_icons": ["https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0008_clear_sky_night.png"], "weather_descriptions": ["Clear"], "wind_speed": 6, "wind_degree": 260, "wind_dir": "W", "pressure": 1025, "precip": 0, "humidity": 50, "cloudcover": 0, "feelslike": 8, "uv_index": 1, "visibility": 10, "is_day": "no" } }));

  //Global scope variables for static data
  locationA = {}
  locationB = {}
  locationC = {}

  //State
  state = {
    //Variables
    coords: {
      latitude: 44,
      longitude: 24
    },
    data: [],
    inputData: ''
  }

  componentDidMount() {
    this.setDefaultWeatherData();
  }

  //Track the input field
  change = (value) => {
    this.setState({ inputData: value })
  }
  //Update the weather depending upon the value user entered
  changeWeather = (event) => {
    event.preventDefault();

    // KNOW BUG HERE: the length of the input is always behind 1 character, although the input is properly populated
    // Make the call only if there are at least 3 characters - nice to have
    if (this.state?.inputData?.length > 3) {
      //Api call
      Axios.get(`http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${this.state.inputData}`).then(res => {
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

        // create copy of previous weather data state
        const updatedState = this.state.data;
        // delete first element from the state.data array
        updatedState.shift();
        // insert response at the beginning of the state.data array
        updatedState.unshift(weatherData);

        this.setState({ data: updatedState });
      })
    }


  }

  setDefaultWeatherData() {
    //get device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({ coords: newCoords });
        this.setStaticWeather();

        //Api call
        Axios.get(`http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res => {
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

          const update = [];

          update.push(weatherData, this.locationA, this.locationB, this.locationC);
          this.setState({ data: update });


        })
      })
    } else {
      console.log('Not supported')
    }
  }

  // Helper function to properly format the static data
  setStaticWeather() {
    // tokyo data
    let locationQueryA = "tokyo";
    Axios.get(`http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${locationQueryA}`).then(res => {
      //Check for "res"
      if (res?.data) {
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
        this.locationA = weatherData;

      } else {
        console.log(`No results for '${locationQueryA}'`);
      }
    });

    // barcelona data
    let locationQueryB = "barcelona";
    Axios.get(`http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${locationQueryB}`).then(res => {
      //Check for "res"
      if (res?.data) {
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
        this.locationB = weatherData;

      } else {
        console.log(`No results for '${locationQueryB}'`);
      }
    });

    // vienna data
    let locationQueryC = "vienna";
    Axios.get(`http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${locationQueryC}`).then(res => {
      //Check for "res"
      if (res?.data) {
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
        this.locationC = weatherData;

      } else {
        console.log(`No results for '${locationQueryC}'`);
      }
    });

    const update = [];
    update.push(this.locationA, this.locationB, this.locationC);
    this.setState({ data: update });

    // this.tokyo = {
    //   location: this.tokyo.location.name,
    //   temperature: this.tokyo.current.temperature,
    //   description: this.tokyo.current.weather_descriptions[0],
    //   region: this.tokyo.location.region,
    //   country: this.tokyo.location.country,
    //   wind_speed: this.tokyo.current.wind_speed,
    //   pressure: this.tokyo.current.pressure,
    //   precip: this.tokyo.current.precip,
    //   humidity: this.tokyo.current.humidity,
    //   img: this.tokyo.current.weather_icons
    // }

    // this.barcelona = {
    //   location: this.barcelona.location.name,
    //   temperature: this.barcelona.current.temperature,
    //   description: this.barcelona.current.weather_descriptions[0],
    //   region: this.barcelona.location.region,
    //   country: this.barcelona.location.country,
    //   wind_speed: this.barcelona.current.wind_speed,
    //   pressure: this.barcelona.current.pressure,
    //   precip: this.barcelona.current.precip,
    //   humidity: this.barcelona.current.humidity,
    //   img: this.barcelona.current.weather_icons
    // }

    // this.paris = {
    //   location: this.paris.location.name,
    //   temperature: this.paris.current.temperature,
    //   description: this.paris.current.weather_descriptions[0],
    //   region: this.paris.location.region,
    //   country: this.paris.location.country,
    //   wind_speed: this.paris.current.wind_speed,
    //   pressure: this.paris.current.pressure,
    //   precip: this.paris.current.precip,
    //   humidity: this.paris.current.humidity,
    //   img: this.paris.current.weather_icons
    // }
  }

  // Iterating over the arr weather obj from the state in order to create DisplayWeather components
  render() {
    let cards = [];
    this.state.data.map((item, index) => {
      cards.push(<DisplayWeather key={index} weatherData={item} />);
    })
    return (
      <div className="App">
        <div className='container'>
          <Navbar changeWeather={this.changeWeather} changeRegion={this.change} />
          {cards}
        </div>
      </div>
    );
  }

}

export default App;