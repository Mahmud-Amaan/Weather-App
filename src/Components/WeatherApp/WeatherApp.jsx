import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const api_key = "1c4d9824ec36ffbde017561605fa2adb";

  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;

    const response = await fetch(url);

    const data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h ";
    temprature[0].innerHTML = data.main.temp + " °C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWeatherIcon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWeatherIcon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWeatherIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWeatherIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWeatherIcon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWeatherIcon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWeatherIcon(snow_icon);
    } else {
      setWeatherIcon(clear_icon);
    }
  };

  return (
    <div className=" shadow-lg w-[800px] h-[1000px] m-auto mt-[200px] rounded-2xl bg-gradient-to-b from-indigo-500 to-purple-500">
      <div className="flex justify-center gap-3 p-[60px] items-center">
        <input
          type="text"
          className=" shadow-lg cityInput flex w-[550px] h-[90px] outline-none rounded-2xl rounded-r-lg pl-[40px] text-[30px] font-medium"
          placeholder="Search"
        />
        <div
          onClick={() => {
            search();
          }}
          className=" shadow-lg flex justify-center items-center w-[80px] h-[80px] bg-white rounded-2xl rounded-l-lg cursor-pointer hover:scale-[107%] transition duration-100"
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className=" mt-[40px]">
        <img
          src={weatherIcon}
          alt=""
          className="flex justify-center items-center align-middle ml-[300px]"
        />
      </div>
      <div className=" weather-temp flex justify-center text-white text-[120px] font-[500]">
        24°C
      </div>
      <div className=" weather-location flex justify-center text-white text-[100px] font-[700]">
        London
      </div>
      <div className=" mt-[60px] text-white flex justify-center">
        <div className="flex items-start gap-[12px] m-auto">
          <img src={humidity_icon} alt="" className=" mt-[20px]" />

          <div className=" text-[36px] font-[500]">
            <div className="humidity-percent">64%</div>
            <div className=" text-[20px] font-500">Humidiy</div>
          </div>
          <div className="ml-[300px] flex items-start gap-[12px]">
            <img src={wind_icon} alt="" className=" mt-[20px]" />
            <div className=" text-[36px] font-[500]">
              <div className="wind-rate">18 km/h</div>
              <div className=" text-[20px] font-500">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
