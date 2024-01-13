import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";




//create a weather slice
const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        temperatureUnit: 'C',
        currentCity: 'Delhi',
        weatherData: {}
    },
    reducers:{
        setTemperatureUnit: (state, action)=>{
            state.temperatureUnit = action.payload;
        },
        setCurrentCity: (state, action)=>{
            state.currentCity = action.payload;
        }
    },
    extraReducers: (builder)=>{

    }
});

export const weatherActions = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;