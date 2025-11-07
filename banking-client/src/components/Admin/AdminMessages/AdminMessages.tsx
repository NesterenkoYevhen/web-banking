import classes from './AdminMessages.module.scss';

import manAvatar from '../../../assets/man.png';
import womanAvatar from '../../../assets/woman.png';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';

import { IRootState } from '../../../store';
import { IOption } from '../../../types/option';
import { PERIOD_OPTIONS } from '../../../constants';

import HeaderSecondary from '../../hoc/Header/HeaderSecondary/HeaderSecondary';
import Dropdown from '../../../common/Dropdown/Dropdown';
import getDateRange from '../../../helpers/getDateRange';

import Button from '../../../common/Button/Button';

const AdminMessages = () => {
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  const [filterOption, setFilterOption] = useState('ALL');
  const [period, setPeriod] = useState<IOption>(PERIOD_OPTIONS[0]);
  const [query, setQuery] = useState('');

  const handleSelectPeriod = (option: IOption) => {
    setPeriod(option);
  };

  return (
    <div className={`${classes['messages']}`}>
      <HeaderSecondary
        title="Messages"
        name={userInfo.name}
        surname={userInfo.surname}
        gender={userInfo.gender}
      />
      <div className={`${classes['messages__container']}`}>
        <div
          className={`${classes['messages__controls']} d-flex justify-content-between align-items-center`}
        >
          <ul className={`${classes['messages__filters']} d-flex`}>
            <li className={`${classes['messages__filter']}`}>
              <input
                className={`${classes['messages__filter--radio']}`}
                type="radio"
                value="ALL"
                id="all"
                name="messages-filter-option"
                checked={filterOption === 'ALL'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['messages__filter--label']}`}
                htmlFor="all"
              >
                All
              </label>
            </li>
            <li className={`${classes['messages__filter']}`}>
              <input
                className={`${classes['messages__filter--radio']}`}
                type="radio"
                value="APPROVED"
                id="approved"
                name="messages-filter-option"
                checked={filterOption === 'APPROVED'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['messages__filter--label']}`}
                htmlFor="approved"
              >
                Approved
              </label>
            </li>
            <li className={`${classes['messages__filter']}`}>
              <input
                className={`${classes['messages__filter--radio']}`}
                type="radio"
                value="DECLINED"
                id="declined"
                name="messages-filter-option"
                checked={filterOption === 'DECLINED'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['messages__filter--label']}`}
                htmlFor="declined"
              >
                Declined
              </label>
            </li>
            <li className={`${classes['messages__filter']}`}>
              <input
                className={`${classes['messages__filter--radio']}`}
                type="radio"
                value="NEW"
                id="new"
                name="messages-filter-option"
                checked={filterOption === 'NEW'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['messages__filter--label']}`}
                htmlFor="new"
              >
                New
              </label>
            </li>
          </ul>
          <div
            className={`${classes['messages__search']} d-flex align-items-center`}
          >
            <label
              className={`${classes['messages__search--label']}`}
              htmlFor="search"
            >
              <MdSearch />
            </label>
            <input
              className={`${classes['messages__search--input']}`}
              type="text"
              id="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={`${classes['messages__period']}`}>
            <Dropdown
              icon={<AiOutlineCalendar />}
              options={PERIOD_OPTIONS}
              value={period}
              onChange={handleSelectPeriod}
              dropdownClasses={`${classes['messages__period--select']}`}
            />
          </div>
          <div className={`${classes['messages__selected-period']}`}>
            <span>{getDateRange(+period.value)}</span>
          </div>
        </div>
        <table className={`${classes['messages-table']}`}>
          <thead>
            <tr className={`${classes['messages-table__header']}`}>
              <th
                className={`${classes['messages-table__title']} ${classes['messages-table__title--user']}`}
              >
                <div>User</div>
              </th>

              <th
                className={`${classes['messages-table__title']} ${classes['messages-table__title--date']}`}
              >
                <div>Date</div>
              </th>
              <th
                className={`${classes['messages-table__title']} ${classes['messages-table__title--messages']}`}
              >
                <div>Messages</div>
              </th>

              <th
                className={`${classes['messages-table__title']} ${classes['messages-table__title--id']}`}
              >
                <div>ID</div>
              </th>
              <th
                className={`${classes['messages-table__title']} ${classes['messages-table__title--importance']}`}
              >
                <div>Importance</div>
              </th>
              <th
                className={`${classes['messages-table__title']} ${classes['messages-table__title--action']}`}
              >
                <div>Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={`${classes['user-messages']}`}>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['user']} d-flex align-items-center`}>
                  <img
                    className={`${classes['user__logo']}`}
                    src={manAvatar}
                    alt="user-logo"
                  />
                  <h6 className={`text text--secondary`}>Rachel Anderson</h6>
                </div>
              </td>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['date']}`}>
                  <h5 className={`${classes['date__main-text']}`}>
                    5 March 2023
                  </h5>
                  <h6 className={`${classes['date__secondary-text']}`}>
                    At 14:23
                  </h6>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['user-messages-amount']}`}
              >
                <h6 className={`text text--secondary`}>
                  4
                </h6>
              </td>
              
              <td className={`${classes['user-messages__field']} ${classes['id']}`}>
                <h6 className={`text text--secondary`}>ID123731</h6>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['importance']}`}
              >
                <div
                  className={`d-flex align-items-center justify-content-center`}
                >
                  <div
                    className={`${classes['importance__circle']} ${classes['importance__circle--moderate']}`}
                  ></div>
                  <h5 className={`${classes['importance__text']}`}>Waiting</h5>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['action']}`}
              >
                <div className={`${classes['action__btn']}`}>
                  <Button secondary>Read</Button>
                </div>
              </td>
            </tr>
            <tr className={`${classes['user-messages']}`}>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['user']} d-flex align-items-center`}>
                  <img
                    className={`${classes['user__logo']}`}
                    src={manAvatar}
                    alt="user-logo"
                  />
                  <h6 className={`text text--secondary`}>Alexander Hernandez</h6>
                </div>
              </td>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['date']}`}>
                  <h5 className={`${classes['date__main-text']}`}>
                    5 March 2023
                  </h5>
                  <h6 className={`${classes['date__secondary-text']}`}>
                    At 14:23
                  </h6>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['user-messages-amount']}`}
              >
                <h6 className={`text text--secondary`}>
                  1
                </h6>
              </td>
              
              <td className={`${classes['user-messages__field']} ${classes['id']}`}>
                <h6 className={`text text--secondary`}>ID123731</h6>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['importance']}`}
              >
                <div
                  className={`d-flex align-items-center justify-content-center`}
                >
                  <div
                    className={`${classes['importance__circle']} ${classes['importance__circle--low']}`}
                  ></div>
                  <h5 className={`${classes['importance__text']}`}>Low</h5>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['action']}`}
              >
                <div className={`${classes['action__btn']}`}>
                  <Button secondary>Read</Button>
                </div>
              </td>
            </tr>
            <tr className={`${classes['user-messages']}`}>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['user']} d-flex align-items-center`}>
                  <img
                    className={`${classes['user__logo']}`}
                    src={womanAvatar}
                    alt="user-logo"
                  />
                  <h6 className={`text text--secondary`}>Lily Davis</h6>
                </div>
              </td>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['date']}`}>
                  <h5 className={`${classes['date__main-text']}`}>
                    5 March 2023
                  </h5>
                  <h6 className={`${classes['date__secondary-text']}`}>
                    At 14:23
                  </h6>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['user-messages-amount']}`}
              >
                <h6 className={`text text--secondary`}>
                  5
                </h6>
              </td>
              
              <td className={`${classes['user-messages__field']} ${classes['id']}`}>
                <h6 className={`text text--secondary`}>ID123731</h6>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['importance']}`}
              >
                <div
                  className={`d-flex align-items-center justify-content-center`}
                >
                  <div
                    className={`${classes['importance__circle']} ${classes['importance__circle--high']}`}
                  ></div>
                  <h5 className={`${classes['importance__text']}`}>High</h5>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['action']}`}
              >
                <div className={`${classes['action__btn']}`}>
                  <Button primary>Reviewed</Button>
                </div>
              </td>
            </tr>
            <tr className={`${classes['user-messages']}`}>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['user']} d-flex align-items-center`}>
                  <img
                    className={`${classes['user__logo']}`}
                    src={womanAvatar}
                    alt="user-logo"
                  />
                  <h6 className={`text text--secondary`}>Yana Kovalenko</h6>
                </div>
              </td>
              <td className={`${classes['user-messages__field']}`}>
                <div className={`${classes['date']}`}>
                  <h5 className={`${classes['date__main-text']}`}>
                    5 March 2023
                  </h5>
                  <h6 className={`${classes['date__secondary-text']}`}>
                    At 14:23
                  </h6>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['user-messages-amount']}`}
              >
                <h6 className={`text text--secondary`}>
                  1
                </h6>
              </td>
              
              <td className={`${classes['user-messages__field']} ${classes['id']}`}>
                <h6 className={`text text--secondary`}>ID123731</h6>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['importance']}`}
              >
                <div
                  className={`d-flex align-items-center justify-content-center`}
                >
                  <div
                    className={`${classes['importance__circle']} ${classes['importance__circle--low']}`}
                  ></div>
                  <h5 className={`${classes['importance__text']}`}>Low</h5>
                </div>
              </td>
              <td
                className={`${classes['user-messages__field']} ${classes['action']}`}
              >
                <div className={`${classes['action__btn']}`}>
                  <Button secondary>Read</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessages;
