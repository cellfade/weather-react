import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "../node_modules/@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ForecastCard from "./forecastCard";
import CurrentCard from "./currentCard";
import Button from "@material-ui/core/Button";
import Header from "./Layout/header";
import Footer from "./Layout/footer";
import "typeface-roboto";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  paperLg: {
    height: 280,
    width: 280
  },
  gridRow: {
    marginTop: 50
  },
  textmargin: {
   padding: 8
}
});

class Weather extends React.Component {
  static API_KEY = process.env.REACT_APP_openweather_api_key;

  constructor() {
    super();
    this.state = {
      currentWeather: {
        weather: {},
        currentData: {
          main: {}
        }
      },
      forecasts: [],
      latitude: "39.7392",
      longitude: "-104.9903",
      location: false,
      city: "",
      useCity: false,
      loaded: false
    };
    this.refreshForecast = this.refreshForecast.bind(this);
    this.refreshCurrentWeather = this.refreshCurrentWeather.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.setCity = this.setCity.bind(this);
    this.refreshCoords = this.refreshCoords.bind(this);
    this.fetchByCity = this.fetchByCity.bind(this);
  }

  componentDidMount() {
    this.refreshCoords();
  }

  refreshCoords() {
    this.setState({
      useCity: false
    });
    this.getCoords();
    this.refreshForecast();
    this.refreshCurrentWeather();
  }

  setCoordsFromLocalStorage(cachedLat, cachedLon) {
    this.setState({
      latitude: cachedLat,
      longitude: cachedLon
    });
  }

  getCoords() {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: true
          });
          this.refreshForecast();
          this.refreshCurrentWeather();
        },
        error => {
          this.setState({
            error: error.message
          });
        }
      );
    }
  }

  refreshForecast() {
    let url;
    if (this.state.useCity) {
      url =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        this.state.city +
        "&units=imperial" +
        "&appid=" +
        Weather.API_KEY;
    } else {
      url =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        this.state.latitude +
        "&lon=" +
        this.state.longitude +
        "&units=imperial" +
        "&appid=" +
        Weather.API_KEY;
    }
    fetch(url)
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
            icon: currentElementWeather.icon,
            temp: parseInt(element.main.temp, 10)
          };
          forecasts.push(dailyForecast);
        });
        this.setState({ forecasts: forecasts, loaded: true });
      });
  }

  setCity(evt) {
    this.setState({
      city: evt.target.value
    });
  }

  fetchByCity() {
    this.setState({
      useCity:true
    })
    this.refreshCurrentWeather();
    this.refreshForecast();
  }

  refreshCurrentWeather() {
    let url;
    if (this.state.useCity) {
      url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.state.city +
        "&units=imperial" +
        "&appid=" +
        Weather.API_KEY;
    } else {
      url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        this.state.latitude +
        "&lon=" +
        this.state.longitude +
        "&units=imperial" +
        "&appid=" +
        Weather.API_KEY;
    }
    fetch(url)
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
          currentWeather: current,
          loaded: true
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Grid container spacing={16} className={this.props.classes.root}>
          <Grid container justify="center">
            <Typography className={this.props.classes.textmargin}>
            {" "}
            {this.state.location
              ? ""
              : "Wait for load, allow the browser to share your location or search by city."}{" "}
          </Typography>
          </Grid>
          <Grid item xs={12} className={this.props.classes.gridRow}>
            <Grid container justify="center">
              <Typography variant="display2" align="center">
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
                city={this.state.currentWeather.currentData.name}
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
                    temp={value.temp}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid><Grid container justify="center">
              <Typography variant="subheading" align="center">
                Forecast for 6:00 AM MST / 12:00 GMT
              </Typography>
            </Grid>
          <Grid item xs={12}>
            <Grid container justify="center"
              className={this.props.classes.gridRow}
            >
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                onClick={this.refreshCoords}
              >
                Refresh my Location
              </Button>
            </Grid>
            <Grid container justify="center">
              <Typography variant="subheading" align="center">
                or search by city below!
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={this.props.classes.gridRow}>
            <Grid container justify="center">
              <TextField
                label="City"
                value={this.state.city}
                onChange={evt => this.setCity(evt)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="secondary"
                className={this.props.classes.button}
                onClick={this.fetchByCity}
              >
                Search by City
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={this.props.classes.gridRow}>
          <Footer />
        </Grid>
      </React.Fragment>
    );
  }
}

Weather.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Weather);
