import React from 'react'
import { weatherIcons } from '../CurrentWeather/CurrentWeather';
export default function WeatherForecastItem({weather}) {
    console.log(weather)
    return (
        <div className='flex-col  w-[200px] h-[100px] p-2 border-gray-200 shadow-md  rounded-md'>
            <p>
                {(() => {
                    const options = { weekday: 'short', month: 'short', day: 'numeric' };
                    return new Date(weather.dt_txt).toLocaleDateString('en-US', options);
                })()}
            </p>
            <div className='flex items-start justify-between mt-2 gap-2'>
                <img
                    className='w-10 h-10'
                    src={weatherIcons[weather.weather[0].icon]}
                    alt={weather.weather[0].description}
                />
                <span className='relative top-[-8px] ml-4'>
                    <p className=''>{Math.round(weather.main.temp_min)}&deg; </p>
                    <p className=''>{Math.round(weather.main.temp_max)}&deg;</p>
                </span>
                <span className='relative top-[-8px] ml-4'>
                    <p className='text-sm'>{weather.weather[0].main}</p>
                    <span className='flex items-center gap-2'>
                        <img className='w-4 h-4' src="/icons/humid.png" alt="" />
                        {weather.main.humidity}%
                    </span>
                </span>
            </div>
        </div>
    );
}
