import classes from './Login.module.scss';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useThunk } from '../../hooks/use-thunk';
import { IRootState, loginUser } from '../../store';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Loader from '../../common/Loader/Loader';

import Error from '../Error/Error';

const Login = () => {
  const [doLoginUser, isLoginUser, loginUserError] = useThunk(loginUser);
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

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    const formFieldsValidation = [validEmail, validPassword];
    setValidForm(formFieldsValidation.every((field) => !!field));
  }, [validEmail, validPassword]);

  const onSubmitLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = { email, password };

    try {
      doLoginUser(user);
      setEmail('');
      setValidEmail(false);
      setPassword('');
      setValidPassword(false);
      setValidForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const content = !loginUserError ? (
    <div className={`${classes['login']} d-flex`}>
      {isLoginUser && <Loader />}
      <div className={`${classes['login__info']}`}>
        <h1 className={`title title--h1`}>
          Welcome to Wave Electronic Banking!
        </h1>
        <p className={`${classes['login__info-text']}`}>
          With our easy-to-use platform, you can quickly and securely access
          your accounts, view your transactions, pay bills, transfer funds, and
          more. Plus, our online banking is available 24/7, so you can bank on
          your own schedule.
        </p>
      </div>
      <form className={`${classes['login__form']}`} onSubmit={onSubmitLogin}>
        <h2 className={`title title--h2`}>Log in</h2>
        <h6 className={`${classes['login-form__subtitle']} text text--main`}>
          New here? <Link to="/registration">Sign up</Link>
        </h6>
        <div className={`${classes['login-form__content']}`}>
          <fieldset className={`${classes['login-form__field']}`}>
            <div className={`${classes['login-form__input']}`}>
              <Input
                labelText="E-mail"
                placeholder="example@gmail.com"
                inputName="email"
                type="email"
                classNamesInput={`${classes['login-form__email']}`}
                onChange={(e) => setEmail(e.target.value)}
                incorrect={!validEmail && email ? 'Invalid email' : null}
                success={validEmail && email ? 'Valid email' : null}
              />
            </div>
          </fieldset>
          <fieldset className={`${classes['login-form__field']}`}>
            <div className={`${classes['login-form__input']}`}>
              <Input
                labelText="Password"
                placeholder="Enter a password"
                inputName="password"
                type="password"
                classNamesInput={`${classes['login-form__password']}`}
                onChange={(e) => setPassword(e.target.value)}
                incorrect={
                  !validPassword && password ? 'Invalid password' : null
                }
                success={validPassword && password ? 'Valid password' : null}
              />
            </div>
          </fieldset>
          <h6
            className={`${classes['login-form__forgot-password']} text text--main`}
          >
            <Link to="/password">Forgot password ?</Link>
          </h6>
          <fieldset className={`${classes['login-form__field']}`}>
            <div className={`${classes['login-form__submit']}`}>
              <Button primary disabled={validForm ? false : true} type="submit">
                Log in
              </Button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  ) : (
    <Error errorsResponse={loginUserError} />
  );

  return content;
};

export default Login;
