import classes from './Request.module.scss';

import { FC } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsCheck2 } from 'react-icons/bs';

import manAvatar from '../../../../../assets/man.png';
import womanAvatar from '../../../../../assets/woman.png';

import cutId from '../../../../../helpers/cutId';
import { IUser } from '../../../../../types/user';
import { ICreditCard } from '../../../../../types/credit-card';
import calculateDate from '../../../../../helpers/calculateDate';
import { useUpdateReplenishmentMutation } from '../../../../../store';

import Loader from '../../../../../common/Loader/Loader';

interface IRequestComponent {
  id: string;
  user: IUser;
  card: ICreditCard;
  amount: number;
  approved: boolean;
  date: Date;
}

const Request: FC<IRequestComponent> = ({ id, user, card, amount, date }) => {
  const [updateReplenishment, resultsUpdateReplenishment] =
    useUpdateReplenishmentMutation();
  const { month, day, year, time } = calculateDate(new Date(date));

  const onApprove = () => {
    updateReplenishment({
      id,
      approved: true,
    });
  };

  const onReject = () => {
    updateReplenishment({
      id,
      approved: false,
    });
  };

  return (
    <tr className={`${classes['request']}`}>
      {resultsUpdateReplenishment.isLoading && <Loader />}
      <td className={`${classes['request__field']}`}>
        <div className={`${classes['user']} d-flex align-items-center`}>
          <img
            className={`${classes['user__logo']}`}
            src={user.gender === 'MALE' ? manAvatar : womanAvatar}
            alt="user-logo"
          />
          <h6
            className={`text text--secondary`}
          >{`${user.name} ${user.surname}`}</h6>
        </div>
      </td>
      <td className={`${classes['request__field']} ${classes['amount']}`}>
        <h6 className={`text text--secondary`}>{amount.toFixed(2)} UAH</h6>
      </td>
      <td className={`${classes['request__field']}`}>
        <div className={`${classes['date']}`}>
          <h5
            className={`${classes['date__main-text']}`}
          >{`${day} ${month} ${year}`}</h5>
          <h6 className={`${classes['date__secondary-text']}`}>At {time}</h6>
        </div>
      </td>
      <td className={`${classes['request__field']} ${classes['id']}`}>
        <h6 className={`text text--secondary`}>{cutId(id.toUpperCase())}</h6>
      </td>
      <td className={`${classes['request__field']} ${classes['status']}`}>
        <div className={`d-flex align-items-center justify-content-center`}>
          <div
            className={`${classes['status__circle']} ${classes['status__circle--waiting']}`}
          ></div>
          <h5 className={`${classes['status__text']}`}>Waiting</h5>
        </div>
      </td>
      <td className={`${classes['request__field']} ${classes['action']}`}>
        <div className={`d-flex align-items-center justify-content-center`}>
          <button
            className={`${classes['action__confirm']}`}
            onClick={onApprove}
          >
            <BsCheck2 />
          </button>
          <button className={`${classes['action__reject']}`} onClick={onReject}>
            <RxCross1 />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Request;
