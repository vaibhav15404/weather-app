"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import styles from "./data.module.css";
import axios from "axios";

const page = () => {
  const params = useSearchParams();
  const [weatherData, setWeatherData] = useState("");
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const city = params.get("city");
        if (city) {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?q=${city}&key=e7ee2bf62ef94f3aaf4185938241104`
          );
          setWeatherData(response.data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [params]);
  const cou =
    weatherData && weatherData.location && weatherData.location.country;
  console.log(cou);

  // format date

  const timestamp =
    weatherData && weatherData.location && weatherData.location.localtime;

  const formatDate = (timestamp) => {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Define arrays for day names and month names
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get day, date, month, and year from the Date object
    const dayName = dayNames[date.getDay()];
    const dateNum = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Get hours, minutes, and AM/PM from the Date object
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the formatted date string
    const formattedDate = `${dayName}, ${dateNum} ${monthName} ${year} | Local time: ${hours}:${minutes} ${ampm}`;

    return formattedDate;
  };

  const temperature_C =
    weatherData && weatherData.location && weatherData.current.temp_c;

  const temperature_F =
    weatherData && weatherData.location && weatherData.current.temp_f;

  const humidity =
    weatherData && weatherData.location && weatherData.current.humidity;

  const wind =
    weatherData && weatherData.location && weatherData.current.wind_kph;

  const real_feel =
    weatherData && weatherData.location && weatherData.current.feelslike_c;

  const text = 
  weatherData && weatherData.location && weatherData.current.condition && weatherData.current.condition.text; 
  
  const icon=weatherData && weatherData.location && weatherData.current.condition && weatherData.current.condition.icon;

  return (
    <div className={styles.main}>
      {/* <div className={styles.container}>
        <h1>City: {param.get("city")}</h1>
        <div className={styles.partition}>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
        </div>
      </div> */}
      <div className={styles.widget}>
        <div className={styles.left}>
          <div className={styles.widget__date}>
            {/* Friday, 12 May 2023 | Local time: 11:44 AM */}
            {formatDate(timestamp)}
          </div>
          <div className={styles.widget__location}>
            {params.get("city").toUpperCase()}, {cou.toUpperCase()}{" "}
          </div>
          <div className={styles.widget__conditions}>
            <div className={styles.widget__temperature}>
              {temperature_C}° C | {temperature_F}° F
            </div>
            <div className={styles.widget__real}>Real feel: {real_feel}° C</div>
            <div className={styles.widget__humidity}>Humidity: {humidity}%</div>
            <div className={styles.widget__wind}>Wind: {wind}km/h</div>
          </div>
        </div>

        <div className={styles.image}>
            
            <div className={styles.photo}><img src={icon} alt="" /></div>
            <h1 className={styles.text}>{text}</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
