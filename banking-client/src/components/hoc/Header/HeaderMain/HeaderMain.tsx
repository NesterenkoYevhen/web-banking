import classes from './HeaderMain.module.scss';

import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineHome } from 'react-icons/md';
import { BsGrid, BsChatLeft, BsCreditCard } from 'react-icons/bs';
import { FiTrendingUp, FiLogOut } from 'react-icons/fi';

import { useThunk } from '../../../../hooks/use-thunk';
import { IRootState, logoutUser } from '../../../../store';
import { cardsApi } from '../../../../store/apis/cardsApi';
import { transactionsApi } from '../../../../store/apis/transactionsApi';

import logo from '../../../../assets/logo-main.svg';

import Button from '../../../../common/Button/Button';

const HeaderMain = () => {
  const [doLogoutUser] = useThunk(logoutUser);
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo.isAuth) {
      navigate('/login');
    }
  }, [userInfo.isAuth, navigate]);

  const onLogout = () => {
    dispatch(cardsApi.util.resetApiState());
    dispatch(transactionsApi.util.resetApiState());
    doLogoutUser();
  };

  return (
    <header
      className={`${classes['header-main']} d-flex flex-column align-items-center`}
    >
      <a className={`${classes['header-main__logo']}`} href="/">
        <img className={`${classes['logo__img']}`} src={logo} alt="logo" />
        <h6
          className={`${classes['logo__text']} text text--small-regular text-center`}
        >
          WEB
        </h6>
      </a>

      <nav className={`${classes['header-main__nav']}`}>
        <ul className={`${classes['header-main__nav-list']}`}>
          <li className={`${classes['header-main__nav-list--item']}`}>
            <NavLink
              to="/home"
              className={(navData) =>
                navData.isActive
                  ? `${classes['header-main__link']} ${classes['header-main__link--active']}`
                  : `${classes['header-main__link']}`
              }
            >
              <MdOutlineHome />
            </NavLink>
          </li>
          <li className={`${classes['header-main__nav-list--item']}`}>
            <NavLink
              to="/createcard"
              className={(navData) =>
                navData.isActive
                  ? `${classes['header-main__link']} ${classes['header-main__link--active']}`
                  : `${classes['header-main__link']}`
              }
            >
              <BsGrid />
            </NavLink>
          </li>
          <li className={`${classes['header-main__nav-list--item']}`}>
            <NavLink
              to="/transfer"
              className={(navData) =>
                navData.isActive
                  ? `${classes['header-main__link']} ${classes['header-main__link--active']}`
                  : `${classes['header-main__link']}`
              }
            >
              <BsCreditCard />
            </NavLink>
          </li>
          <li className={`${classes['header-main__nav-list--item']}`}>
            <NavLink
              to="/chat"
              className={(navData) =>
                navData.isActive
                  ? `${classes['header-main__link']} ${classes['header-main__link--active']}`
                  : `${classes['header-main__link']}`
              }
            >
              <BsChatLeft />
            </NavLink>
          </li>
          <li className={`${classes['header-main__nav-list--item']}`}>
            <NavLink
              to="/history"
              className={(navData) =>
                navData.isActive
                  ? `${classes['header-main__link']} ${classes['header-main__link--active']}`
                  : `${classes['header-main__link']}`
              }
            >
              <FiTrendingUp />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`${classes['header-main__logout']}`}>
        <Button
          className={`${classes['header-main__link']}`}
          onClick={onLogout}
        >
          <FiLogOut />
        </Button>
      </div>
    </header>
  );
};

export default HeaderMain;
