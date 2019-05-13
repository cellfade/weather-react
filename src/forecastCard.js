import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import 'typeface-roboto';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: 100
  },
  dayHeading: {
    paddingBottom: 0,
    paddingTop: 8
  },
  forecastImage: {
    padding: 0
  }
});

class ForecastCard extends React.Component {
  retrieveDayName(dayNumber) {
    let dayArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return dayArray[dayNumber];
  }

  retrieveIconURL(icon) {
    return "http://openweathermap.org/img/w/" + icon + ".png";
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <Grid container className={this.props.classes.root}>
            <Grid item xs={12} className={this.props.classes.dayHeading}>
              <Typography variant="subheading" align="center">
                {this.retrieveDayName(this.props.day)}
              </Typography>
            </Grid>
            <Grid item xs={12} className={this.props.classes.forecastImage}>
              <Grid container justify="center">
                <img
                  src={this.retrieveIconURL(this.props.icon)}
                  alt={this.props.weather}
                  height="100"
                  width="100"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subheading" align="center">
                {this.props.weather}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subheading" align="center">
               {this.props.temp} &deg; F
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

ForecastCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForecastCard);
