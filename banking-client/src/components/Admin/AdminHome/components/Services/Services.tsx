import classes from './Services.module.scss'

import { FiArrowUpLeft } from 'react-icons/fi';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IUser } from '../../../../../types/user';
import { IReplenishmentAdmin } from '../../../../../types/replenishmentAdmin';

import Button from '../../../../../common/Button/Button';

interface IServicesComponent {
  users: IUser[];
  replenishments: IReplenishmentAdmin[];
}

const Services: FC<IServicesComponent> = ({ users, replenishments }) => {
  return (
    <div className={`${classes['services']}`}>
      <div className={`${classes['services__requests-review']} d-flex justify-content-between`}>
        <div className={`${classes['services__requests']}`}>
          <Link to='/admin/requests'>
            <Button primary className={`${classes['services__requests--btn']} d-flex align-items-center justify-content-center`}>
              <FiArrowUpLeft />
              Check all requests
            </Button>
          </Link>
        </div>
        <div className={`${classes['services__review']}`}>
          <Link to='/admin/requests'>
            <Button primary className={`${classes['services__review--btn']} d-flex align-items-center`}>
              <FiArrowUpLeft />
              <div>
                <h5 className={`title title--h5`}>Need<br/> review</h5>
                <h3 className={`title title--h3`}>{replenishments.length}</h3>
              </div>
            </Button>
          </Link>
          
        </div>
      </div>
      <div className={`${classes['services__waiting-new-users']} d-flex justify-content-between`}>
        <div className={`${classes['services__waiting']}`}>
          <Link to='/admin/requests'>
            <Button primary className={`${classes['services__waiting--btn']} d-flex align-items-center`}>
              <FiArrowUpLeft />
              <div>
                <h5 className={`title title--h5`}>Waiting</h5>
                <h3 className={`title title--h3`}>{replenishments.length}</h3>
              </div>
            </Button>
          </Link>
        </div>
        <div className={`${classes['services__new-users']}`}>
          <Link to='/admin/users'>
            <Button primary className={`${classes['services__new-users--btn']} d-flex align-items-center`}>
              <FiArrowUpLeft />
              <div>
                <h5 className={`title title--h5`}>New users</h5>
                <h3 className={`title title--h3`}>{users.length}</h3>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Services;