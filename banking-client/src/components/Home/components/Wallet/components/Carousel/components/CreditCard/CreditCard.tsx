import classes from './CreditCard.module.scss';

import { FC } from 'react';

import { ICreditCard } from '../../../../../../../../types/credit-card';
import formatCreditCard from '../../../../../../../../helpers/formatCreditCard';

import masterCardLogo from '../../../../../../../../assets/master-card.svg';
import visaLogo from '../../../../../../../../assets/visa.svg';

interface ICreditCardComponent {
  card: ICreditCard;
}

const CreditCard: FC<ICreditCardComponent> = ({ card }) => {
  return (
    <div
      className={`${
        classes['credit-card']
      } d-flex flex-column justify-content-between ${
        card.color === 'DARK'
          ? classes['credit-card--dark']
          : classes['credit-card--gold']
      }`}
    >
      <h5
        className={`title title--h5 ${
          card.color === 'DARK'
            ? classes['credit-card__title--dark']
            : classes['credit-card__title--gold']
        }`}
      >
        {card.color === 'DARK' ? 'Universal Card' : 'Gold Card'}
      </h5>
      <div>
        <h3
          className={`title title--h3 ${
            card.color === 'DARK'
              ? classes['credit-card__balance--dark']
              : classes['credit-card__balance--gold']
          }`}
        >
          &#x20B4;{card.balance.toFixed(2)}
        </h3>
        <p
          className={`text text--small-regular ${
            classes['credit-card__balance-title']
          } ${
            card.color === 'DARK'
              ? classes['credit-card__balance-title--dark']
              : classes['credit-card__balance-title--gold']
          }`}
        >
          Balance
        </p>
      </div>
      <div
        className={`${classes['credit-card__number-payment']} d-flex align-items-center justify-content-between`}
      >
        <p
          className={`${
            card.color === 'DARK'
              ? classes['credit-card__number--dark']
              : classes['credit-card__number--gold']
          }`}
        >
          {formatCreditCard(card.number)}
        </p>
        <img
          className={`${classes['credit-card__payment-system']}`}
          src={
            card.payment_system === 'MASTER_CARD' ? masterCardLogo : visaLogo
          }
          alt="payment-system"
        />
      </div>
    </div>
  );
};

export default CreditCard;
