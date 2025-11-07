import classes from './ForgotPassword.module.scss';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { EMAIL_REGEX } from '../../constants';
import { IRootState } from '../../store';
import { useThunk } from '../../hooks/use-thunk';
import { forgotPasswordUser } from '../../store';

import Loader from '../../common/Loader/Loader';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Error from '../Error/Error';

const ForgotPassword = () => {
  const [doPasswordRecovery, isPasswordRecovery, passwordRecoveryError] =
    useThunk(forgotPasswordUser);
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.role === 'USER') {
      navigate('/home');
    } else if (userInfo.role === 'ADMIN') {
      navigate('/admin/home');
    }
  }, [userInfo.role, navigate]);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const onSubmitRecoverPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const recoveryInfo = { email };

    try {
      doPasswordRecovery(recoveryInfo);
      setEmail('');
      setValidEmail(false);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const content = !passwordRecoveryError ? (
    <div className={`${classes['password-recovery']} d-flex`}>
      {isPasswordRecovery && <Loader />}
      <div className={`${classes['password-recovery__info']}`}>
        <h1 className={`title title--h1`}>
          Welcome to Wave Electronic Banking!
        </h1>
        <p className={`${classes['password-recovery__info-text']}`}>
          With our easy-to-use platform, you can quickly and securely access
          your accounts, view your transactions, pay bills, transfer funds, and
          more. Plus, our online banking is available 24/7, so you can bank on
          your own schedule.
        </p>
      </div>
      <form className={`${classes['password-recovery__form']}`} onSubmit={onSubmitRecoverPassword}>
        <h2 className={`title title--h2`}>Password Recovering</h2>
        <h6 className={`${classes['password-recovery-form__subtitle']} text text--main`}>
          Just enter your email, don't worry
        </h6>
        <div className={`${classes['password-recovery-form__content']}`}>
          <fieldset className={`${classes['password-recovery-form__field']}`}>
            <div className={`${classes['password-recovery-form__input']}`}>
              <Input
                labelText="E-mail"
                placeholder="example@gmail.com"
                inputName="email"
                type="email"
                classNamesInput={`${classes['password-recovery-form__email']}`}
                onChange={(e) => setEmail(e.target.value)}
                incorrect={!validEmail && email ? 'Invalid email' : null}
                success={validEmail && email ? 'Valid email' : null}
              />
            </div>
          </fieldset>
          <fieldset className={`${classes['password-recovery-form__field']}`}>
            <div className={`${classes['password-recovery-form__submit']}`}>
              <Button primary disabled={validEmail ? false : true} type="submit">
                Recover
              </Button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  ) : (
    <Error errorsResponse={passwordRecoveryError} />
  );

  return content;
};

export default ForgotPassword;
