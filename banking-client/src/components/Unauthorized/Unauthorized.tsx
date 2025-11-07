import Button from '../../common/Button/Button';
import classes from './Unauthorized.module.scss';

import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goLogin = () => navigate('/login');

  return (
    <div className={`${classes['unuauthorized']}`}>
      <h5 className={`${classes['unuauthorized__secondary-title']}`}>Unauthorized</h5>
      <h1 className={`${classes['unuauthorized__title']} title title--h1`}>Error 401</h1>
      <p className={`${classes['unuauthorized__text']} text text--main`}>You do not have permission to access this page. The page requires authentication or your role does not give access to this page</p>
      <div className={`${classes['unuauthorized__btns']} d-flex`}>
        <div className={`${classes['unuauthorized__btn']}`}>
          <Button primary onClick={goLogin}>Log in</Button>
        </div>
      </div>
    </div>
  )
};

export default Unauthorized;
