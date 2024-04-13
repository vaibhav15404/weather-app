"use client";
import styles from "./page.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

const Home=()=> {
  const router = useRouter()
 

  const [city, setcity] = useState("");
  const input_value = useRef(null);
  const input_handler = () => {
    const value = input_value.current.value;
    setcity(value);
  };
  const btn_handle = async () => {
    router.push(`/data?city=${city}`);
    //  fetchWeatherData();
  };


  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Weather App</h1>
        <h className={styles.discription}>
          Enter the name of the city of which you want to check the weather
          conditions.
        </h>
        <div className={styles.input}>
          <input
            type="text"
            className={styles.inp}
            ref={input_value}
            onChange={input_handler}
          />
          <button className={styles.btn} onClick={btn_handle}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default Home;


