import Button from '../../common/Button/Button';
import classes from './NotFound.module.scss';

import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

	const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  return (
    <div className={`${classes['not-found']}`}>
      <h5 className={`${classes['not-found__secondary-title']}`}>Page not found!</h5>
      <h1 className={`${classes['not-found__title']} title title--h1`}>Error 404</h1>
      <p className={`${classes['not-found__text']} text text--main`}>It looks like the page you were trying to access doesn't exist. This may be because the page has been moved or deleted</p>
      <div className={`${classes['not-found__btns']} d-flex`}>
        <div className={`${classes['not-found__btn']}`}>
          <Button secondary className={`d-flex align-items-center justify-content-center`} onClick={goBack}><MdArrowBackIosNew /> Go back</Button>
        </div>
        <div className={`${classes['not-found__btn']}`}>
          <Button primary onClick={goHome}>Go to home page</Button>
        </div>
      </div>
    </div>
  )
};

export default NotFound;