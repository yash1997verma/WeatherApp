import React, { useEffect, useRef, useState, useCallback  } from 'react'
import { weatherActions } from '../../redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
export default function Search() {
  const dispatch = useDispatch();
  //search Value
  const [searchValue , setSearchValue] = useState('');
  // search suggestions
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  //decide when to show the suggestion box
  const [showSuggestions, setShowSuggestions] = useState(false);

  //get the currentCity
  const currentCity = useSelector((state)=> state.weather.currentCity);

  const formRef = useRef();

  //close and open the suggestions
  const openSuggestion = ()=> setShowSuggestions(true);
  const closeSuggestions = ()=> setShowSuggestions(false);



  

  // debounced getCities function
  const getCities = useCallback(
    async (search) => {
      openSuggestion();
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${search}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_GEODB_CITIES,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        //if the entered city is not valid
        if (result.data.length  === 0) {
          toast.error('No cities found');
        } 

        setSearchSuggestions(result.data || []);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  // get search suggestion for cities
  useEffect(() => {
    // Fetch suggestions only if searchValue is not empty
    if (searchValue.trim() !== '') {
      const timeoutId = setTimeout(() => {
        getCities(searchValue);
      }, 1100); 

      // Clear timeout on cleanup to prevent unnecessary calls
      return () => clearTimeout(timeoutId);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchValue, getCities]);


  //handle click outside form
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        closeSuggestions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);
  

  

  //change search value 
  const changeSearchValue = (e)=>{
    const search = e.target.value;
    setSearchValue(search);
  }

  //select a city from suggestion
  const selectCity =(city)=>{
    closeSuggestions();
    console.log(city)
    dispatch(weatherActions.setCurrentCity(city));
  }

  return (
    <>
      {/* search location */}
      <form ref={formRef} onSubmit={(e)=> e.preventDefault()}  className='flex justify-center items-center'>

        <div className='absolute top-[80px] flex  items-center w-[300px] h-[30px] shadow-md rounded-md'>
          <input onChange={changeSearchValue} spellCheck={false} className='w-full pl-4  py-2  rounded-md font-Poppins' type="text" placeholder='Search for location' />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 text-gray-400 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        {showSuggestions &&
          <ul className='z-10 absolute top-[116px] bg-slate-50 w-[300px] rounded-sm shadow-md'>
            {searchSuggestions.map((city)=>(
              <li onClick={()=>selectCity(city)} key={city.id} className='hover:cursor-pointer hover:bg-slate-200'>
                <div className='flex justify-between p-2'>
                  <div className='flex flex-col gap-1'>
                    <p className='font-bold'>{city.city}</p>
                    <p className='font-Poppins italic text-sm'>{city.region}</p>
                  </div>
                  <p>{city.countryCode}</p>
                </div>
              </li>
            ))}
          </ul>
        } 
      </form>

            


      {/* Current city and data */}
      <div className='absolute top-[122px] flex gap-3'>
       <span className='flex font-Kanit gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {currentCity.city}
       </span>
       <p>Time & date</p>

      </div>
    
    </>
  );
}
