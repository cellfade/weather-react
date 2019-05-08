import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField } from '../node_modules/@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ForecastCard from './forecastCard';
import Button from '@material-ui/core/Button';
import Header from './Layout/header';
import 

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
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
            forecasts: [],
            zipCode: '80223'
        };
        this.refreshForecast = this.refreshForecast.bind(this);
    }

    componentDidMount() {
        this.refreshForecast();
    }

    refreshForecast() {
        fetch('https://api.openweathermap.org/data/2.5/forecast?zip=' + this.state.zipCode + '&appid=' + Weather.API_KEY)
            .then(results => {
                return results.json();
            })
            .then(data => { 
                let truncatedData = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
                let forecasts = [];

                truncatedData.forEach((element, index) => {
                    let day = (new Date(element.dt_txt)).getDay();
                    let currentElementWeather = element.weather[0];
                    let dailyForecast = {'key': index, 'day': day, 'weather': currentElementWeather.main, 'icon': currentElementWeather.icon}
                    forecasts.push(dailyForecast);
                });
                this.setState({forecasts: forecasts});
            })
    }

    updateZipCode(evt) {
        this.setState({
            zipCode: evt.target.value
        });
    }

    render() {
      return (
        <React.Fragment>
            <Header>
            </Header>
        <Typography variant="display4" align="center">
            Forecast
        </Typography>
            
        <Grid container spacing={16} className={this.props.classes.root}>
            <Grid item xs={12} className={this.props.classes.gridRow}>
                <Grid container justify="center">
                    <TextField
                        label="Zip Code"
                        value={this.state.zipCode}
                        onChange={evt => this.updateZipCode(evt)}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.refreshForecast}>
                        Refresh
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} className={this.props.classes.gridRow}>
                <Grid container justify="center" spacing={16}>
                    {this.state.forecasts.map(value => (
                    <Grid key={value.key} item>
                        <ForecastCard day={value.day} weather={value.weather} value={value.key} icon={value.icon} />
                    </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>

        </React.Fragment>
      );
    }
}

Weather.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Weather);