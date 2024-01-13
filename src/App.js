import logo from './logo.svg';
import './App.css';
import TodayWeather from './components/CurrentWeather/CurrentWeather';
import Search from './components/Search/Search';
import WeatherForecast from './components/WeatherForecast/WeatherForecastList';
// redux store
import store from './redux/store';
import { Provider } from 'react-redux';
//hot toast
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <Provider store={store} >
      <Toaster />
      <div className='flex mt-4 items-center justify-center gap-2 '>
        <img className='w-[20px] h-[20px]' src="/icons/BitsaWeather_Logo.png" alt="app logo" />
        <p className='font-Kanit font-bold'>Bitsa Weather</p>
      </div>
      <div className="relative flex flex-col justify-center items-center">
        <Search />
        <TodayWeather />
        <WeatherForecast />
      </div>
    </Provider>
  );
}

export default App;
