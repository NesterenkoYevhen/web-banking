import classes from './HeaderAuth.module.scss';

import { MdSearch } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { BsChatDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import logo from '../../../..//assets/logo-auth.svg';

const HeaderAuth = () => {
  return (
    <header className={`${classes['header-auth']}`}>
      <div
        className={`container d-flex justify-content-between align-items-center`}
      >
        <div className={`d-flex align-items-center`}>
          <a className={`${classes['header-auth__logo']}`} href="/">
            <img className={`${classes['logo__img']}`} src={logo} alt="logo" />
            <h6 className={`text text--small-regular text-center`}>WEB</h6>
          </a>
          <h6
            className={`text text--small-regular ${classes['header-auth__title']}`}
          >
            Wave Electronic Banking
          </h6>
        </div>
        <nav className={`${classes['header-auth__not-auth-nav']}`}>
          <ul className={`${classes['not-auth-nav__list']} d-flex`}>
            <li
              className={`${classes['not-auth-nav__link']} ${classes['not-auth-nav__link--gray']}`}
            >
              <a
                className={`d-flex justify-content-center align-items-center`}
                href="/"
              >
                {<MdSearch />}
              </a>
            </li>
            <li
              className={`${classes['not-auth-nav__link']} ${classes['not-auth-nav__link--gray']}`}
            >
              <a
                className={`d-flex justify-content-center align-items-center`}
                href="/"
              >
                {<BsChatDots />}
              </a>
            </li>
            <li
              className={`${classes['not-auth-nav__link']} ${classes['not-auth-nav__link--yellow']}`}
            >
              <Link
                to="/login"
                className={`d-flex justify-content-between align-items-center`}
              >
                {<RiAccountCircleLine />}
                <span className={`text text--main`}>Log in</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderAuth;
