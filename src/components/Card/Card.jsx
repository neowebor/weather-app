import React from 'react';
import classes from './Card.module.css'

const Card = ({day}) => {
    const ms = day.dt * 1000;
    const weekDayName = new Date(ms).toLocaleString('ru', {weekday: 'long'})
    const imgURL = "owf owf-"+ day.weather[0].id +" owf-5x icon-style";

    return (
        <div className={classes.card}>
            <div className={classes.title}>{weekDayName}</div>
            <i className={imgURL}/>
            <h2 style={{marginBottom: 20}}>{Math.round(day.main.temp)} °C</h2>
            <div className="card-body">
                <p style={{fontSize: 18}} className="card-text">{day.weather[0].description}</p>
            </div>
        </div>
    );
};

export default Card;