import classes from './CurrencyRates.module.scss';

import { useSelector } from 'react-redux';
import { IRootState } from '../../../../../store';

const CurrencyRates = () => {
  const currencies = useSelector((state: IRootState) => {
		return state.currencies;
	});

  const tableContent = currencies.map((currency) => {
    return (
      <tr className={`${classes['currency-rates-table__row']}`} key={currency.type}>
        <td className={`${classes['currency-rates-table__element']}`}>{currency.type}</td>
        <td className={`${classes['currency-rates-table__element']}`}>{currency.rate.toFixed(2)}</td>
        <td className={`${classes['currency-rates-table__element']}`}>{(currency.rate * 1.04).toFixed(2)}</td>
      </tr>
    )
  })

  return (
    <div className={`${classes['currency-rates']}`}>
      <div className={`${classes['currency-rates__table']}`}>
        <table className={`${classes['currency-rates-table']}`}>
          <thead className={`text text--small-bold`}>
            <tr>
              <th className={`${classes['currency-rates-table__element']}`}>Currency</th>
              <th className={`${classes['currency-rates-table__element']}`}>Buy</th>
              <th className={`${classes['currency-rates-table__element']}`}>Sell</th>
            </tr>
          </thead>
          <tbody className={`text text--medium`}>
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CurrencyRates;