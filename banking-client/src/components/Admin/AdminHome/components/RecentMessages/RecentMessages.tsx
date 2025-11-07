import Button from '../../../../../common/Button/Button';
import classes from './RecentMessages.module.scss';

import manAvatar from '../../../../../assets/man.png';
import womanAvatar from '../../../../../assets/woman.png';

import { MdSearch } from 'react-icons/md';
import { FiArrowUpLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RecentMessages = () => {
  return (
    <div className={`${classes['recent-messages']}`}>
      <div className={`d-flex justify-content-between align-items-center`}>
        <h3 className={`title title--h3`}>Recent Messages</h3>
        <button className={`${classes['recent-messages__search']}`}><MdSearch /></button>
      </div>
      <ul className={`${classes['recent-messages__users']}`}>
        <li className={`${classes['user-messages']} d-flex justify-content-between align-items-center`}>
          <div className={`d-flex align-items-center`}>
            <img className={`${classes['user-messages__logo']}`} src={manAvatar} alt="user-avatar" />
            <div className={`${classes['user-messages__info']}`}>
              <h5 className={`${classes['user-messages__name']}`}>Rachel Anderson</h5>
              <h6 className={`${classes['user-messages__last-activity']}`}>3 minutes ago</h6>
            </div>
          </div>
          <div>
            <p className={`text text--secondary`}>1 message</p>
          </div>
        </li>
        <li className={`${classes['user-messages']} d-flex justify-content-between align-items-center`}>
          <div className={`d-flex align-items-center`}>
            <img className={`${classes['user-messages__logo']}`} src={manAvatar} alt="user-avatar" />
            <div className={`${classes['user-messages__info']}`}>
              <h5 className={`${classes['user-messages__name']}`}>Alexander Hernandez</h5>
              <h6 className={`${classes['user-messages__last-activity']}`}>4 minutes ago</h6>
            </div>
          </div>
          <div>
            <p className={`text text--secondary`}>2 messages</p>
          </div>
        </li>
        <li className={`${classes['user-messages']} d-flex justify-content-between align-items-center`}>
          <div className={`d-flex align-items-center`}>
            <img className={`${classes['user-messages__logo']}`} src={womanAvatar} alt="user-avatar" />
            <div className={`${classes['user-messages__info']}`}>
              <h5 className={`${classes['user-messages__name']}`}>Lily Davis</h5>
              <h6 className={`${classes['user-messages__last-activity']}`}>4 minutes ago</h6>
            </div>
          </div>
          <div>
            <p className={`text text--secondary`}>1 message</p>
          </div>
        </li>
        <li className={`${classes['user-messages']} d-flex justify-content-between align-items-center`}>
          <div className={`d-flex align-items-center`}>
            <img className={`${classes['user-messages__logo']}`} src={womanAvatar} alt="user-avatar" />
            <div className={`${classes['user-messages__info']}`}>
              <h5 className={`${classes['user-messages__name']}`}>Yana Kovalenko</h5>
              <h6 className={`${classes['user-messages__last-activity']}`}>4 minutes ago</h6>
            </div>
          </div>
          <div>
            <p className={`text text--secondary`}>5 messages</p>
          </div>
        </li>
        <li className={`${classes['user-messages']} d-flex justify-content-between align-items-center`}>
          <div className={`d-flex align-items-center`}>
            <img className={`${classes['user-messages__logo']}`} src={womanAvatar} alt="user-avatar" />
            <div className={`${classes['user-messages__info']}`}>
              <h5 className={`${classes['user-messages__name']}`}>Yana Kovalenko</h5>
              <h6 className={`${classes['user-messages__last-activity']}`}>4 minutes ago</h6>
            </div>
          </div>
          <div>
            <p className={`text text--secondary`}>5 messages</p>
          </div>
        </li>
      </ul>
      <div className={`${classes['recent-messages__more']}`}>
        <Link to='/admin/messages'>
          <Button primary>
            <FiArrowUpLeft />
            Check all messages
          </Button>  
        </Link>
      </div>
    </div>
  )
}

export default RecentMessages;