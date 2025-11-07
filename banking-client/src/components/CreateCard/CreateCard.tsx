import classes from './CreateCard.module.scss';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, SyntheticEvent } from 'react';

import generateCardNumber from '../../helpers/generateCardNumber';
import { IRootState, useCreateCardMutation } from '../../store';
import { IError } from '../../types/error';

import masterCardLogo from '../../assets/master-card.svg';
import visaLogo from '../../assets/visa.svg';

import HeaderSecondary from '../hoc/Header/HeaderSecondary/HeaderSecondary';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Error from '../Error/Error';
import Loader from '../../common/Loader/Loader';

const CreateCard = () => {
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  const [createCreditCard, resultsCreateCreditCard] = useCreateCardMutation();

  const navigate = useNavigate();

  const [type, setType] = useState('DEBIT');
  const [payment_system, setPaymentSystem] = useState('MASTER_CARD');
  const [color, setColor] = useState('DARK');
  const [isToggleLimit, setToggleLimit] = useState(false);
  const [onlineLimit, setOnlineLimit] = useState('');
  const [validOnlineLimit, setValidOnlineLimit] = useState(false);
  const [offlineLimit, setOfflineLimit] = useState('');
  const [validOfflineLimit, setValidOfflineLimit] = useState(false);

  useEffect(() => {
    if (+onlineLimit > 0) {
      setValidOnlineLimit(true);
    } else {
      setValidOnlineLimit(false);
    }
  }, [onlineLimit]);

  useEffect(() => {
    if (+offlineLimit > 0) {
      setValidOfflineLimit(true);
    } else {
      setValidOfflineLimit(false);
    }
  }, [offlineLimit]);

  const goBack = () => navigate(-1);

  const onCreateCard = (e: SyntheticEvent) => {
    e.preventDefault();
    let card;
    if(isToggleLimit) {
      card = {
        number: +generateCardNumber(payment_system),
        type,
        payment_system,
        color,
        online_limit: +onlineLimit,
        offline_limit: +offlineLimit
      }
    } else {
      card = {
        number: +generateCardNumber(payment_system),
        type,
        payment_system,
        color
      }
    }
    try {
      createCreditCard(card)
      setType('DEBIT');
      setPaymentSystem('MASTER_CARD');
      setColor('DARK');
      setToggleLimit(false);
      setOnlineLimit('');
      setValidOnlineLimit(false);
      setOfflineLimit('');
      setValidOfflineLimit(false);
      navigate('/home');
    } catch(err) {
      console.error(err);
    }
  }

  const content = !resultsCreateCreditCard.error ? (
    <div className={`${classes['create-card']}`}>
      {resultsCreateCreditCard.isLoading && <Loader />}
      <HeaderSecondary
        title="Add a new card"
        name={userInfo.name}
        surname={userInfo.surname}
        gender={userInfo.gender}
      />
      <form
        className={`${classes['create-card-form']} d-flex justify-content-between`}
        onSubmit={onCreateCard}
      >
        <ul className={`${classes['create-card-form__fields']}`}>
          <li className={`${classes['create-card-form__field']}`}>
            <h3 className={`title title--h3`}>Type of the card</h3>
            <div className={`${classes['type-of-card']} d-flex`}>
              <div className={`${classes['type-of-card__item']}`}>
                <input
                  className={`${classes['type-of-card__item--radio']}`}
                  type="radio"
                  value="DEBIT"
                  id="debit"
                  name="type-of-card"
                  checked={type === 'DEBIT'}
                  onChange={(e) => setType(e.target.value)}
                />
                <label
                  className={`${classes['type-of-card__item--label']}`}
                  htmlFor="debit"
                >
                  Debit
                </label>
              </div>
              <div className={`${classes['type-of-card__item']}`}>
                <input
                  className={`${classes['type-of-card__item--radio']}`}
                  type="radio"
                  value="CREDIT"
                  id="credit"
                  name="type-of-card"
                  checked={type === 'CREDIT'}
                  onChange={(e) => setType(e.target.value)}
                />
                <label
                  className={`${classes['type-of-card__item--label']}`}
                  htmlFor="credit"
                >
                  Credit
                </label>
              </div>
            </div>
          </li>
          <li className={`${classes['create-card-form__field']}`}>
            <h3 className={`title title--h3`}>Payment system</h3>
            <div className={`${classes['payment-system']} d-flex`}>
              <div className={`${classes['payment-system__item']}`}>
                <input
                  className={`${classes['payment-system__item--radio']}`}
                  type="radio"
                  value="MASTER_CARD"
                  id="master-card"
                  name="payment-system"
                  checked={payment_system === 'MASTER_CARD'}
                  onChange={(e) => setPaymentSystem(e.target.value)}
                />
                <label
                  className={`${classes['payment-system__item--label']}`}
                  htmlFor="master-card"
                >
                  <div className={`${classes['payment-system__item--img']}`}>
                    <img src={masterCardLogo} alt="master-card" />
                  </div>
                  <h6
                    className={`${classes['payment-system__item--title']} text-center`}
                  >
                    Mastercard
                  </h6>
                </label>
              </div>
              <div className={`${classes['payment-system__item']}`}>
                <input
                  className={`${classes['payment-system__item--radio']}`}
                  type="radio"
                  value="VISA"
                  id="visa"
                  name="payment-system"
                  checked={payment_system === 'VISA'}
                  onChange={(e) => setPaymentSystem(e.target.value)}
                />
                <label
                  className={`${classes['payment-system__item--label']}`}
                  htmlFor="visa"
                >
                  <div className={`${classes['payment-system__item--img']}`}>
                    <img src={visaLogo} alt="visa" />
                  </div>
                  <h6
                    className={`${classes['payment-system__item--title']} text-center`}
                  >
                    Visa
                  </h6>
                </label>
              </div>
            </div>
          </li>
          <li className={`${classes['create-card-form__field']}`}>
            <div className={`d-flex justify-content-between`}>
              <h3 className={`title title--h3`}>Set limits</h3>
              <label className={`${classes['limits-toggler__label']}`}>
                <input
                  className={`${classes['limits-toggler__input']}`}
                  type="checkbox"
                  defaultChecked={isToggleLimit}
                  onClick={() => setToggleLimit(!isToggleLimit)}
                />
                <span className={`${classes['limits-toggler__span']}`} />
              </label>
            </div>
            {isToggleLimit && (
              <ul className={`${classes['limits']}`}>
                <li className={`${classes['limits__item']}`}>
                  <Input
                    min="0"
                    type="number"
                    inputName="online-limit-input"
                    labelText="Online transaction"
                    placeholder="Enter limit for online transactions in UAH ₴"
                    value={onlineLimit}
                    onChange={(e) => setOnlineLimit(e.target.value)}
                    incorrect={
                      !validOnlineLimit && onlineLimit ? 'Invalid limit' : null
                    }
                    success={
                      validOnlineLimit && onlineLimit ? 'Valid limit' : null
                    }
                  />
                </li>
                <li className={`${classes['limits__item']}`}>
                  <Input
                    min="0"
                    type="number"
                    inputName="offline-limit-input"
                    labelText="Offline transaction"
                    placeholder="Enter limit for offline transactions in UAH ₴"
                    value={offlineLimit}
                    onChange={(e) => setOfflineLimit(e.target.value)}
                    incorrect={
                      !validOfflineLimit && offlineLimit
                        ? 'Invalid limit'
                        : null
                    }
                    success={
                      validOfflineLimit && offlineLimit ? 'Valid limit' : null
                    }
                  />
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className={`${classes['create-card-form__color-controls']}`}>
          <h3 className={`title title--h3`}>Choose a color</h3>
          <div className={`${classes['card-colors']} d-flex`}>
            <label
              className={`${classes['card-colors__label']}`}
              htmlFor="dark-color"
            >
              <input
                className={`${classes['card-colors__radio']}`}
                type="radio"
                value="DARK"
                id="dark-color"
                name="card-color"
                checked={color === 'DARK'}
                onChange={(e) => setColor(e.target.value)}
              />
              <div
                className={`${classes['credit-card']} d-flex flex-column justify-content-between ${classes['credit-card--dark']}`}
              >
                <h5
                  className={`title title--h5 ${classes['credit-card__title--dark']}`}
                >
                  Universal Card
                </h5>
                <div>
                  <h3
                    className={`title title--h3 ${classes['credit-card__balance--dark']}`}
                  >
                    &#x20B4;1200
                  </h3>
                  <p
                    className={`text text--small-regular ${
                      classes['credit-card__balance-title']
                    } ${classes['credit-card__balance-title--dark']}`}
                  >
                    Balance
                  </p>
                </div>
                <div
                  className={`${classes['credit-card__number-payment']} d-flex align-items-center justify-content-between`}
                >
                  <p
                    className={`${classes['credit-card__number--dark']}`}
                  >
                    1234 5678 9101 1121
                  </p>
                  <img
                    className={`${classes['credit-card__payment-system']}`}
                    src={
                      payment_system === 'MASTER_CARD'
                        ? masterCardLogo
                        : visaLogo
                    }
                    alt="payment-system"
                  />
                </div>
              </div>
            </label>
            <label
              className={`${classes['card-colors__label']}`}
              htmlFor="gold-color"
            >
              <input
                className={`${classes['card-colors__radio']}`}
                type="radio"
                value="GOLD"
                id="gold-color"
                name="card-color"
                checked={color === 'GOLD'}
                onChange={(e) => setColor(e.target.value)}
              />
              <div
                className={`${classes['credit-card']} d-flex flex-column justify-content-between ${classes['credit-card--gold']}`}
              >
                <h5
                  className={`title title--h5 ${classes['credit-card__title--gold']}`}
                >
                  Gold Card
                </h5>
                <div>
                  <h3
                    className={`title title--h3 ${classes['credit-card__balance--gold']}`}
                  >
                    &#x20B4;1200
                  </h3>
                  <p
                    className={`text text--small-regular ${
                      classes['credit-card__balance-title']
                    } ${classes['credit-card__balance-title--gold']}`}
                  >
                    Balance
                  </p>
                </div>
                <div
                  className={`${classes['credit-card__number-payment']} d-flex align-items-center justify-content-between`}
                >
                  <p
                    className={`${classes['credit-card__number--gold']}`}
                  >
                    1234 5678 9101 1121
                  </p>
                  <img
                    className={`${classes['credit-card__payment-system']}`}
                    src={
                      payment_system === 'MASTER_CARD'
                        ? masterCardLogo
                        : visaLogo
                    }
                    alt="payment-system"
                  />
                </div>
              </div>
            </label>
          </div>
          <div className={`${classes['create-card-form__controls']} d-flex`}>
            <div className={`${classes['create-card-form__control']}`}>
              <Button type='button' secondary onClick={goBack}>Back</Button>        
            </div>
            <div className={`${classes['create-card-form__control']}`}>
              <Button disabled={(isToggleLimit && validOnlineLimit && validOfflineLimit) || !isToggleLimit ? false : true} type='submit' primary>Create</Button>        
            </div>       
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Error errorsResponse={resultsCreateCreditCard.error as { status: number; data: { errors: IError[]; }; }} />
  );

  return content;
};

export default CreateCard;
