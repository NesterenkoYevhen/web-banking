import classes from './Wallet.module.scss';

import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FC } from 'react';

import { ITransaction } from '../../../../types/transaction';
import { ICreditCard } from '../../../../types/credit-card';

import Carousel from './components/Carousel/Carousel';
import LatestTransactions from './components/LatestTransactions/LatestTransactions';

interface IWalletComponent {
  cards: ICreditCard[];
  transactions: ITransaction[];
}

const Wallet: FC<IWalletComponent> = ({ cards, transactions }) => {
  return (
    <div className={`${classes['wallet']}`}>
      <div className={`d-flex align-items-center justify-content-between`}>
        <h2 className={`title title--h2`}>Wallet</h2>
        <Link to="/createcard" className={`${classes['wallet__add-card']}`}>Add card<FiPlus className={`${classes['wallet__add-card--icon']}`} /></Link>
      </div>
      {
        cards.length > 0 ? 
        (
          <div className={`${classes['wallet__info']}`}>
            <Carousel cards={cards} />
            <LatestTransactions transactions={transactions} />
          </div>
        ) : 
        (
          <div className={`${classes['wallet__empty']} text-center`}>No info available</div>
        )
      }
      
    </div>
  )
}

export default Wallet;