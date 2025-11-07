import classes from './Weather.module.scss';

import { BsThermometerHalf } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { AiOutlineCalendar } from 'react-icons/ai';

import calculateDate from '../../../../helpers/calculateDate';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store';

const Weather = () => {
  const weatherInfo = useSelector((state: IRootState) => {
    return state.weather;
  });
  const { weekday, month, day, year, time } = calculateDate(new Date());
  
  return (
    <div className={`${classes['weather']}`}>
      <div className={`${classes['weather__weekday-time']} d-flex justify-content-between`}>
        <h5 className={`title title--h5`}>{weekday}</h5>
        <h5 className={`title title--h5`}>{time}</h5>
      </div>
      <div className={`${classes['weather__degrees-img']} d-flex justify-content-between align-items-center`}>
        <h4 className={`${classes['weather__degrees']}`}>{Math.round(weatherInfo.temperature)}&#176;</h4>
        <img className={`${classes['weather__img']}`} src={weatherInfo.weatherProps.img} alt="weather-type" />
      </div>
      <div className={`${classes['weather__type']} d-flex align-items-center`}>
        <div className={`${classes['weather-type__symbol']}`}>
          <BsThermometerHalf />
        </div>
        <div className={`${classes['weather-type__info']}`}>
          {weatherInfo.weatherProps.type}
        </div> 
      </div>
      <div className={`${classes['weather__geolocation']} d-flex align-items-center`}>
        <div className={`${classes['weather-geolocation__symbol']}`}>
          <GoLocation />
        </div>
        <div className={`${classes['weather-geolocation__info']}`}>
          {weatherInfo.place}
        </div> 
      </div>
      <div className={`${classes['weather__date']} d-flex align-items-center`}>
        <div className={`${classes['weather-date__symbol']}`}>
          <AiOutlineCalendar />
        </div>
        <div className={`${classes['weather-date__info']}`}>
          {`${day} ${month}, ${year}`}
        </div> 
      </div>
    </div>
  )
}

export default Weather;