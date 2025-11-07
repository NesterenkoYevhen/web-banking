import classes from './History.module.scss';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

import { IRootState, useFetchTransactionsQuery } from '../../store';
import { ITransaction } from '../../types/transaction';
import calculateDate from '../../helpers/calculateDate';
import cutCardNumber from '../../helpers/cutCardNumber';
import getDateRange from '../../helpers/getDateRange';
import { IOption } from '../../types/option';
import { PERIOD_OPTIONS } from '../../constants';

import HeaderSecondary from '../hoc/Header/HeaderSecondary/HeaderSecondary';
import Dropdown from '../../common/Dropdown/Dropdown';
import Loader from '../../common/Loader/Loader';

const History = () => {
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  const { data: transactions, isFetching: isFetchingTransactions } =
    useFetchTransactionsQuery();

  const [filterOption, setFilterOption] = useState('ALL');
  const [period, setPeriod] = useState<IOption>(PERIOD_OPTIONS[0]);
  const [query, setQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);

  const handleSelectPeriod = (option: IOption) => {
    setPeriod(option);
  };

  useEffect(() => {
    const search = (data: ITransaction[]) =>
      data.filter((item) => {
        if (item.type === 'REPLENISHMENT') {
          return String(item.card.number).includes(query);
        } else if (item.type === 'TRANSFER_SENDER') {
          return (
            item.recepientName?.toLowerCase().includes(query.toLowerCase()) ||
            String(item.recepientCardNumber)
              ?.toLowerCase()
              .includes(query.toLowerCase()) ||
            String(item.card.number).includes(query.toLowerCase())
          );
        } else {
          return (
            item.senderName?.toLowerCase().includes(query.toLowerCase()) ||
            String(item.senderCardNumber)
              ?.toLowerCase()
              .includes(query.toLowerCase()) ||
            String(item.card.number).includes(query.toLowerCase())
          );
        }
      });
    const filter = (data: ITransaction[]) => {
      switch (filterOption) {
        case 'RECEIVED':
          return data.filter(
            (item) =>
              item.type === 'REPLENISHMENT' ||
              item.type === 'TRANSFER_RECEPIENT'
          );
        case 'TOP-UP':
          return data.filter((item) => item.type === 'REPLENISHMENT');
        case 'TRANSFER':
          return data.filter((item) => item.type !== 'REPLENISHMENT');
        case 'REJECTED':
          return data.filter((item) => item.status === 'REJECTED');
        default:
          return data;
      }
    };

    const filterTransactionsByDateRange = (transactions: ITransaction[]) => {
      const endDate = new Date();
      const startDate = new Date(
        endDate.getTime() - +period.value * 24 * 60 * 60 * 1000
      );

      return transactions.filter((transaction) => {
        return (
          new Date(transaction.date) >= startDate &&
          new Date(transaction.date) <= endDate
        );
      });
    };

    setFilteredTransactions(
      filterTransactionsByDateRange(filter(search(transactions || [])))
    );
  }, [query, transactions, filterOption, period]);

  const transactionsRows = filteredTransactions?.reverse().map(
    (transaction: ITransaction) => {
      const { month, day, year, time } = calculateDate(
        new Date(transaction.date)
      );

      return (
        <tr className={`${classes['history-table__row']}`} key={transaction.id}>
          <td
            className={`${classes['history-table__item']} d-flex align-items-center`}
          >
            <div className={`${classes['history-table__logo']}`}>
              {transaction.type === 'TRANSFER_SENDER' ? (
                <GiPayMoney />
              ) : (
                <GiReceiveMoney />
              )}
            </div>

            <div className={`${classes['history-table__transaction-info']}`}>
              <h5 className={`${classes['history-table__main-text']}`}>
                {transaction.type === 'REPLENISHMENT'
                  ? `Top up`
                  : `${
                      transaction.type === 'TRANSFER_SENDER'
                        ? `To ${transaction?.recepientName} ${cutCardNumber(
                            String(transaction?.recepientCardNumber)
                          )}`
                        : `From ${transaction?.senderName} ${cutCardNumber(
                            String(transaction?.senderCardNumber)
                          )}`
                    }`}
              </h5>
              <h6 className={`${classes['history-table__secondary-text']}`}>
                {transaction.type === 'REPLENISHMENT'
                  ? `${cutCardNumber(String(transaction.card.number))}`
                  : `Card ${
                      transaction.type === 'TRANSFER_SENDER'
                        ? `${cutCardNumber(String(transaction?.card.number))}`
                        : `${cutCardNumber(String(transaction?.card.number))}`
                    }`}
              </h6>
            </div>
          </td>
          <td className={`${classes['history-table__item']}`}>
            <h5 className={`${classes['history-table__main-text']}`}>
              {`${day} ${month} ${year}`}
            </h5>
            <h6 className={`${classes['history-table__secondary-text']}`}>
              At {time}
            </h6>
          </td>
          <td className={`${classes['history-table__item']}`}>
            {transaction.type === 'REPLENISHMENT'
              ? `+ ${transaction.amount.toFixed(2)}`
              : `${transaction.type === 'TRANSFER_SENDER' ? '-' : '+'} ${
                  transaction.amount.toFixed(2)
                }`}{' '}
            UAH
          </td>
          <td className={`${classes['history-table__item']}`}>
            <div className={`d-flex align-items-center`}>
              <div
                className={`${classes['history-table__status']} ${
                  transaction.status === 'CONDUCTED'
                    ? classes['history-table__status--conducted']
                    : classes['history-table__status--rejected']
                }`}
              ></div>
              <h5 className={`${classes['history-table__main-text']}`}>
                {transaction.status === 'CONDUCTED' ? 'Conducted' : 'Rejected'}
              </h5>
            </div>
          </td>
          <td className={`${classes['history-table__item']}`}>
            <button className={`${classes['history-table__download']}`}>
              Download
            </button>
          </td>
        </tr>
      );
    }
  );

  return (
    <div className={`${classes['history']}`}>
      {isFetchingTransactions && <Loader />}
      <HeaderSecondary
        title="History"
        name={userInfo.name}
        surname={userInfo.surname}
        gender={userInfo.gender}
      />
      <div className={`${classes['history__container']}`}>
        <div
          className={`${classes['history__controls']} d-flex justify-content-between align-items-center`}
        >
          <ul className={`${classes['history__filters']} d-flex`}>
            <li className={`${classes['history__filter']}`}>
              <input
                className={`${classes['history__filter--radio']}`}
                type="radio"
                value="ALL"
                id="all"
                name="history-filter-option"
                checked={filterOption === 'ALL'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['history__filter--label']}`}
                htmlFor="all"
              >
                All
              </label>
            </li>
            <li className={`${classes['history__filter']}`}>
              <input
                className={`${classes['history__filter--radio']}`}
                type="radio"
                value="RECEIVED"
                id="received"
                name="history-filter-option"
                checked={filterOption === 'RECEIVED'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['history__filter--label']}`}
                htmlFor="received"
              >
                Received
              </label>
            </li>
            <li className={`${classes['history__filter']}`}>
              <input
                className={`${classes['history__filter--radio']}`}
                type="radio"
                value="TOP-UP"
                id="top-up"
                name="history-filter-option"
                checked={filterOption === 'TOP-UP'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['history__filter--label']}`}
                htmlFor="top-up"
              >
                Top up
              </label>
            </li>
            <li className={`${classes['history__filter']}`}>
              <input
                className={`${classes['history__filter--radio']}`}
                type="radio"
                value="TRANSFER"
                id="transfer"
                name="history-filter-option"
                checked={filterOption === 'TRANSFER'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['history__filter--label']}`}
                htmlFor="transfer"
              >
                Transfer
              </label>
            </li>
            <li className={`${classes['history__filter']}`}>
              <input
                className={`${classes['history__filter--radio']}`}
                type="radio"
                value="REJECTED"
                id="rejected"
                name="history-filter-option"
                checked={filterOption === 'REJECTED'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['history__filter--label']}`}
                htmlFor="rejected"
              >
                Rejected
              </label>
            </li>
          </ul>
          <div
            className={`${classes['history__search']} d-flex align-items-center`}
          >
            <label
              className={`${classes['history__search--label']}`}
              htmlFor="search"
            >
              <MdSearch />
            </label>
            <input
              className={`${classes['history__search--input']}`}
              type="text"
              id="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={`${classes['history__period']}`}>
            <Dropdown
              icon={<AiOutlineCalendar />}
              options={PERIOD_OPTIONS}
              value={period}
              onChange={handleSelectPeriod}
              dropdownClasses={`${classes['history__period--select']}`}
            />
          </div>
          <div className={`${classes['history__selected-period']}`}>
            <span>{getDateRange(+period.value)}</span>
          </div>
        </div>
        <table className={`${classes['history-table']}`}>
          <thead>
            <tr className={`${classes['history-table__header']}`}>
              <th className={`${classes['history-table__title']}`}>
                Recepient
              </th>
              <th className={`${classes['history-table__title']}`}>Date</th>
              <th className={`${classes['history-table__title']}`}>Amount</th>
              <th className={`${classes['history-table__title']}`}>Status</th>
              <th className={`${classes['history-table__title']}`}>Action</th>
            </tr>
          </thead>
          <tbody>{transactionsRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
