import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeatherData } from '../../redux/weatherSlice';
//to get diff icons
export const weatherIcons = {
  '01d': '/icons/sunny.png',
  '01n': '/icons/clear-night.png',
  '02d': '/icons/cloudy.png',
  '02n': '/icons/night-clouds.png',
  '03d': '/icons/cloudy.png',
  '03n': '/icons/night-clouds.png',
  '04d': '/icons/cloudy.png',
  '04n': '/icons/night-clouds.png',
  '09d': '/icons/rain.png',
  '09n': '/icons/rain.png',
  '10d': '/icons/rain.png',
  '10n': '/icons/rain.png',
  '11d': '/icons/thunderstorm.png',
  '11n': '/icons/thunderstorm.png',
  '13d': '/icons/snow.png',
  '13n': '/icons/snow.png',
  '50d': '/icons/mist.png',
  '50n': '/icons/mist.png',
};

export default function CurrentWeather() {
  //get the currentCity
  const currentCity = useSelector((state)=> state.weather.currentCity);
  const temperatureUnit = useSelector(state=> state.weather.temperatureUnit)
  const weatherData = useSelector(state=>state.weather.weatherData);
  const status = useSelector((state)=> state.weather.status)
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getCurrentWeatherData({currentCity, temperatureUnit }));

  },[currentCity, temperatureUnit]);


  //to get wind direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index];
  };

  
   
   
  return (
    <>
    {status === 'fulfilled' && 
    
      <div className=' flex flex-col justify-between absolute top-[150px] h-[300px] w-full md:w-[600px] lg:w-[800px]  shadow-md p-6 font-Kanit'>
        <div className='flex items-center gap-10 '>
          <div className='flex items-center gap-4'>
          <img
            className='w-[60px] h-[60px] md:w-[100px] md:h-[100px]'
            src={weatherIcons[weatherData.weather[0].icon]}
            alt={weatherData.weather[0].description}
          />
            <p className='text-[40px] md:text-[60px] font-Poppins'>
              {Math.round(weatherData.main.temp)}
              <sup className='relative top-[-18px] text-[20px] md:text-[30px] font-extrabold'>
                &deg;{temperatureUnit=== "Fahrenheit" ? "F" : "C"}
              </sup> 
            </p>
          </div>

          <div className='font-Poppins'>
            <p className='font-semibold'>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</p>
            <p className='text-slate-600 font-thin '>
              Feels Like &nbsp;
              {Math.round(weatherData.main.temp)}
              <sup className='relative top-[-6px]  font-extrabold'>
                &deg;{temperatureUnit=== "Fahrenheit" ? "F" : "C"}
              </sup> 
            </p>
          </div>

        </div>  

        <span className='flex mt-[20px] font-Poppins'>
          <span className='flex items-center'>
            Min will be   
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
            </svg>

            {Math.round(weatherData.main.temp_min)}
            <sup className='relative top-[-2px]  font-extrabold'>
              &deg;{temperatureUnit=== "Fahrenheit" ? "F" : "C"}
            </sup>
            .
          </span>
          
          &nbsp;&nbsp;

          <span className='flex items-center'>
            Max will be  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
            </svg>
            {Math.round(weatherData.main.temp_max)}
            <sup className='relative top-[-2px]  font-extrabold'>
              &deg;{temperatureUnit=== "Fahrenheit" ? "F" : "C"}
            </sup>
            .
          </span>
          
        </span>
        <p className='my-6 font-Poppins'>
          
        </p>        

        <div className='flex gap-4 justify-between '>
          
          <span className=''>
            <p className='font-Poppins'>Humidity</p>
            <p>
              {Math.round(weatherData.main.humidity)}%
            </p>
          </span>
          <span className=''>
            <p className='font-Poppins'>Visibitlity</p>
            <p>{Math.round(weatherData.visibility / 1000)} km</p>
          </span>
          <span className=' hidden md:inline '>
            <p className='font-Poppins'>Pressure</p>
            <p>
              {Math.round(weatherData.main.pressure)} mb
            </p>
          </span>
         
          <span className=' '>
            <p className='font-Poppins'>Wind Speed</p>
            <p>
              {Math.round(weatherData.wind.deg)} km/h
            </p>
          </span>
          <span className='hidden md:inline'>
            <p className='font-Poppins'>Wind Direction</p>
            <p>
            {getWindDirection(weatherData.wind.deg)}
            </p>
          </span>
         
          
        </div>
      </div>
    }
    </>
  );
}
