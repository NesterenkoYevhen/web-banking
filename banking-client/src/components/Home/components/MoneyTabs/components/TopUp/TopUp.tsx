import classes from './TopUp.module.scss';

import { useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { BsCreditCard2Front } from 'react-icons/bs';

import cutCardNumber from '../../../../../../helpers/cutCardNumber';
import { CURRENCIES_OPTIONS } from '../../../../../../constants';
import { IOption } from '../../../../../../types/option';
import { IError } from '../../../../../../types/error';

import Dropdown from '../../../../../../common/Dropdown/Dropdown';
import { IRootState, useCreateReplenishmentMutation } from '../../../../../../store';
import { IReplenishment } from '../../../../../../types/replenishment';
import { ICreditCard } from '../../../../../../types/credit-card';

import Input from '../../../../../../common/Input/Input';
import Button from '../../../../../../common/Button/Button';
import Error from '../../../../../Error/Error';
import Loader from '../../../../../../common/Loader/Loader';

interface ITopUpComponent {
  cards: ICreditCard[];
}

const TopUp: FC<ITopUpComponent> = ({ cards }) => {
  const [createReplenishment, resultsCreateReplenishment] = useCreateReplenishmentMutation();

  const cardsOptions = cards.map((card) => {
    return {
      label: cutCardNumber(String(card.number)),
      value: card.id,
    };
  });

  const state = useSelector((state: IRootState) => state);
  const [currency, setCurrency] = useState<IOption>(CURRENCIES_OPTIONS[0]);
  const [card, setCard] = useState<IOption>(cardsOptions[0]);
  const [amount, setAmount] = useState('');
  const [validAmount, setValidAmount] = useState(false);

  useEffect(() => {
    if (+amount > 0) {
      setValidAmount(true);
    } else {
      setValidAmount(false);
    }
  }, [amount]);

  const handleSelectCurrency = (option: IOption) => {
    setCurrency(option);
  };

  const handleSelectCard = (option: IOption) => {
    setCard(option);
  };

  const onTopUpCard = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let amountUAH;

    if (currency.value === 'UAH') {
      amountUAH = +amount;
    } else {
      const rate = state.currencies.find(
        (currencyInState) => currencyInState.type === currency.value
      )!.rate;
      amountUAH = +amount * rate;
    }

    const result: IReplenishment = {
      amount: amountUAH,
      cardId: card.value,
    };

    setAmount('');
    setValidAmount(false);
    createReplenishment(result);
  };

  const content = !resultsCreateReplenishment.error ? (
    <form className={`${classes['top-up']}`} onSubmit={onTopUpCard}>
      {resultsCreateReplenishment.isLoading && <Loader />}
      <div className={`d-flex justify-content-between`}>
        <div className={`${classes['top-up__dropdown']}`}>
          <Dropdown
            options={CURRENCIES_OPTIONS}
            value={currency}
            onChange={handleSelectCurrency}
            icon={<FaMoneyBillAlt />}
          />
        </div>
        <div className={`${classes['top-up__dropdown']}`}>
          <Dropdown
            options={cardsOptions}
            value={card}
            onChange={handleSelectCard}
            icon={<BsCreditCard2Front />}
          />
        </div>
      </div>
      <div className={`${classes['top-up__input']} d-flex`}>
        <Input
          classNamesInput={`${classes['top-up__amount']}`}
          id='top-up-input'
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor='top-up-input' className={`${classes['top-up__amount--label']}`}>Amount</label>
      </div>
      <div className={`${classes['top-up__submit']}`}>
        <Button type="submit" disabled={validAmount && card ? false : true} primary>
          Top Up
        </Button>
      </div>
    </form>
  ) : (
    <Error errorsResponse={resultsCreateReplenishment.error as { status: number; data: { errors: IError[]; }; }} />
  )

  return content;
};

export default TopUp;
