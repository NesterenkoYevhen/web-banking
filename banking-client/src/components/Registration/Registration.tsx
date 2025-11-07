import classes from './Registration.module.scss';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import calculateAge from '../../helpers/calculateAge';
import { useThunk } from '../../hooks/use-thunk';
import { IRootState, registerUser } from '../../store';
import { NAME_REGEX, SURNAME_REGEX, EMAIL_REGEX, PWD_WEAK_REGEX, PWD_STRONG_REGEX } from '../../constants';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';

import Error from '../Error/Error';

const Registration = () => {
  const [doRegisterUser, isRegisterUser, registerUserError] =
    useThunk(registerUser);
  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.role === 'USER') {
      navigate('/home');
    }
  }, [userInfo.role, navigate]);

  // Gender
  const [gender, setGender] = useState('MALE');

  // Name
  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  //Surname
  const [surname, setSurname] = useState('');
  const [validSurname, setValidSurname] = useState(false);

  // Email
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  // Day birth
  const [day, setDay] = useState('');
  const [validDay, setValidDay] = useState(false);

  // Month birth
  const [month, setMonth] = useState('');
  const [validMonth, setValidMonth] = useState(false);

  // Year birth
  const [year, setYear] = useState('');
  const [validYear, setValidYear] = useState(false);

  // Password
  const [password, setPassword] = useState('');
  const [validWeakPassword, setWeakValidPassword] = useState(false);
  const [validStrongPassword, setStrongValidPassword] = useState(false);

  // Check password
  const [matchPassword, setMatchPassword] = useState('');
  const [validMatchPassword, setValidMatchPassword] = useState(false);

  // Form validation
  const [validForm, setValidForm] = useState(false);

  //! Validation

  //! Name
  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  //! Surname
  useEffect(() => {
    setValidSurname(SURNAME_REGEX.test(surname));
  }, [surname]);

  //! Email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  //! Day birth
  useEffect(() => {
    if (+day >= 1 && +day <= 31) {
      setValidDay(true);
    } else {
      setValidDay(false);
    }
  }, [day]);

  //! Month birth
  useEffect(() => {
    if (+month >= 1 && +month <= 12) {
      setValidMonth(true);
    } else {
      setValidMonth(false);
    }
  }, [month]);

  //! Year birth
  useEffect(() => {
    if (+year >= 1950 && +year <= 2007) {
      setValidYear(true);
    } else {
      setValidYear(false);
    }
  }, [year]);

  //! Password
  useEffect(() => {
    setWeakValidPassword(PWD_WEAK_REGEX.test(password));
    setStrongValidPassword(PWD_STRONG_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword]);

  //! Form
  useEffect(() => {
    const formFieldsValidation = [
      validName,
      validSurname,
      validEmail,
      validDay,
      validMonth,
      validYear,
      validWeakPassword || validStrongPassword,
      validMatchPassword,
    ];
    setValidForm(formFieldsValidation.every((field) => !!field));
  }, [
    validName,
    validSurname,
    validEmail,
    validDay,
    validMonth,
    validYear,
    validWeakPassword,
    validStrongPassword,
    validMatchPassword,
  ]);

  const onSubmitRegistration = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
      name,
      surname,
      gender,
      age: calculateAge(+day, +month, +year),
    };

    try {
      doRegisterUser(user);
      setName('');
      setValidName(false);
      setSurname('');
      setValidSurname(false);
      setEmail('');
      setValidEmail(false);
      setDay('');
      setValidDay(false);
      setMonth('');
      setValidMonth(false);
      setYear('');
      setValidYear(false);
      setPassword('');
      setWeakValidPassword(false);
      setStrongValidPassword(false);
      setMatchPassword('');
      setValidMatchPassword(false);
      setValidForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const content = !registerUserError ? (
    <div className={`${classes['registration']} d-flex`}>
      {isRegisterUser && <Loader />}
      <div className={`${classes['registration__info']}`}>
        <h1 className={`title title--h1`}>
          Welcome to Wave Electronic Banking!
        </h1>
        <p className={`${classes['registration__info-text']}`}>
          With our easy-to-use platform, you can quickly and securely access
          your accounts, view your transactions, pay bills, transfer funds, and
          more. Plus, our online banking is available 24/7, so you can bank on
          your own schedule.
        </p>
      </div>
      <form
        className={`${classes['registration__form']}`}
        onSubmit={onSubmitRegistration}
      >
        <h2 className={`title title--h2`}>Sign up</h2>
        <h6
          className={`${classes['registration-form__subtitle']} text text--main`}
        >
          Have an account? <Link to="/login">Log in</Link>
        </h6>
        <div className={`${classes['registration-form__content']}`}>
          <fieldset className={`${classes['registration-form__field']}`}>
            <h4 className={`title title--h4`}>Indicate your gender </h4>
            <div
              className={`${classes['registration-form-field__genders']} d-flex`}
            >
              <div
                className={
                  gender === 'MALE'
                    ? `${classes['input-gender']} ${classes['input-gender__border']}`
                    : `${classes['input-gender']}`
                }
              >
                <label>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="MALE"
                    checked={gender === 'MALE'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <div className={`${classes['input-gender__label']} d-flex`}>
                    <span>Male</span>
                  </div>
                </label>
              </div>

              <div
                className={
                  gender === 'FEMALE'
                    ? `${classes['input-gender']} ${classes['input-gender__border']}`
                    : `${classes['input-gender']}`
                }
              >
                <label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="FEMALE"
                    checked={gender === 'FEMALE'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <div className={`${classes['input-gender__label']}`}>
                    <span>Female</span>
                  </div>
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className={`${classes['registration-form__field']} d-flex`}>
            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="Name"
                placeholder="Ann"
                value={name}
                inputName="name"
                classNamesInput={`${classes['registration-form__name']}`}
                onChange={(e) => setName(e.target.value)}
                incorrect={!validName && name ? 'Invalid name' : null}
                success={validName && name ? 'Valid name' : null}
              />
            </div>

            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="Surname"
                placeholder="Smith"
                value={surname}
                inputName="surname"
                classNamesInput={`${classes['registration-form__surname']}`}
                onChange={(e) => setSurname(e.target.value)}
                incorrect={!validSurname && surname ? 'Invalid surname' : null}
                success={validSurname && surname ? 'Valid surname' : null}
              />
            </div>
          </fieldset>

          <fieldset className={`${classes['registration-form__field']} d-flex`}>
            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="E-mail"
                placeholder="example@gmail.com"
                value={email}
                inputName="email"
                classNamesInput={`${classes['registration-form__email']}`}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                incorrect={!validEmail && email ? 'Invalid email' : null}
                success={validEmail && email ? 'Valid email' : null}
              />
            </div>

            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="Date"
                placeholder="24"
                value={day}
                inputName="date-birth"
                classNamesInput={`${classes['registration-form__date-birth']}`}
                type="number"
                max="31"
                min="1"
                onChange={(e) => setDay(e.target.value)}
                incorrect={!validDay && day ? 'Invalid' : null}
                success={validDay && day ? 'Valid' : null}
              />
            </div>

            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="Month"
                placeholder="12"
                value={month}
                inputName="month-birth"
                classNamesInput={`${classes['registration-form__month-birth']}`}
                type="number"
                max="12"
                min="1"
                onChange={(e) => setMonth(e.target.value)}
                incorrect={!validMonth && month ? 'Invalid' : null}
                success={validMonth && month ? 'Valid' : null}
              />
            </div>

            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="Year"
                placeholder="2001"
                value={year}
                inputName="year-birth"
                classNamesInput={`${classes['registration-form__year-birth']}`}
                type="number"
                max="2007"
                min="1950"
                onChange={(e) => setYear(e.target.value)}
                incorrect={!validYear && year ? 'Invalid' : null}
                success={validYear && year ? 'Valid' : null}
              />
            </div>
          </fieldset>

          <fieldset className={`${classes['registration-form__field']} d-flex`}>
            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="Create a password"
                placeholder="Enter a password"
                inputName="password"
                classNamesInput={`${classes['registration-form__password']}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                incorrect={
                  !validWeakPassword && password ? 'Invalid password' : null
                }
                warning={
                  validWeakPassword && !validStrongPassword && password
                    ? 'Weak password'
                    : null
                }
                success={
                  validStrongPassword && password ? 'Strong password' : null
                }
              />
            </div>

            <div className={`${classes['registration-form__input']}`}>
              <Input
                labelText="Repeat password"
                placeholder="Enter a password"
                inputName="password-check"
                classNamesInput={`${classes['registration-form__password-check']}`}
                type="password"
                value={matchPassword}
                onChange={(e) => setMatchPassword(e.target.value)}
                incorrect={
                  !validMatchPassword && matchPassword
                    ? 'Password checking failed'
                    : null
                }
                success={
                  validMatchPassword && matchPassword
                    ? 'Password checking confirmed'
                    : null
                }
              />
            </div>
          </fieldset>

          <fieldset className={`${classes['registration-form__field']}`}>
            <div className={`${classes['registration-form__submit']}`}>
              <Button primary disabled={validForm ? false : true} type="submit">
                Create an account
              </Button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  ) : (
    <Error errorsResponse={registerUserError} />
  );

  return content;
};

export default Registration;
