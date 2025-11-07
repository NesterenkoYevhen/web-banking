import classes from './Home.module.scss';

import { useSelector } from 'react-redux';
import { useThunk } from '../../hooks/use-thunk';
import { useEffect } from 'react';

import {
  fetchCurrenciesRates,
  fetchWeather,
  IRootState,
  useFetchCardsQuery,
  useFetchTransactionsQuery,
} from '../../store';

import Loader from '../../common/Loader/Loader';
import HeaderSecondary from '../hoc/Header/HeaderSecondary/HeaderSecondary';

import CurrencyRates from './components/CurrencyRates/CurrencyRates';
import Weather from './components/Weather/Weather';
import CostAnalysis from './components/CostAnalysis/CostAnalysis';
import MoneyTabs from './components/MoneyTabs/MoneyTabs';
import Wallet from './components/Wallet/Wallet';

const Home = () => {
  const [doFetchCurrencies, isFetchingCurrencies] =
    useThunk(fetchCurrenciesRates);
  const [doFetchWeather, isFetchingWeather] = useThunk(fetchWeather);
  const { data: cards, isFetching: isFetchingCards } = useFetchCardsQuery();
  const { data: transactions, isFetching: isFetchingTransactions } = useFetchTransactionsQuery();

  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  useEffect(() => {
    doFetchCurrencies()
    doFetchWeather();
  }, [doFetchWeather, doFetchCurrencies]);

  return (
    <>
      {(isFetchingCurrencies || isFetchingWeather || isFetchingCards || isFetchingTransactions) && (
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
          <div className={`${classes['home__rates-analysis']}`}>
            <CurrencyRates />
            <CostAnalysis transactions={transactions ? transactions : []} />
          </div>
          <div className={`${classes['home__moneytabs-weather']}`}>
            <MoneyTabs cards={cards ? cards : []} />
            <Weather />
          </div>
          <div className={`${classes['home__wallet']}`}>
            <Wallet cards={cards ? cards : []} transactions={transactions ? transactions : []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
