import classes from './Error.module.scss';

import { MdArrowBackIosNew } from 'react-icons/md';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IError } from '../../types/error';

import Button from '../../common/Button/Button';

export interface IErrorsComponent {
  errorsResponse: {
    status: number;
    data: {
      errors: IError[]
    }
  };
}

const Error: FC<IErrorsComponent> = ({ errorsResponse }) => {

  const content = errorsResponse.data.errors.map((err, i) => {
    return <p key={i} className={`${classes['error__text']} text text--main`}>{err?.field ? `Field: ${err.field}. Error: ${err.message}`: `Error: ${err.message}`}</p>;
  });
  const navigate = useNavigate();

	const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  return (
    <div className={`${classes['error']}`}>
      <h5 className={`${classes['error__secondary-title']}`}>Something went wrong!</h5>
      <h1 className={`${classes['error__title']} title title--h1`}>Error {errorsResponse.status}</h1>
      {content}
      <div className={`${classes['error__btns']} d-flex`}>
        <div className={`${classes['error__btn']}`}>
          <Button secondary className={`d-flex align-items-center justify-content-center`} onClick={goBack}><MdArrowBackIosNew /> Go back</Button>
        </div>
        <div className={`${classes['error__btn']}`}>
          <Button primary onClick={goHome}>Go to home page</Button>
        </div>
      </div>
    </div>
  )
};

export default Error;
