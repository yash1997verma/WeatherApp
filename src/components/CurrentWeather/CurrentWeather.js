import React, { useEffect } from 'react';






export default function CurrentWeather() {
    useEffect(()=>{
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_WEATHER_KEY; 
            const cityName = "Ajmer"
            // console.log(apiKey);

            
      
            // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
            const resData = await res.json();
            // console.log(resData);
        };
        fetchData();
    });
   
  return (
    <div className=' flex flex-col justify-between absolute top-[150px] h-[300px] w-full md:w-[600px] lg:w-[800px]  shadow-md p-6 font-Kanit'>
      <div className='flex items-center gap-10 '>
        <div className='flex items-center gap-4'>
          <img className='w-[100px] h-[100px] ' src= {`/icons/sunny.png`} alt="sunny weather" />
          <p className='text-[60px] font-Poppins'>10<sup className='relative top-[-18px] text-[30px] font-extrabold'>&deg;C</sup> </p>
        </div>

        <div className='font-Poppins'>
          <p className='font-semibold'>Clear Sky</p>
          <p className='text-slate-600 font-thin '>Feels Like &nbsp;8<sup>&deg;</sup></p>
        </div>

      </div>  
      <p className='my-6 font-Poppins'>Sky wil be clear today. Low will be 8</p>    

      <div className='flex gap-4 justify-between '>
        <span className='flex flex-col'>
          <p className='font-Poppins'>Wind</p>
          <p>5Km/h</p>
        </span>
        <span className='flex flex-col'>
          <p className='font-Poppins'>Wind</p>
          <p>5Km/h</p>
        </span>
        <span className='flex flex-col'>
          <p className='font-Poppins'>Wind</p>
          <p>5Km/h</p>
        </span>
        <span className='flex flex-col'>
          <p className='font-Poppins'>Wind</p>
          <p>5Km/h</p>
        </span>
        <span className='flex flex-col'>
          <p className='font-Poppins'>Wind</p>
          <p>5Km/h</p>
        </span>
      </div>

    </div>
  )
}
