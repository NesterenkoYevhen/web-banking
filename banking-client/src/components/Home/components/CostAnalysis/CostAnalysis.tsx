import classes from './CostAnalysis.module.scss';

import {FC} from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';

import getDateInfo from '../../../../helpers/findDateInfo';
import { ITransaction } from '../../../../types/transaction';
import calculateSpendingByDayOfWeek from '../../../../helpers/calculateSpendingByDayOfWeek';
import getDaysFromMonday from '../../../../helpers/getDaysFromMonday';

interface ICostAnalysisComponent {
  transactions: ITransaction[];
}

const CostAnalysis: FC<ICostAnalysisComponent> = ({ transactions }) => {
  const spending = calculateSpendingByDayOfWeek(transactions)
  const { week, year } = getDateInfo();
  const average = Math.round(Object.values(spending).reduce((acc, el) => {
    acc += el;
    return acc
  }, 0) / getDaysFromMonday());
  const averageCostStyles = {
    top: `${53 - Math.min((average * 100) / 1000, 100)}%`
  }
  
  return (
    <div className={`${classes['cost-analysis']}`}>
      <div className={`d-flex justify-content-between align-items-center`}>
        <h4 className={`title title--h4`}>{`Week ${week}`}</h4>
        <div className={`${classes['cost-analysis__year']} d-flex align-items-center`}>
          <AiOutlineCalendar className={`${classes['cost-analysis__year--icon']}`} />
          <span className={`${classes['cost-analysis__year--text']}`}>{year}</span>
        </div>
      </div>
      <div className={`${classes['cost-analysis__info']} d-flex justify-content-between`}>
        <div style={averageCostStyles} className={`${classes['average-line']} d-flex align-items-center`}>
          <span className={`${classes['average-line__length']}`}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>
          <div className={`${classes['average-line__number']}`}>
            {`₴${average}`}
          </div>
        </div>
        <ul className={`${classes['cost-analysis__list']} d-flex`}>
          <li className={`${classes['cost-analysis__item']}`}>
            {/* <progress className={`${classes['day-progress']}`} value="731" max="1000"></progress> */}
            <progress className={`${classes['day-progress']}`} value={`${spending['Mon']}`} max="1050"></progress>
            <h6 className={`${classes['day-progress__label']}`}>Mon</h6>
          </li>
          <li className={`${classes['cost-analysis__item']}`}>
            {/* <progress className={`${classes['day-progress']}`} value="350" max="1000"></progress> */}
            <progress className={`${classes['day-progress']}`} value={`${spending['Tue']}`} max="1050"></progress>
            <h6 className={`${classes['day-progress__label']}`}>Tue</h6>
          </li>
          <li className={`${classes['cost-analysis__item']}`}>
            {/* <progress className={`${classes['day-progress']}`} value="800" max="1000"></progress> */}
            <progress className={`${classes['day-progress']}`} value={`${spending['Wed']}`} max="1050"></progress>
            <h6 className={`${classes['day-progress__label']}`}>Wed</h6>
          </li>
          <li className={`${classes['cost-analysis__item']}`}>
            {/* <progress className={`${classes['day-progress']}`} value="200" max="1000"></progress> */}
            <progress className={`${classes['day-progress']}`} value={`${spending['Thu']}`} max="1050"></progress>
            <h6 className={`${classes['day-progress__label']}`}>Thu</h6>
          </li>
          <li className={`${classes['cost-analysis__item']}`}>
            {/* <progress className={`${classes['day-progress']}`} value="450" max="1000"></progress> */}
            <progress className={`${classes['day-progress']}`} value={`${spending['Fri']}`} max="1050"></progress>
            <h6 className={`${classes['day-progress__label']}`}>Fri</h6>
          </li>
          <li className={`${classes['cost-analysis__item']}`}>
            {/* <progress className={`${classes['day-progress']}`} value="900" max="1000"></progress> */}
            <progress className={`${classes['day-progress']}`} value={`${spending['Sat']}`} max="1050"></progress>
            <h6 className={`${classes['day-progress__label']}`}>Sat</h6>
          </li>
          <li className={`${classes['cost-analysis__item']}`}>
            {/* <progress className={`${classes['day-progress']}`} value="400" max="1000"></progress> */}
            <progress className={`${classes['day-progress']}`} value={`${spending['Sun']}`} max="1050"></progress>
            <h6 className={`${classes['day-progress__label']}`}>Sun</h6>
          </li>
        </ul>
        <div className={`${classes['cost-analysis__values']}`}>
          <ul className={`${classes['cost-values__list']}`}>
            <li className={`${classes['cost-values__item']}`}>₴1000 &gt;</li>
            <li className={`${classes['cost-values__item']}`}>₴800</li>
            <li className={`${classes['cost-values__item']}`}>₴600</li>
            <li className={`${classes['cost-values__item']}`}>₴400</li>
            <li className={`${classes['cost-values__item']}`}>₴200</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CostAnalysis;