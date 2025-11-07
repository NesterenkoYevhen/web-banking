import classes from './Start.module.scss';

import { Link } from 'react-router-dom';

import { RiAccountCircleLine } from 'react-icons/ri';
import { MdTouchApp, MdArrowForwardIos } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { BsArrowRight, BsInstagram, BsFacebook, BsLinkedin } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi'; 


import logo from '../../assets/logo-main.svg';
import cardLogo from '../../assets/logo-auth.svg';
import mastercardLogo from '../../assets/master-card.svg';
import services1Picture from '../../assets/services-img-1.png';
import services2Picture from '../../assets/services-img-2.png';
import services3Picture from '../../assets/services-img-3.png';
import iconAccess from '../../assets/access-icon.svg';

import Button from '../../common/Button/Button';

const Start = () => {
  return (
    <>
      <div className={classes['wrapper']}>
        <header className={classes['header']}>
          <div
            className={`container d-flex justify-content-between align-items-center`}
          >
            <div className={`d-flex align-items-center`}>
              <a className={classes['header__logo']} href="/">
                <img className={classes['logo__img']} src={logo} alt="logo" />
                <h6
                  className={`${classes['logo__text']} text text--small-regular text-center`}
                >
                  WEB
                </h6>
              </a>
              <h6
                className={`text text--small-regular ${classes['header__title']}`}
              >
                Wave Electronic Banking
              </h6>
            </div>
            <nav
              className={`${classes['header-nav']} d-flex align-items-center`}
            >
              <ul className={`${classes['header-nav__list']} d-flex`}>
                <li className={`${classes['header-nav__link']}`}>
                  <a href="#benefits">Benefits</a>
                </li>
                <li className={`${classes['header-nav__link']}`}>
                  <a href="#services">Services</a>
                </li>
                <li className={`${classes['header-nav__link']}`}>
                  <a href="#contacts">Contacts</a>
                </li>
              </ul>
              <div className={classes['header-nav__login']}>
                <Link
                  to="/login"
                  className={`d-flex justify-content-between align-items-center ${classes['login__icon']}`}
                >
                  {<RiAccountCircleLine />}
                  <span className={`text text--main`}>Log in</span>
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <div className={`${classes['wrapper__container']}`}>
          <div className={`${classes['wrapper__circles']}`}>
            <div className={`${classes['circles']}`}>
              <div
                className={`${classes['circle']} ${classes['circle--big']}`}
              ></div>
              <div
                className={`${classes['circle']} ${classes['circle--small']}`}
              ></div>
            </div>
          </div>
          <div className={`${classes['wrapper__content']} d-flex`}>
            <div className={`${classes['wrapper__info']}`}>
              <h1 className={`title title--h1 ${classes['wrapper__title']}`}>
                Banking Made Simple - Anytime, Anywhere!
              </h1>
              <h6 className={`${classes['wrapper__semi-title']}`}>
                Wave Electronic Banking
              </h6>
              <div className={`${classes['wrapper__signup']}`}>
                <Link to="/registration">
                  <Button primary>Sign up now</Button>
                </Link>
              </div>
            </div>

            <div className={`${classes['wrapper__cards']}`}>
              <div className={`${classes['card']}`}>
                <div className={`d-flex align-items-center`}>
                  <a className={`${classes['card__logo']}`} href="/">
                    <img
                      className={classes['logo__img']}
                      src={cardLogo}
                      alt="card-logo"
                    />
                    <h6 className={`text text--small-regular text-center`}>
                      WEB
                    </h6>
                  </a>
                  <h6
                    className={`text text--small-regular ${classes['card__title']}`}
                  >
                    Wave Electronic Banking
                  </h6>
                </div>
                <h3 className={`${classes['card__number']} title title--h3`}>
                  1234 5678 9101 1121
                </h3>
                <div
                  className={`${classes['card__type']} d-flex align-items-center justify-content-between`}
                >
                  <h6
                    className={`text text--small-regular ${classes['card__type--title']}`}
                  >
                    Mastercard
                  </h6>
                  <img className={`${classes['card__type--logo']}`} src={mastercardLogo} alt="mastercard-logo" />
                </div>
              </div>
              <div className={`${classes['card']}`}>
                <div className={`d-flex align-items-center`}>
                  <a className={`${classes['card__logo']}`} href="/">
                    <img
                      className={classes['logo__img']}
                      src={cardLogo}
                      alt="card-logo"
                    />
                    <h6 className={`text text--small-regular text-center`}>
                      WEB
                    </h6>
                  </a>
                  <h6
                    className={`text text--small-regular ${classes['card__title']}`}
                  >
                    Wave Electronic Banking
                  </h6>
                </div>
                <h3 className={`${classes['card__number']} title title--h3`}>
                  1234 5678 9101 1121
                </h3>
                <div
                  className={`${classes['card__type']} d-flex align-items-center justify-content-between`}
                >
                  <h6
                    className={`text text--small-regular ${classes['card__type--title']}`}
                  >
                    Mastercard
                  </h6>
                  <img className={`${classes['card__type--logo']}`} src={mastercardLogo} alt="mastercard-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className={classes['main']}>
        <div className={`container`}>
          <div className={`${classes['benefits']}`} id="benefits">
            <div className={`d-flex justify-content-center`}>
              <h2 className={`${classes['main-title']}`}>Our benefits</h2>
            </div>
            <ul
              className={`${classes['benefits__list']} d-flex justify-content-between`}
            >
              <li className={`${classes['benefits__item']}`}>
                <div className={`${classes['benefits__icon']}`}>
                  <MdTouchApp />
                </div>
                <h3
                  className={`${classes['benefits__semititle']} title title--h2`}
                >
                  Convenience
                </h3>
                <p className={`${classes['benefits__text']}`}>
                  Manage yours finances from anywhere, at any time, using a
                  computer or mobile device
                </p>
              </li>
              <li className={`${classes['benefits__item']}`}>
                <div className={`${classes['benefits__icon']}`}>
                  <img src={iconAccess} alt="icon-access" />
                </div>
                <h3
                  className={`${classes['benefits__semititle']} title title--h2`}
                >
                  24/7 Access
                </h3>
                <p className={`${classes['benefits__text']}`}>
                  Get access to transactions at any time, even outside of
                  working hours
                </p>
              </li>
              <li className={`${classes['benefits__item']}`}>
                <div className={`${classes['benefits__icon']}`}>
                  <FaUser />
                </div>
                <h3
                  className={`${classes['benefits__semititle']} title title--h2`}
                >
                  Personalization
                </h3>
                <p className={`${classes['benefits__text']}`}>
                  Can be customized to meet the unique needs and preferences of
                  each user
                </p>
              </li>
            </ul>
          </div>
          <div className={`${classes['services']}`} id="services">
            <div className={`d-flex justify-content-center`}>
              <h2 className={`${classes['main-title']}`}>Services</h2>
            </div>
            <ul className={`${classes['services__list']}`}>
              <li
                className={`${classes['services__card']} ${classes['account-management']} d-flex justify-content-between`}
              >
                <div className={`${classes['services-card__info']}`}>
                  <h5 className={`${classes['services-card__semititle']}`}>
                    Account Management
                  </h5>
                  <h3 className={`${classes['services-card__title']}`}>
                    Manage yours accounts easily and efficiently
                  </h3>
                  <p className={`${classes['services-card__text']}`}>
                    You can view account balances and transaction history, set
                    up automatic bill payment, transfer funds between accounts,
                    and more.
                  </p>
                  <Button className={`d-flex align-items-center read-more`}>
                    <div className={`${classes['read-more__text']}`}>
                      Read more
                    </div>
                    <div className={`${classes['read-more__arrow']}`}>
                      <MdArrowForwardIos />
                    </div>
                  </Button>
                </div>
                <div className={`${classes['account-management__img']}`}>
                  <div className={`${classes['account-management__img--bg']}`}>
                    <div
                      className={`${classes['account-management__img--circle']}`}
                    ></div>
                  </div>
                  <img
                    className={`${classes['account-management__img--picture']}`}
                    src={services1Picture}
                    alt="services-1-pict"
                  />
                </div>
              </li>
              <li
                className={`${classes['services__card']} ${classes['bill-payment']} d-flex justify-content-between`}
              >
                <div className={`${classes['bill-payment__img']}`}>
                  <div className={`${classes['bill-payment__img--bg']}`}>
                    <div
                      className={`${classes['bill-payment__img--circle']}`}
                    ></div>
                  </div>
                  <img
                    className={`${classes['bill-payment__img--picture']}`}
                    src={services2Picture}
                    alt="services-2-pict"
                  />
                </div>
                <div className={`${classes['services-card__info']}`}>
                  <h5 className={`${classes['services-card__semititle']}`}>
                    Bill Payment
                  </h5>
                  <h3 className={`${classes['services-card__title']}`}>
                    Convenient and secure way to pay bills
                  </h3>
                  <p className={`${classes['services-card__text']}`}>
                    You can schedule payments in advance, set up automatic
                    payments, and receive notifications when payments are due.
                  </p>
                  <Button className={`d-flex align-items-center read-more`}>
                    <div className={`${classes['read-more__text']}`}>
                      Read more
                    </div>
                    <div className={`${classes['read-more__arrow']}`}>
                      <MdArrowForwardIos />
                    </div>
                  </Button>
                </div>
              </li>
              <li
                className={`${classes['services__card']} ${classes['customer-service']} d-flex justify-content-between`}
              >
                <div className={`${classes['services-card__info']}`}>
                  <h5 className={`${classes['services-card__semititle']}`}>
                    Customer Service
                  </h5>
                  <h3 className={`${classes['services-card__title']}`}>
                    Get help with your online banking account quickly
                  </h3>
                  <p className={`${classes['services-card__text']}`}>
                    It includes phone and email support, as well as live chat
                    and self-help resources. What is more you can find a
                    frequently asked questions (FAQ) section
                  </p>
                  <Button className={`d-flex align-items-center read-more`}>
                    <div className={`${classes['read-more__text']}`}>
                      Read more
                    </div>
                    <div className={`${classes['read-more__arrow']}`}>
                      <MdArrowForwardIos />
                    </div>
                  </Button>
                </div>
                <div className={`${classes['customer-service__img']}`}>
                  <div className={`${classes['customer-service__img--bg']}`}>
                    <div
                      className={`${classes['customer-service__img--circle']}`}
                    ></div>
                  </div>
                  <img
                    className={`${classes['customer-service__img--picture']}`}
                    src={services3Picture}
                    alt="services-3-pict"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={`${classes['ready-sign-up']}`}>
            <div className={`${classes['ready-sign-up__circles']}`}>
              <div className={`${classes['circles']}`}>
                <div
                  className={`${classes['circle']} ${classes['circle--big']}`}
                ></div>
                <div
                  className={`${classes['circle']} ${classes['circle--small']}`}
                ></div>
              </div>
            </div>
            <div
              className={`${classes['ready-sign-up__content']} d-flex flex-column align-items-center`}
            >
              <h2 className={`${classes['ready-sign-up__title']}`}>
                Ready to sign up?
              </h2>
              <p className={`${classes['ready-sign-up__text']} text-center`}>
                Don't wait - sign up for online banking today and take control
                of your finances
              </p>
              <div className={`${classes['ready-sign-up__btn']}`}>
                <Link to="/registration">
                  <Button primary>Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={classes['footer']}>
        <div className={`${classes['footer__content']} d-flex justify-content-between`}>
          <div className={`${classes['footer__nav']}`}>
            <div className={`d-flex align-items-center`}>
              <a className={classes['footer__logo']} href="/">
                <img className={classes['logo__img']} src={logo} alt="logo" />
                <h6
                  className={`${classes['logo__text']} text text--small-regular text-center`}
                >
                  WEB
                </h6>
              </a>
              <h6
                className={`text text--small-regular ${classes['footer__title']}`}
              >
                Wave Electronic Banking
              </h6>
            </div>
            <nav>
              <ul className={`${classes['footer-nav__list']} d-flex`}>
                <li className={`${classes['footer-nav__item']}`}><a href="/">Privacy</a></li>
                <li className={`${classes['footer-nav__item']}`}><a href="/">Term of use</a></li>
                <li className={`${classes['footer-nav__item']}`}><a href="/">Cooking Policy</a></li>
              </ul>
            </nav>
          </div>
          <div className={`${classes['footer__subscribe']}`}>
            <p className={`${classes['footer-subscribe__text']}`}>Subscribe to our newsletters to stay in touch</p>
            <div className={`${classes['footer-subscribe__input']} d-flex align-items-center`}>
              <input className={`${classes['subscribe-input']}`} type="text" placeholder='Your email here' />
              <Button className={`${classes['subscribe-input__arrow']}`}><BsArrowRight /></Button>
            </div>
          </div>
        </div>
        <div className={`${classes['footer__contacts']} d-flex justify-content-between align-items-center`}>
          <p className={`${classes['contacts__rights']}`}>© 2023 WEB. All rights reserved</p>
          <ul className={`d-flex`}>
            <li className={classes['contacts__item']}><a href="/"><BsInstagram /></a></li>
            <li className={classes['contacts__item']}><a href="/"><BsFacebook /></a></li>
            <li className={classes['contacts__item']}><a href="/"><BsLinkedin /></a></li>
            <li className={classes['contacts__item']}><a href="/"><FiMail /></a></li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Start;
