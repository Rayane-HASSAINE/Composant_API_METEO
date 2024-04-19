import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

export const WeatherApp = () => {
    const [api_key] = useState("2dc5b68fd4a872802d1cd22084445504");
    const [wicon, setWicon] = useState(cloud_icon);
    const [location, setLocation] = useState("London"); // état pour la localisation

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === "") {
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temprature =document.getElementsByClassName("weather-temp");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        setLocation(data.name); // Mise à jour de la localisation
    }

    return (
        
        <div className="container">
            <span style ={{color: "white"}}>API Météo par Rayane HASSAINE</span>

            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            
            <div className="weather_image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°</div>
            <div className="weather-location">{location}</div> {/* Utilisation de l'état de localisation */}
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className='data'>
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className='data'>
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}