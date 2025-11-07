import classes from './User.module.scss';

import { FC } from 'react';

interface IUserComponent {
  id: string;
  name: string;
  surname: string;
  age: number;
  gender: string;
  email: string;
}

const User: FC<IUserComponent> = ({ id, name, surname, age, gender, email }) => {

  return (
    <tr className={`${classes['user']}`}>
      <td className={`${classes['user__field']} ${classes['id']}`}>
        <h6 className={`text text--secondary`}>{id}</h6>
      </td>
      <td className={`${classes['user__field']} ${classes['name']}`}>
        <h6 className={`text text--secondary`}>{name}</h6>
      </td>
      <td className={`${classes['user__field']} ${classes['surname']}`}>
        <h6 className={`text text--secondary`}>{surname}</h6>
      </td>
      <td className={`${classes['user__field']} ${classes['email']}`}>
        <h6 className={`text text--secondary`}>{email}</h6>
      </td>
      <td className={`${classes['user__field']} ${classes['age']}`}>
        <h6 className={`text text--secondary`}>{age}</h6>
      </td>
      <td className={`${classes['user__field']} ${classes['gender']}`}>
        <h6 className={`text text--secondary`}>{gender}</h6>
      </td>
    </tr>
  );
};

export default User;