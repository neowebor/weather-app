import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Card from "./Card/Card";
import WeatherCards from "./WeatherCards/WeatherCards";
import Loader from "./Loader/Loader";

const WeakContainer = () => {
    const [days, setDays] = useState([]);
    const [cityName, setCityName] = useState('');
    let inputText = useRef(null);
    const [flag, setFlag] = useState(true);
    const [isCardLoading, setStateLoading] = useState(false);

    async function fetchWeather() {
        setStateLoading(true)
        setTimeout( async () => {
            const response = await axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ru&units=metric&APPID=94e7539b8ba42da26ad0482b02670c04`)
                .catch((error) => {
                    setFlag(false)
                    setStateLoading(false)
                    console.error(error)
                })
            if(response.statusText === 'OK') {
                const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                setDays(dailyData)
                setFlag(true)
            }
            setStateLoading(false)
        }, 10)
    }

    useEffect(() => {
        fetchWeather()
        setFlag(false)
    }, [cityName])

    function foundCity(e) {
        if(e.code === 'Enter') {
            let text = inputText.current.value;
            setCityName(text);
        }
    }

    return (
        <div className="app-wrap">
            <h1 className="title">Weather</h1>
            <input type="text"
                   ref={inputText}
                   onKeyDown={foundCity}
                   className="input"
                   placeholder="Enter your city..."/>
            <div className="box">
                {isCardLoading
                    ? <div className="loader_wrap">
                        <Loader/>
                    </div>
                    : <WeatherCards days={days} flag={flag}/>
                }

            </div>
        </div>
    );
};

export default WeakContainer;