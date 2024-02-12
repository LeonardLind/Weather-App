import React, { useState } from 'react'
import './WeatherApp.css'
import {clear, cloud, drizzle, humidity, rain, Search, snow, wind} from '../Assets/index'

const WeatherApp = () => {

    let api_key ="e901696f768a928a2c10fbdb4da01751";

    const [wicon,setWicon] = useState(cloud);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        const cityName = element[0].value.trim(); 
        if (cityName === "") {
            alert("Please enter a city before searching.");
            return; // 
        }

        const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;

        try {
            let response = await fetch(url1);
            let data = await response.json();

            if (data.cod !== 200) {
                alert("City not found. Please enter a valid city.");
                return; 
            }

    
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching weather data. Please try again later.");
        }
    
        if(element[0].value==="")
        {
            alert("Please enter a city before searching.");
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-rate")
        const temprature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp)+"°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear);
        }
        else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(cloud);
        }
        else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(drizzle);
        }
        else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
        {
            setWicon(drizzle);
        }
        else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setWicon(rain);
        }
        else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(rain);
        }
        else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(snow);
        }
        else 
        {
            setWicon(clear)
        }
    }


  return (
    <div className='container'>
        <div className="top-bar">
        <input type='text' className='cityInput' placeholder='Search'/>
        <div className='search-icon' onClick={()=>{search()}}>
            <img src={Search} alt="Search" />
        </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="cloud" />
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity} alt="humidity" className='icon' />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} alt="wind" className='icon' />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default WeatherApp