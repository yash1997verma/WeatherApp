import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const getCurrentWeatherData = createAsyncThunk(
    'weather/getCurrentWeatherData',
    async ({ currentCity, temperatureUnit }) => {
        try {
            const apiKey = process.env.REACT_APP_WEATHER_KEY;
            const { city } = currentCity;
        
            let units;
            if (temperatureUnit === "Celsius") {
                units = "metric";
            } else {
                units = "imperial";
            }
        
            const apiRequest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
        
            const res = await fetch(apiRequest);
            const resData = await res.json();
            return resData;
        } catch (err) {
            throw err;
        }
    }
);
export const getWeatherForecastData = createAsyncThunk(
    'weather/getWeatherForecastData',
    async ({ currentCity, temperatureUnit }) => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_KEY;
        const { city } = currentCity;
  
        let units;
        if (temperatureUnit === "Celsius") {
          units = "metric";
        } else {
          units = "imperial";
        }
  
        const apiRequest = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  
        const res = await fetch(apiRequest);
        const resData = await res.json();
        return resData;
      } catch (err) {
        throw err;
      }
    }
  );



//create a weather slice
const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        status: 'idle',
        forecastStatus: 'idle',
        temperatureUnit: 'Celsius',
        currentCity: {
            city: "Delhi",
            country: "India",
            latitude: 28.666666666,
            longitude: 77.216666666
        },
        weatherData: {},
        weatherForecastData: {},
    },
    reducers:{
        setTemperatureUnit: (state, action)=>{
            state.temperatureUnit = action.payload;
        },
        setCurrentCity: (state, action)=>{
            state.currentCity = action.payload;
        },
        
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getCurrentWeatherData.fulfilled,(state,action)=>{
            state.weatherData = action.payload;
            state.status= 'fulfilled';
        })
        .addCase(getCurrentWeatherData.pending,(state,action)=>{
            state.status = 'pending'
        })
        .addCase(getCurrentWeatherData.rejected,(state,action)=>{
            state.status = 'rejected';
            toast.error('Unable to load weather data');
        })
        .addCase(getWeatherForecastData.fulfilled, (state, action) => {
            const uniqueDates = new Set();
            const filteredForecast = action.payload.list.filter((item) => {
                const date = item.dt_txt.split(' ')[0];
                if (!uniqueDates.has(date)) {
                    uniqueDates.add(date);
                    return true;
                }
                return false;
            });

            state.weatherForecastData = { ...action.payload, list: filteredForecast };
            state.forecastStatus = 'fulfilled';
        })
        
        .addCase(getWeatherForecastData.pending, (state, action) => {
            state.forecastStatus = 'pending';
        })
        .addCase(getWeatherForecastData.rejected, (state, action) => {
            state.forecastStatus = 'rejected';
            toast.error('Unable to load weather forecast data');
        });
    }
});

export const weatherActions = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;