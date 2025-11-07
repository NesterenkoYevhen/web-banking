import classes from './HeaderSecondary.module.scss';

import { FC } from 'react';
import { MdSearch } from 'react-icons/md';
import { BsChatDots } from 'react-icons/bs';

import manAvatar from '../../../../assets/man.png';
import womanAvatar from '../../../../assets/woman.png';

interface ISecondaryHeaderComponent {
  title: string;
  name: string;
  surname: string;
  gender: string;
}

const HeaderSecondary: FC<ISecondaryHeaderComponent> = ({
  title,
  name,
  surname,
  gender,
}) => {
  return (
    <div
      className={`${classes['header-secondary']} d-flex justify-content-between align-items-center`}
    >
      <h1 className={`title title--h1`}>{title}</h1>

      <div className={`${classes['header-secondary__info']}`}>
        <ul className={`${classes['header-secondary__info-list']} d-flex`}>
          <li
            className={`${classes['header-secondary__info-item']} ${classes['header-secondary__link']}`}
          >
            <a
              className={`d-flex justify-content-center align-items-center`}
              href="/"
            >
              <MdSearch />
            </a>
          </li>
          <li
            className={`${classes['header-secondary__info-item']} ${classes['header-secondary__link']}`}
          >
            <a
              className={`d-flex justify-content-center align-items-center`}
              href="/"
            >
              <BsChatDots />
            </a>
          </li>
          <li
            className={`${classes['header-secondary__info-item']} d-flex align-items-center`}
          >
            <img
              className={`${classes['header-secondary__avatar']}`}
              src={gender === 'MALE' ? manAvatar : womanAvatar}
              alt="avatar"
            />
            <h5
              className={`${classes['header-secondary__user-name']} title title--h5`}
            >{`${name} ${surname}`}</h5>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderSecondary;
