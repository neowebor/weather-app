import React from 'react';
import Card from "../Card/Card";

const WeatherCards = ({days, flag}) => {
    return (
        <div className="card_wrap">
            {flag
                ? days.map((day, index) =>
                    <Card day={day} key={index}/>
                )
                : <div className="not_found">Nothing found for your request</div>
            }
        </div>
    );
};

export default WeatherCards;