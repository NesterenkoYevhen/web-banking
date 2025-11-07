import classes from './AdminLayout.module.scss';

import { Outlet } from 'react-router-dom';

import Footer from '../../Footer/Footer';
import HeaderAdmin from '../../Header/HeaderAdmin/HeaderAdmin';

const AdminLayout = () => {
  return (
    <>
      <div className={`${classes['main-layout-wrapper']} d-flex`}>
        <HeaderAdmin />
        <main className={`${classes['main-layout__main']}`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
