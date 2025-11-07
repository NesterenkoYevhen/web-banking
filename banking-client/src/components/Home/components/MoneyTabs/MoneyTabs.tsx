import classes from './MoneyTabs.module.scss';

import { FC, useState } from 'react';

import { ICreditCard } from '../../../../types/credit-card';

import TopUp from './components/TopUp/TopUp';
import Converter from './components/Converter/Converter';


interface IMoneyTabsComponent {
  cards: ICreditCard[];
}

const MoneyTabs: FC<IMoneyTabsComponent> = ({ cards }) => {
  const [isTopUp, setIsTopUp] = useState(true);

  return (
    <div className={`${classes['money-tabs']}`}>
      <div className={`${classes['money-tabs__header']} d-flex justify-content-between`}>
        <button onClick={() => setIsTopUp(true)} className={`${classes['money-tabs__top-up']} ${isTopUp && classes['money-tabs__header--active']}`}>Top up</button>
        <button onClick={() => setIsTopUp(false)} className={`${classes['money-tabs__converter']} ${!isTopUp && classes['money-tabs__header--active']}`}>Converter</button>
      </div>
      <div className={`${classes['money-tabs__content']}`}>
        {isTopUp ? <TopUp cards={cards} /> : <Converter />}
      </div>
    </div>
  )
}

export default MoneyTabs;