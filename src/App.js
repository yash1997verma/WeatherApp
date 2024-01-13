import logo from './logo.svg';
import './App.css';
import TodayWeather from './components/CurrentWeather/CurrentWeather';
import Search from './components/Search/Search';
// redux store
import store from './redux/store';
import { Provider } from 'react-redux';
//hot toast
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <Provider store={store} >
      <Toaster />
      <div className="relative flex flex-col justify-center items-center">
        <Search />
        <TodayWeather />
      </div>
    </Provider>
  );
}

export default App;
