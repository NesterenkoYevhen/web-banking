import './Input.scss';

import className from 'classnames';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FC } from 'react';
import { MdError, MdWarning } from 'react-icons/md';



export interface IInput extends React.ComponentPropsWithoutRef<'input'> {
  inputName?: string;
  labelText?: string;
  classNamesInput?: string;
  classNamesLabel?: string;
  success?: string | null;
  incorrect?: string | null;
  warning?: string | null;
}

const Input: FC<IInput> = ({
  inputName,
  labelText,
  classNamesInput,
  classNamesLabel,
  success,
  incorrect,
  warning,
  ...rest
}) => {
  const classesInput = className(classNamesInput, 'input-field', {
    'input-field--disabled': rest.disabled,
    'input-field--success': success,
    'input-field--incorrect': incorrect,
    'input-field--warning': warning,
  });
  const classesLabel = className(classNamesLabel, 'input-label');

  return (
    <>
      {labelText && (
        <label className={classesLabel} htmlFor={inputName}>
          {labelText}
        </label>
      )}
      <input className={classesInput} id={inputName} {...rest} />

      {success && (
        <p className="text text--small-regular additional-info success d-flex align-items-center">
          <BsCheckCircleFill />{' '}
          <span className="additional-info__msg">{success}</span>
        </p>
      )}

      {incorrect && (
        <p className="text text--small-regular additional-info incorrect d-flex align-items-center">
          <MdError /> <span className="additional-info__msg">{incorrect}</span>
        </p>
      )}

      {warning && (
        <p className="text text--small-regular additional-info warning d-flex align-items-center">
          <MdWarning /> <span className="additional-info__msg">{warning}</span>
        </p>
      )}
    </>
  );
};

export default Input;
