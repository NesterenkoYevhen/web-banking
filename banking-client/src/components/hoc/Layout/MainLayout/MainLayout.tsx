import classes from './MainLayout.module.scss';

import { Outlet } from 'react-router-dom';

import Footer from '../../Footer/Footer';
import HeaderMain from '../../Header/HeaderMain/HeaderMain';

const MainLayout = () => {
  return (
    <>
      <div className={`${classes['main-layout-wrapper']} d-flex`}>
        <HeaderMain />
        <main className={`${classes['main-layout__main']}`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
