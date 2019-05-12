import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField } from '../node_modules/@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ForecastCard from './forecastCard';
import CurrentCard from './forecastCard';
import Button from '@material-ui/core/Button';
import Header from './Layout/header';
import Footer from './Layout/footer';
import 'typeface-roboto';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  paperLg: {
    height: 140,
    width: 300
  },
  gridRow: {
    marginTop: 50
  }
});

class Weather extends React.Component {
    static API_KEY = 'cf3201d74c517875eb07870d9a089a50';

    constructor() {
        super();
        this.state = {
            currentWeather: {
              weather: {},
              currentData:{
                main:{
                }
              }
            },
            forecasts: [],
            latitude:"39.7392",
            longitude:"-104.9903"
        };
        this.refreshForecast = this.refreshForecast.bind(this);
        this.refreshCurrentWeather = this.refreshCurrentWeather.bind(this);
    }

    componentDidMount() {
      this.refreshCoords();
      this.refreshForecast();
      this.refreshCurrentWeather();
    }
  
   refreshCoords() {
      let cachedLat = localStorage.getItem('latitude');
      let cachedLon = localStorage.getItem('longitude');
      
      cachedLat ? 
       this.setCoordsFromLocalStorage(cachedLat, cachedLon) :
       this.getCoords();
  }
  
  setCoordsFromLocalStorage(cachedLat, cachedLon) {
    this.setState({
     latitude: cachedLat,
     longitude: cachedLon
    });
  }
  
  getCoords() {
    if (window.navigator.geolocation) { 
     navigator.geolocation.getCurrentPosition((position) => {
       console.log(position.coords.latitude);
       console.log(position.coords.latitude);
      localStorage.setItem('latitude', position.coords.latitude);
      localStorage.setItem('longitude', position.coords.longitude);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
       });
    }, (error) => {
     this.setState({
      error: error.message,
     });
    });
    } 
   }

  refreshForecast() {
    fetch( "https://api.openweathermap.org/data/2.5/forecast?lat="+this.state.latitude+"&lon="+this.state.longitude+
    "&units=imperial" +  
    "&appid=" +
    Weather.API_KEY )         
      .then(results => {
        return results.json();
      })
      .then(data => {
        let truncatedData = data.list.filter(entry =>
          entry.dt_txt.includes("12:00:00")
        );
        let forecasts = [];

        truncatedData.forEach((element, index) => {
          let day = new Date(element.dt_txt).getDay();
          let currentElementWeather = element.weather[0];
          let dailyForecast = {
            key: index,
            day: day,
            weather: currentElementWeather.main,
            icon: currentElementWeather.icon
          };
          forecasts.push(dailyForecast);
        });
        this.setState({ forecasts: forecasts });
      });
  }

  refreshCurrentWeather() {
    // fetch( "https://api.openweathermap.org/data/2.5/forecast?zip=" 
    // + this.state.zipCode +
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+this.state.latitude+"&lon="+this.state.longitude+
    "&units=imperial" +  
    "&appid=" +
    Weather.API_KEY)     
      .then(results => {
        return results.json();
      })
      .then(data => {
        let weather = data.weather[0];
        let current = {
          weather: weather,
          currentData: data
        };
        this.setState({ 
            currentWeather: current
         });
      });
  }

  updateZipCode(evt) {
    this.setState({
      zipCode: evt.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
      <Header></Header>
      
       
      <Grid container spacing={16} className={this.props.classes.root} >
        <Grid item xs={12} className={this.props.classes.gridRow}>
            <Grid container justify="center">
            <Typography variant="display1" align="center">
          Current conditions
          </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} className={this.props.classes.gridRow}>
            <Grid container justify="center" spacing={16}>
                  <CurrentCard
                     temp={this.state.currentWeather.currentData.main.temp}
                     weather={this.state.currentWeather.weather.main}
                     icon={this.state.currentWeather.weather.icon}

                  />
                </Grid>
          </Grid>

          <Grid item xs={12} className={this.props.classes.gridRow}>
            <Grid container justify="center">
            <Typography variant="display1" align="center">
          5 Day Forecast
          </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} className={this.props.classes.gridRow}>
            <Grid container justify="center" spacing={16}>
              {this.state.forecasts.map(value => (
                <Grid key={value.key} item>
                  <ForecastCard
                    day={value.day}
                    weather={value.weather}
                    value={value.key}
                    icon={value.icon}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} className={this.props.classes.gridRow}>
            <Grid container justify="center">
              <TextField
                label="City"
                value={this.state.zipCode}
                onChange={evt => this.updateZipCode(evt)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                onClick={this.refreshForecast}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={this.props.classes.gridRow}>
        <Footer></Footer>
        </Grid>
      </React.Fragment>
    );
  }
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Weather);
