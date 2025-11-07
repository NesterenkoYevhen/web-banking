import './Button.scss';

import className from 'classnames';
import { FC, PropsWithChildren } from 'react';

export interface IButton
  extends React.ComponentPropsWithoutRef<'button'>,
    PropsWithChildren {
  primary?: boolean;
  secondary?: boolean;
}

const Button: FC<IButton> = ({ children, primary, secondary, ...rest }) => {
  const classes = className(rest.className, 'btn', {
    'btn--primary': primary,
    'btn--secondary': secondary,
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
