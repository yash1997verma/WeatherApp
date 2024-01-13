import React, { useEffect, useRef } from 'react';
import { getWeatherForecastData } from '../../redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import WeatherForecastItem from './WeatherForecastItem';

export default function WeatherForecast() {
  const currentCity = useSelector((state) => state.weather.currentCity);
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit);
  const forecastStatus = useSelector((state) => state.weather.forecastStatus);
  const weatherForecastData = useSelector((state) => state.weather.weatherForecastData);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(getWeatherForecastData({ currentCity, temperatureUnit }));
  }, [currentCity]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    }
  };

  return (
    <>
      {forecastStatus === 'fulfilled' && (
        <span className='flex justify-between items-center absolute  top-[500px] w-full md:w-[620px] lg:w-[820px]'>
          <button className='hover:scale-110 transition- hover:cursor-pointer  z-10 mr-6'  onClick={handleScrollLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <div
            className=' flex   w-[320px] md:w-[600px] lg:w-[800px]   p-6 font-Kanit overflow-x-hidden gap-3 '
            ref={containerRef}
          >
            {weatherForecastData.list.map((weather) => (
              <div key={weather.dt} className=''>
                <WeatherForecastItem weather={weather} />
              </div>
            ))}
            
          </div>
          <button className='hover:scale-110 transition- hover:cursor-pointer  z-10'  onClick={handleScrollRight}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </span>
        
      )}
      {/* fixed left-0 md:left-[60px] lg:left-[100px] top-[600px]  */}
      {/* <button  onClick={handleScrollLeft}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>

      <button className='fixed right-0 md:right-[50px] lg:right-[100px] top-[600px] hover:scale-110 transition-transform' onClick={handleScrollRight}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button> */}

      
    </>
  );
}
