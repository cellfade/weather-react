import React from 'react';
import Skycons from 'react-skycons'

const RenderIcons = ({ icon }) => {
    if (!icon) {
        return (<p>Loading...</p>);
    }
    let type = "";
    if(icon === 'wind') {
      type = "WIND";
    } else if(icon === '01d') {
      type = "CLEAR_DAY"
    } else if(icon === '02d' || icon==='04d') {
      type = "PARTLY_CLOUDY_DAY"
    } else if(icon === '02n' || icon==='04n') {
      type = "PARTLY_CLOUDY_NIGHT"
    } else if(icon === '01n') {
      type = "CLEAR_NIGHT"
    } else if(icon === '03d' || icon=== '03n') {
      type = "CLOUDY"
    } else if(icon === '10d' || icon=== '10n' || icon==='09d' || icon==='09n') {
      type = "RAINY"
    } else if(icon === 'sleet') {
      type = "SLEET"
    } else if(icon === '13d' || icon=== '13n') {
      type = "SNOW"
    } else if(icon === '50d' || icon=== '50n') {
      type = "FOG"
    } else {
        console.log('error!');
        return (<p>error</p>);
    } 

    return(
    <Skycons 
        color='lightblue' 
        icon={type} 
        autoplay={true}
      />);
};

export default RenderIcons;
