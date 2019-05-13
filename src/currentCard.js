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
  paperLg: {
    width: 280
  },
  title: {
    paddingBottom: 0,
    paddingTop: 8
  },
  currentImage: {
    padding: 0
  }
});

class CurrentCard extends React.Component {

  retrieveIconURL(icon) {
    return "http://openweathermap.org/img/w/" + icon + ".png";
  }

  formatTemp(temp)
  {
    return parseInt(temp, 10);
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paperLg}>
          <Grid container className={this.props.classes.root}>
             
          <Grid item xs={12}>
              <Typography variant="title" align="center">
                 {this.props.weather}
              </Typography>
            </Grid>
              
            <Grid item xs={12} className={this.props.classes.currentImage}>
              <Grid container justify="center">
              <img
                  src={this.retrieveIconURL(this.props.icon)}
                  alt={this.props.icon}
                  height="100"
                  width="100"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="title" align="center">
               {this.formatTemp(this.props.temp)} &deg; F
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

CurrentCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CurrentCard);
