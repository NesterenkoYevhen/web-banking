import classes from './AdminHome.module.scss';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { IRootState, fetchCurrenciesRates, fetchWeather, useFetchReplenishmentsQuery, useFetchUsersQuery } from '../../../store';

import HeaderSecondary from '../../hoc/Header/HeaderSecondary/HeaderSecondary';
import { useThunk } from '../../../hooks/use-thunk';
import Weather from './components/Weather/Weather';
import Loader from '../../../common/Loader/Loader';
import AllUsers from './components/AllUsers/AllUsers';
import CurrencyRates from './components/CurrencyRates/CurrencyRates';
import Services from './components/Services/Services';
import RecentMessages from './components/RecentMessages/RecentMessages';

const AdminHome = () => {
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  const [doFetchWeather, isFetchingWeather] = useThunk(fetchWeather);
  const [doFetchCurrencies, isFetchingCurrencies] = useThunk(fetchCurrenciesRates);
  const { data: users, isFetching: isFetchingUsers } = useFetchUsersQuery();
  const { data: replenishments, isFetching: isFetchingReplenishments } = useFetchReplenishmentsQuery();

  useEffect(() => {
    doFetchCurrencies()
    doFetchWeather();
  }, [doFetchCurrencies, doFetchWeather]);

  return (
    <>
      {(isFetchingWeather || isFetchingCurrencies || isFetchingUsers || isFetchingReplenishments) && (
        <Loader />
      )}
      <div className={`${classes['home']}`}>
        <HeaderSecondary
          title="Dashboard"
          name={userInfo.name}
          surname={userInfo.surname}
          gender={userInfo.gender}
        />

        <div
          className={`${classes['home__content']} d-flex justify-content-between`}
        >
          <div className={`${classes['home__weather-allusers']}`}>
            <Weather />
            <AllUsers users={users || []} />
          </div>

          <div className={`${classes['home__rates-services']}`}>
            <CurrencyRates />
            <Services users={users || []} replenishments={replenishments || []} />
          </div>

          <div className={`${classes['home__new-messages']}`}>
            <RecentMessages />
          </div>
        </div>
      </div>
    </>
    
  )
}

export default AdminHome;