import classes from './Footer.module.scss';

import { AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={`${classes['footer']}`}>
      <div className={`${classes['footer__container']}`}>
        <div
          className={`${classes['footer__content']} d-flex justify-content-between align-items-center`}
        >
          <div className={`${classes['footer__info']}`}>
            <ul
              className={`${classes['footer__contacts']} d-flex text text-main`}
            >
              <li>
                <a href="/">Privacy</a>
              </li>
              <li>
                <a href="/">Terms of use</a>
              </li>
              <li>
                <a href="/">Cookie Policy</a>
              </li>
            </ul>

            <p className={`${classes['footer__rights']}`}>
              © 2023 Wave Electronic Banking. All rights reserved
            </p>
          </div>

          <ul className={`${classes['footer__downloads']} d-flex`}>
            <li className={`${classes['download']}`}>
              <a className={`d-flex align-items-center`} href="/">
                <div className={`${classes['download__icon']}`}>
                  <AiFillApple />
                </div>
                <div className={`${classes['download__text']}`}>
                  <p className={`text text--small-regular`}>Available in</p>
                  <p className={`${classes['download__available-market']}`}>
                    Apple Store
                  </p>
                </div>
              </a>
            </li>
            <li className={`${classes['download']}`}>
              <a className={`d-flex align-items-center`} href="/">
                <div className={`${classes['download__icon']}`}>
                  <FaGooglePlay />
                </div>
                <div className={`${classes['download__text']}`}>
                  <p className={`text text--small-regular`}>Available in</p>
                  <p className={`${classes['download__available-market']}`}>
                    Google Play
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
