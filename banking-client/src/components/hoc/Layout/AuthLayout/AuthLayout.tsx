import classes from './AuthLayout.module.scss';

import { Outlet } from 'react-router-dom';

import HeaderAuth from '../../Header/HeaderAuth/HeaderAuth';
import Footer from '../../Footer/Footer';

const AuthLayout = () => {
  return (
    <div className={`${classes['auth-layout-wrapper']}`}>
      <HeaderAuth />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
