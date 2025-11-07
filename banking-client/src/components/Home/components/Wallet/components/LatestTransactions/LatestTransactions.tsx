import classes from './LatestTransactions.module.scss';

import { useState, useEffect, FC } from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import { ITransaction } from '../../../../../../types/transaction';

import Button from '../../../../../../common/Button/Button';

interface ILatestTransactionsComponent {
  transactions: ITransaction[];
}

const LatestTransactions: FC<ILatestTransactionsComponent> = ({ transactions }) => {
  const [last3Transactions, setLast3Transactions] = useState<ITransaction[]>([])

  useEffect(() => {
    if(transactions?.length <= 3) {
      setLast3Transactions(transactions?.slice(0,transactions.length).reverse() || [])
    } else {
      setLast3Transactions(transactions?.slice(transactions.length - 3,transactions.length).reverse() || [])
    }
    
  }, [transactions]);

  const last3TransactionsComponents = last3Transactions.map((trans) => {
    return (
      <li
        className={`${classes['transaction']} d-flex justify-content-between align-items-center`}
        key={trans.id}
      >
        <div className={`d-flex align-items-center`}>
          <div className={`${classes['transaction__icon']}`}>
            {trans.type === 'TRANSFER_SENDER' ? <GiPayMoney /> : <GiReceiveMoney />}
          </div>
          <div className={`${classes['transaction__info']}`}>
            <h5 className={`${classes['transaction__title']}`}>{trans.type === 'TRANSFER_SENDER' ? `Outcome` : `Income`}</h5>
            <h6 className={`${classes['transaction__subtitle']}`}>
              {trans.type === 'REPLENISHMENT' ? `Replenishment` : `Transfer`}
            </h6>
          </div>
        </div>
        <div>
          <h4 className={`title title--h4 ${trans.status === 'REJECTED' ? classes['text--red'] : classes['text--green']}`}>{trans.type === 'TRANSFER_SENDER' ? `-` : `+`}{trans.amount.toFixed(2)}₴</h4>
        </div>
      </li>
    );
  });

  return (
    <div className={`${classes['latest-transactions']}`}>
      <h4 className={`title title--h4`}>Latest transactions</h4>
      <ul className={`${classes['latest-transactions__list']}`}>
        {last3TransactionsComponents}
      </ul>
      <div className={`${classes['latest-transactions__btn-more']}`}>
        <Link to="/history">
          <Button primary>See more</Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestTransactions;
