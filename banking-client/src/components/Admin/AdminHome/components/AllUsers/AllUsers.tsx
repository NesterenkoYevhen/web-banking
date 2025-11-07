import classes from './AllUsers.module.scss';

import manAvatar from '../../../../../assets/man.png';
import womanAvatar from '../../../../../assets/woman.png';

import { Link } from 'react-router-dom';
import { FC } from 'react';
import { FiArrowUpLeft } from 'react-icons/fi';

import { IUser } from '../../../../../types/user';

import Button from '../../../../../common/Button/Button';

interface IAllUsersComponent {
  users: IUser[];
}

const AllUsers: FC<IAllUsersComponent> = ({ users }) => {
  const usersRendered = users.slice(0, 3).map(user => {
    return (
      <li className={`${classes['all-users__item']}`} key={user.id}>
        <img src={user.gender === 'MALE' ? manAvatar : womanAvatar} alt="user-logo-1" />
      </li>
    )
  })

  return (
    <div className={`${classes['all-users']}`}>
      <h3 className={`title title--h3`}>All Users</h3>
      {users.length > 0 ? (
        <>
          <div
            className={`${classes['all-users__container']} d-flex align-items-center`}
          >
            <ul className={`${classes['all-users__list']} d-flex`}>
              {usersRendered}
            </ul>
            <div className={`${classes['all-users__amount']}`}>
              { users.length - 3 > 0 && (
                <h5 className={`title title--h5`}>+ {users.length - 3}</h5>
              )}
              
            </div>
          </div>

          <div className={`${classes['all-users__btn']}`}>
            <Link to='/admin/users'>
              <Button primary>
                <div className="d-flex align-items-center justify-content-center">
                  <FiArrowUpLeft /> Check all users
                </div>
              </Button>
            </Link>
            
          </div>
        </>
      ) : (
        <div className={`text-center ${classes['all-users__empty']}`}>
          Users list are empty
        </div>
      )}
    </div>
  );
};

export default AllUsers;
