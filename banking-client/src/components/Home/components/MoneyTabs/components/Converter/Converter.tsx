import classes from './Converter.module.scss';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { IRootState } from '../../../../../../store';
import { IOption } from '../../../../../../types/option';
import { CURRENCIES_OPTIONS } from '../../../../../../constants';

import Input from '../../../../../../common/Input/Input';
import Dropdown from '../../../../../../common/Dropdown/Dropdown';

const Converter = () => {
  const currencies = useSelector((state: IRootState) => {
		return state.currencies;
	});

  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [currency1, setCurrency1] = useState<IOption>(CURRENCIES_OPTIONS[0]);
  const [currency2, setCurrency2] = useState<IOption>(CURRENCIES_OPTIONS[1]);

  const format = (number: number) => {
    return number.toFixed(2)
  }

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate1 = currencies.find(currency => currency.type === currency1.value)?.rate || 1;
    const rate2 = currencies.find(currency => currency.type === currency2.value)?.rate || 1;
  
    if (currency1.value === 'UAH' && currency2.value === 'UAH') {
      setAmount2(String(format(+e.target.value))); 
    } else if (currency1.value === 'UAH') {
      setAmount2(String(format(+e.target.value / rate2)));
    } else if (currency2.value === 'UAH') {
      setAmount2(String(format(+e.target.value * rate1)));
    } else {
      setAmount2(String(format(+e.target.value * rate2 / rate1)));
    }
    setAmount1(e.target.value)
  };

  const handleSelect1 = (option: IOption) => {
    const rate1 = currencies.find(currency => currency.type === option.value)?.rate || 1;
    const rate2 = currencies.find(currency => currency.type === currency2.value)?.rate || 1;
  
    if (option.value === 'UAH' && currency2.value === 'UAH') {
      setAmount2(String(format(+amount1))); 
    } else if (option.value === 'UAH') {
      setAmount2(String(format(+amount1 / rate2)));
    } else if (currency2.value === 'UAH') {
      setAmount2(String(format(+amount1 * rate1)));
    } else {
      setAmount2(String(format(+amount1 * rate2 / rate1)));
    }
    setCurrency1(option);
  };

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate1 = currencies.find(currency => currency.type === currency1.value)?.rate || 1;
    const rate2 = currencies.find(currency => currency.type === currency2.value)?.rate || 1;
    
    if (currency1.value === 'UAH' && currency2.value === 'UAH') {
      setAmount1(String(format(+e.target.value))); 
    } else if (currency1.value === 'UAH') {
      setAmount1(String(format(+e.target.value * rate2)));
    } else if (currency2.value === 'UAH') {
      setAmount1(String(format(+e.target.value / rate1)));
    } else {
      setAmount1(String(format(+e.target.value * rate1 / rate2)));
    }
    setAmount2(e.target.value)
  };

  const handleSelect2 = (option: IOption) => {
    const rate1 = currencies.find(currency => currency.type === currency1.value)?.rate || 1;
    const rate2 = currencies.find(currency => currency.type === option.value)?.rate || 1;
  
    if (option.value === 'UAH' && currency2.value === 'UAH') {
      setAmount1(String(format(+amount2))); 
    } else if (option.value === 'UAH') {
      setAmount1(String(format(+amount2 * rate2)));
    } else if (currency2.value === 'UAH') {
      setAmount1(String(format(+amount2 / rate1)));
    } else {
      setAmount1(String(format(+amount2 * rate1 / rate2)));
    }
    setCurrency2(option);
  };

  return (
    <div className={`${classes['converter']}`}>
      <div className={`${classes['converter__input']} d-flex`}>
        <Input
          type="number"
          min="0"
          value={amount1}
          classNamesInput={`${classes['converter__text']}`}
          onChange={handleAmount1Change}
        />
        <div className={`${classes['converter__dropdown']}`}>
          <Dropdown
            options={CURRENCIES_OPTIONS}
            value={currency1}
            onChange={handleSelect1}
            dropdownClasses={`${classes['converter__select']}`}
          />
        </div>
      </div>
      <div className={`${classes['converter__input']} d-flex`}>
        <Input
          type="number"
          min="0"
          value={amount2}
          classNamesInput={`${classes['converter__text']}`}
          onChange={handleAmount2Change}
        />
        <div className={`${classes['converter__dropdown']}`}>
          <Dropdown
            options={CURRENCIES_OPTIONS}
            value={currency2}
            onChange={handleSelect2}
            dropdownClasses={`${classes['converter__select']}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
