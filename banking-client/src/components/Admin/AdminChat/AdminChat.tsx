import classes from './AdminChat.module.scss';

import manLogo from '../../../assets/man.png';
import womanLogo from '../../../assets/woman.png';

import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { BsThreeDots, BsPaperclip, BsSend } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';
import { useSelector } from 'react-redux';

import { IRootState } from '../../../store';

import HeaderSecondary from '../../hoc/Header/HeaderSecondary/HeaderSecondary';

const AdminChat = () => {
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className={`${classes['chat']}`}>
      <HeaderSecondary
        title="Support"
        name={userInfo.name}
        surname={userInfo.surname}
        gender={userInfo.gender}
      />

      <div className={`${classes['chat__container']} d-flex`}>
        <div className={`${classes['chat-contacts']}`}>
          <div className={`${classes['chat-contacts__header']}`}>
            <div
              className={`${classes['chat-contacts__search']} d-flex align-items-center`}
            >
              <label
                className={`${classes['chat-contacts__search--label']}`}
                htmlFor="search"
              >
                <MdSearch />
              </label>
              <input
                className={`${classes['chat-contacts__search--input']}`}
                type="text"
                id="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className={`${classes['chat-contacts__body']}`}>
            <div className={`${classes['chat-users']}`}>
              <div
                className={`${classes['chat-users__header']} d-flex justify-content-between align-items-center`}
              >
                <h4 className={`title title--h4`}>All chats</h4>
                <div className={`${classes['chat-users__header--logo']}`}>
                  <TbEdit />
                </div>
              </div>
              <ul className={`${classes['chat-users__list']}`}>
                <li
                  className={`${classes['chat-users__item']} ${classes['chat-users__item--selected']} d-flex justify-content-between`}
                >
                  <div className={`d-flex`}>
                    <img
                      className={`${classes['chat-users__logo']}`}
                      src={manLogo}
                      alt="admin-logo"
                    />
                    <div className={`${classes['chat-users__info']}`}>
                      <h4
                        className={`${classes['chat-users__title']} title title--h4`}
                      >
                        Yevhen Nesterenko
                      </h4>
                      <p className={`${classes['chat-users__msg']}`}>
                        To solve your problem, you should go to the settings and
                        lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus, autem temporibus rerum assumenda itaque vero
                        soluta recusandae obcaecati vel impedit iste aut aperiam
                        ab aliquid et. Nostrum ducimus ipsum debitis.
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${classes['chat-users__time-messages']} d-flex flex-column justify-content-between`}
                  >
                    <div className={`text text--small-regular`}>
                      <span>12:01</span>
                    </div>
                    <div
                      className={`${classes['chat-users__messages']} text text--small-regular`}
                    >
                      <span>10</span>
                    </div>
                  </div>
                </li>
                <li
                  className={`${classes['chat-users__item']} d-flex justify-content-between`}
                >
                  <div className={`d-flex`}>
                    <img
                      className={`${classes['chat-users__logo']}`}
                      src={womanLogo}
                      alt="admin-logo"
                    />
                    <div className={`${classes['chat-users__info']}`}>
                      <h4
                        className={`${classes['chat-users__title']} title title--h4`}
                      >
                        Yana Kovalenko
                      </h4>
                      <p className={`${classes['chat-users__msg']}`}>
                        Ask an question
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${classes['chat-users__time-messages']} d-flex flex-column justify-content-between`}
                  >
                    <div className={`text text--small-regular`}>
                      <span>12:01</span>
                    </div>
                    {/* <div className={`${classes['chat-users__messages']} text text--small-regular`}>
                      <span>10</span>
                    </div> */}
                  </div>
                </li>
                <li className={`${classes['chat-users__item']} d-flex`}>
                  <div className={`${classes['chat-users__new-chat-logo']}`}>
                    +
                  </div>
                  <div className={`${classes['chat-users__new-chat-info']}`}>
                    <h4
                      className={`${classes['chat-users__title']} title title--h4`}
                    >
                      Start a new chat
                    </h4>
                    <p className={`${classes['chat-users__msg']}`}>
                      Ask an question
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${classes['chat-messages']}`}>
          <div
            className={`${classes['chat-messages__header']} d-flex justify-content-between`}
          >
            <div className={`d-flex align-items-center`}>
              <img
                className={`${classes['chat-messages__logo']}`}
                src={manLogo}
                alt="admin-logo"
              />
              <div className={`${classes['chat-messages__info']}`}>
                <h4
                  className={`${classes['chat-messages__title']} title title--h4`}
                >
                  Yevhen Nesterenko
                </h4>
                <p className={`${classes['chat-messages__status']}`}>Online</p>
              </div>
            </div>
            <div className={`${classes['chat-messages__settings']}`}>
              <BsThreeDots />
            </div>
          </div>
          <div className={`${classes['chat-messages__body']} d-flex`}>
            {/* <div className={`${classes['chat-messages__no-msgs']}`}>
              <h4 className={`title title--h4 text-center`}>
                Write your question
              </h4>
              <p
                className={`${classes['chat-messages__no-msgs--text']} text-center`}
              >
                Our assistance contact you as soon as possible
              </p>
            </div> */}
            <ul className={`${classes['chat-messages__msgs']}`}>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 1
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-receiver']}`}>
                <div className={`${classes['chat-messages__msg-receiver--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-receiver--text']}`}>
                  I want to know how to see payments limits in my card 2
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 3
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-receiver']}`}>
                <div className={`${classes['chat-messages__msg-receiver--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-receiver--text']}`}>
                  I want to know how to see payments limits in my card 2
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 1
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 3
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-receiver']}`}>
                <div className={`${classes['chat-messages__msg-receiver--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-receiver--text']}`}>
                  I want to know how to see payments limits in my card 2
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 1
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 3
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-receiver']}`}>
                <div className={`${classes['chat-messages__msg-receiver--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-receiver--text']}`}>
                  I want to know how to see payments limits in my card 2
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 1
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 3
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-receiver']}`}>
                <div className={`${classes['chat-messages__msg-receiver--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-receiver--text']}`}>
                  I want to know how to see payments limits in my card 2
                </div>
              </li>
              <li className={`${classes['chat-messages__msg-sender']}`}>
                <div className={`${classes['chat-messages__msg-sender--time']}`}>
                  12:01
                </div>
                <div className={`${classes['chat-messages__msg-sender--text']}`}>
                  I want to know how to see payments limits in my card 1
                </div>
              </li>
            </ul>
          </div>
          <div className={`${classes['chat-messages__footer']}`}>
            <div
              className={`${classes['chat-messages__msg']} d-flex align-items-center`}
            >
              <div
                className={`${classes['chat-messages__msg--attach']}`}
              >
                <BsPaperclip />
              </div>
              <input
                className={`${classes['chat-messages__msg--input']}`}
                type="text"
                id="search"
                placeholder="Write a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className={`${classes['chat-messages__msg--send']}`}><BsSend /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
