import React from 'react';
import Skycons from 'react-skycons'
var skycons = new Skycons({ "color": "blue" });

const RenderIcons = ({ icon }) => {
    if (!icon) {
        return (<h2>Loading...</h2>);
    }

    if(icon === 'wind') {
        skycons.set("wind", Skycons.WIND);
        skycons.play();
    } else if(icon === 'clear-day') {
        skycons.set("clear-day", Skycons.CLEAR_DAY);
        skycons.play();
    } else if(icon === 'partly-cloudy-day') {
        skycons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
        skycons.play();
    } else if(icon === 'partly-cloudy-night') {
        skycons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
        skycons.play();
    } else if(icon === 'clear-night') {
        skycons.set("clear-night", Skycons.CLEAR_NIGHT);
        skycons.play();
    } else if(icon === 'cloudy') {
        skycons.set("cloudy", Skycons.CLOUDY);
        skycons.play();
    } else if(icon === 'rain') {
        skycons.set("rain", Skycons.RAIN);
        skycons.play();
    } else if(icon === 'sleet') {
        skycons.set("sleet", Skycons.SLEET);
        skycons.play();
    } else if(icon === 'snow') {
        skycons.set("snow", Skycons.SNOW);
        skycons.play();
    } else if(icon === 'fog') {
        skycons.set("fog", Skycons.FOG);
        skycons.play();
    } else {
        console.log('error!');
    } 

    return (<canvas id={`${icon}`} width="64" height="64"></canvas>);
};

export default RenderIcons;



/* import React from "react";
const Skycons = require("skycons")(window);

class App extands React.Component {
    constructor(props) {
      super(props);
      this.iconRefs = [];
    } 

    render() {
      const { dailyWeather } = this.state;
      dailyWeather.data.map( (d,k) => {
        if (!(k in iconRefs) {
          iconRefs[k]= {};
        } 
      }); 

      const data = dailyWeather.data.map((data, key) => {
        return (
          <div className="panel" key={`arr${key}`}>
            <div className="data-block" >
              <div className="weather-icon" >
                 <canvas ref={iconRefs[key]} width="64" height="64"></canvas>
              </div >
            </div>
          </div>
        );
      });

      return (
         <div className="panel-block">
           {data}
         </div>
      );
    }

    componentDidUpdate() {
      dailyWeather.data.map((data, key) => {
        renderIcons(data, key);
       });
    }

    renderIcons = (icon, key) => {
      if (!icon) {
        return (<h2>Loading...</h2>);
      }

      if(icon === 'wind') {
        skycons.set(this.iconRefs[key], Skycons.WIND);
        skycons.play();
      */