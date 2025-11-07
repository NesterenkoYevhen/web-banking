import classes from './AdminUsers.module.scss';

import { MdSearch } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { IUser } from '../../../types/user';
import { IRootState, useFetchUsersQuery } from '../../../store';

import HeaderSecondary from '../../hoc/Header/HeaderSecondary/HeaderSecondary';
import User from './components/User/User';
import Loader from '../../../common/Loader/Loader';

const AdminUsers = () => {
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });
  const { data: users, isFetching: isFetchingUsers } = useFetchUsersQuery();

  const [filterOption, setFilterOption] = useState('ALL');
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const search = (data: IUser[]) =>
      data.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.surname.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase())
        );
      });
    
      const filter = (data: IUser[]) => {
        switch (filterOption) {
          case 'MALE':
            return data.filter((item) => item.gender === 'MALE');
          case 'FEMALE':
            return data.filter((item) => item.gender === 'FEMALE');
          default:
            return data;
        }
      };

    setFilteredUsers(filter(search(users || [])));
  }, [query, users, filterOption]);

  const usersRows = filteredUsers?.map((user) => {
    return (
      <User
        id={user.id}
        name={user.name}
        surname={user.surname}
        email={user.email}
        age={user.age}
        gender={user.gender}
        key={user.id}
      />
    );
  });

  return (
    <div className={`${classes['users']}`}>
      {isFetchingUsers && <Loader />}
      <HeaderSecondary
        title="Users"
        name={userInfo.name}
        surname={userInfo.surname}
        gender={userInfo.gender}
      />

      <div className={`${classes['users__container']}`}>
        <div
          className={`${classes['users__controls']} d-flex justify-content-between align-items-center`}
        >
          <ul className={`${classes['users__filters']} d-flex`}>
            <li className={`${classes['users__filter']}`}>
              <input
                className={`${classes['users__filter--radio']}`}
                type="radio"
                value="ALL"
                id="all"
                name="users-filter-option"
                checked={filterOption === 'ALL'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['users__filter--label']}`}
                htmlFor="all"
              >
                All
              </label>
            </li>
            <li className={`${classes['users__filter']}`}>
              <input
                className={`${classes['users__filter--radio']}`}
                type="radio"
                value="MALE"
                id="male"
                name="users-filter-option"
                checked={filterOption === 'MALE'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['users__filter--label']}`}
                htmlFor="male"
              >
                Male
              </label>
            </li>
            <li className={`${classes['users__filter']}`}>
              <input
                className={`${classes['users__filter--radio']}`}
                type="radio"
                value="FEMALE"
                id="female"
                name="users-filter-option"
                checked={filterOption === 'FEMALE'}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <label
                className={`${classes['users__filter--label']}`}
                htmlFor="female"
              >
                Female
              </label>
            </li>
          </ul>
          <div
            className={`${classes['users__search']} d-flex align-items-center`}
          >
            <label
              className={`${classes['users__search--label']}`}
              htmlFor="search"
            >
              <MdSearch />
            </label>
            <input
              className={`${classes['users__search--input']}`}
              type="text"
              id="search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <table className={`${classes['users-table']}`}>
          <thead>
            <tr className={`${classes['users-table__header']}`}>
              <th
                className={`${classes['users-table__title']} ${classes['users-table__title--id']}`}
              >
                <div>ID</div>
              </th>
              <th
                className={`${classes['users-table__title']} ${classes['users-table__title--name']}`}
              >
                <div>Name</div>
              </th>
              <th
                className={`${classes['users-table__title']} ${classes['users-table__title--surname']}`}
              >
                <div>Surname</div>
              </th>
              <th
                className={`${classes['users-table__title']} ${classes['users-table__title--email']}`}
              >
                <div>Email</div>
              </th>
              <th
                className={`${classes['users-table__title']} ${classes['users-table__title--age']}`}
              >
                <div>Age</div>
              </th>
              <th
                className={`${classes['users-table__title']} ${classes['users-table__title--gender']}`}
              >
                <div>Gender</div>
              </th>
            </tr>
          </thead>
          <tbody>{usersRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
