import classes from './Modal.module.scss';

import ReactDOM from 'react-dom';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { BiCheck } from 'react-icons/bi';

import calculateDate from '../../../../helpers/calculateDate';
import { IError } from '../../../../types/error';

import Button from '../../../../common/Button/Button';

interface IModalComponent {
  onClose: any;
  date: Date;
  name: string;
  amount: number;
  isSuccessTransfer: boolean;
  errorsResponse?: {
    status: number;
    data: {
      errors: IError[]
    }
  };
}

const Modal: FC<IModalComponent> = ({
  onClose,
  date,
  name,
  amount,
  isSuccessTransfer,
  errorsResponse
}) => {
  const { month, day, year, time } = calculateDate(date);
  useEffect(() => {
    document.body.classList.add(classes['overflow-hidden']);

    return () => {
      document.body.classList.remove(classes['overflow-hidden']);
    };
  }, []);
  const navigate = useNavigate();

  const onNavTransactions = () => {
    onClose();
    navigate('/history');
  };

  const onNavHome = () => {
    onClose();
    navigate('/home');
  };

  return ReactDOM.createPortal(
    <div className={`${classes['modal']}`}>
      <div onClick={onClose} className={`${classes['modal__bg']}`}></div>
      <div className={`${classes['modal__container']}`}>
        <div className={`${classes['modal__info']}`}>
          <div className={`${classes['tranfer-end__close']} d-flex`}>
            <button
              onClick={onClose}
              className={`${classes['tranfer-end__close--btn']}`}
            >
              <RxCross1 />
            </button>
          </div>
          <div className={`d-flex justify-content-center`}>
            <div className={`${classes['tranfer-end__container']}`}>
              <div
                className={`${classes['tranfer-end__icon']} d-flex justify-content-center`}
              >
                <div>
                  <div
                    className={`${classes['tranfer-end__icon--circle']}`}
                  ></div>
                  {isSuccessTransfer ? <BiCheck /> : <RxCross1 />}
                </div>
              </div>
              <div className={`${classes['tranfer-end__title']}`}>
                <h3 className={`title title--h3 text-center`}>
                  {isSuccessTransfer ? 'Success' : 'Rejected'}
                </h3>
              </div>
              {isSuccessTransfer && (
                <ul
                  className={`${classes['transfer-end-info']} d-flex justify-content-between`}
                >
                  <li className={`${classes['transfer-end-info__item']}`}>
                    <h4 className={`${classes['transfer-end-info__title']}`}>
                      Date & Time:
                    </h4>
                    <h5
                      className={`title title--h5 ${classes['transfer-end-info__subtitle']}`}
                    >{`${month} ${day}, ${year} ${time}`}</h5>
                  </li>
                  <li className={`${classes['transfer-end-info__item']}`}>
                    <h4 className={`${classes['transfer-end-info__title']}`}>
                      Recipient:
                    </h4>
                    <h5
                      className={`title title--h5 ${classes['transfer-end-info__subtitle']}`}
                    >
                      {name}
                    </h5>
                  </li>
                  <li className={`${classes['transfer-end-info__item']}`}>
                    <h4 className={`${classes['transfer-end-info__title']}`}>
                      Amount:
                    </h4>
                    <h5
                      className={`title title--h5 ${classes['transfer-end-info__subtitle']}`}
                    >
                      {amount} UAH
                    </h5>
                  </li>
                </ul>
              )}
              {
                !isSuccessTransfer && (
                  errorsResponse!.data.errors.map((err, i) => {
                    return <p key={i} className={`${classes['tranfer-end__errors']} text text--main text-center`}>{err?.field ? `Field: ${err.field}. Error: ${err.message}`: `Error: ${err.message}`}</p>;
                  })
                )
              }

              <div
                className={`${classes['tranfer-end__controls']} d-flex justify-content-between`}
              >
                <div className={`${classes['tranfer-end__control']}`}>
                  <Button primary onClick={onNavTransactions}>
                    See all transactions
                  </Button>
                </div>
                <div className={`${classes['tranfer-end__control']}`}>
                  <Button secondary onClick={onNavHome}>
                    Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container') as HTMLElement
  );
};

export default Modal;
