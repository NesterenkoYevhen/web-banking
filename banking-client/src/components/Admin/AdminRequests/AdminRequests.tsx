import classes from './AdminRequests.module.scss';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';

import { IReplenishmentAdmin } from '../../../types/replenishmentAdmin';
import { IRootState, useFetchReplenishmentsQuery } from '../../../store';
import getDateRange from '../../../helpers/getDateRange';
import { PERIOD_OPTIONS } from '../../../constants';
import { IOption } from '../../../types/option';

import HeaderSecondary from '../../hoc/Header/HeaderSecondary/HeaderSecondary';
import Dropdown from '../../../common/Dropdown/Dropdown';
import Request from './components/Request/Request';
import Loader from '../../../common/Loader/Loader';

const AdminRequests = () => {
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });
  const { data: replenishments, isFetching: isFetchingReplenishments } =
    useFetchReplenishmentsQuery();

  const [filterOption, setFilterOption] = useState('ALL');
  const [period, setPeriod] = useState<IOption>(PERIOD_OPTIONS[0]);
  const [query, setQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState<
    IReplenishmentAdmin[]
  >([]);

  useEffect(() => {
    const search = (data: IReplenishmentAdmin[]) =>
      data.filter((item) => {
        return (
          item.user.name.toLowerCase().includes(query.toLowerCase()) ||
          item.user.surname.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase())
        );
      });

    const filterTransactionsByDateRange = (
      replenishments: IReplenishmentAdmin[]
    ) => {
      const endDate = new Date();
      const startDate = new Date(
        endDate.getTime() - +period.value * 24 * 60 * 60 * 1000
      );

      return replenishments.filter((transaction) => {
        return (
          new Date(transaction.date) >= startDate &&
          new Date(transaction.date) <= endDate
        );
      });
    };

    setFilteredRequests(
      filterTransactionsByDateRange(search(replenishments || []))
    );
  }, [query, replenishments, period]);

  const handleSelectPeriod = (option: IOption) => {
    setPeriod(option);
  };

  const replenishmentsRows = filteredRequests?.map((replenishment) => {
    return (
      <Request
        id={replenishment.id}
        user={replenishment.user}
        card={replenishment.card}
        amount={replenishment.amount}
        approved={replenishment.approved}
        date={replenishment.date}
        key={replenishment.id}
      />
    );
  });

  return (
    <div className={`${classes['requests']}`}>
      {isFetchingReplenishments && <Loader />}
      <HeaderSecondary
        title="Requests"
        name={userInfo.name}
        surname={userInfo.surname}
        gender={userInfo.gender}
      />
      <div className={`${classes['requests__container']}`}>
        <div
          className={`${classes['requests__controls']} d-flex justify-content-between align-items-center`}
        >
          <ul className={`${classes['requests__filters']} d-flex`}>
            <li className={`${classes['requests__filter']}`}>
              <input
                className={`${classes['requests__filter--radio']}`}
                type="radio"
                value="ALL"
                id="all"
                name="requests-filter-option"
                checked={filterOption === 'ALL'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['requests__filter--label']}`}
                htmlFor="all"
              >
                All
              </label>
            </li>
            <li className={`${classes['requests__filter']}`}>
              <input
                className={`${classes['requests__filter--radio']}`}
                type="radio"
                value="APPROVED"
                id="approved"
                name="requests-filter-option"
                checked={filterOption === 'APPROVED'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['requests__filter--label']}`}
                htmlFor="approved"
              >
                Approved
              </label>
            </li>
            <li className={`${classes['requests__filter']}`}>
              <input
                className={`${classes['requests__filter--radio']}`}
                type="radio"
                value="DECLINED"
                id="declined"
                name="requests-filter-option"
                checked={filterOption === 'DECLINED'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['requests__filter--label']}`}
                htmlFor="declined"
              >
                Declined
              </label>
            </li>
            <li className={`${classes['requests__filter']}`}>
              <input
                className={`${classes['requests__filter--radio']}`}
                type="radio"
                value="NEW"
                id="new"
                name="requests-filter-option"
                checked={filterOption === 'NEW'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['requests__filter--label']}`}
                htmlFor="new"
              >
                New
              </label>
            </li>
          </ul>
          <div
            className={`${classes['requests__search']} d-flex align-items-center`}
          >
            <label
              className={`${classes['requests__search--label']}`}
              htmlFor="search"
            >
              <MdSearch />
            </label>
            <input
              className={`${classes['requests__search--input']}`}
              type="text"
              id="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={`${classes['requests__period']}`}>
            <Dropdown
              icon={<AiOutlineCalendar />}
              options={PERIOD_OPTIONS}
              value={period}
              onChange={handleSelectPeriod}
              dropdownClasses={`${classes['requests__period--select']}`}
            />
          </div>
          <div className={`${classes['requests__selected-period']}`}>
            <span>{getDateRange(+period.value)}</span>
          </div>
        </div>
        <table className={`${classes['requests-table']}`}>
          <thead>
            <tr className={`${classes['requests-table__header']}`}>
              <th
                className={`${classes['requests-table__title']} ${classes['requests-table__title--user']}`}
              >
                <div>User</div>
              </th>
              <th
                className={`${classes['requests-table__title']} ${classes['requests-table__title--amount']}`}
              >
                <div>Amount</div>
              </th>
              <th
                className={`${classes['requests-table__title']} ${classes['requests-table__title--date']}`}
              >
                <div>Date</div>
              </th>
              <th
                className={`${classes['requests-table__title']} ${classes['requests-table__title--id']}`}
              >
                <div>ID</div>
              </th>
              <th
                className={`${classes['requests-table__title']} ${classes['requests-table__title--status']}`}
              >
                <div>Status</div>
              </th>
              <th
                className={`${classes['requests-table__title']} ${classes['requests-table__title--action']}`}
              >
                <div>Action</div>
              </th>
            </tr>
          </thead>
          <tbody>{replenishmentsRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequests;
