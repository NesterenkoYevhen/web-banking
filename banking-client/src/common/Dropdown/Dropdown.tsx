import './Dropdown.scss';

import { useState, useEffect, useRef, FC, ReactNode } from 'react';
import { GoChevronDown } from 'react-icons/go';

interface Option {
  label: string;
  value: string;
}

interface IDropdown {
  options: Option[];
  value: Option | null;
  onChange: any;
  icon?: ReactNode;
  dropdownClasses?: string;
}

const Dropdown: FC<IDropdown> = ({ options, value, onChange, icon, dropdownClasses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<any>();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option: Option) => {
    return (
      <div
        className="dropdown__option"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="dropdown">
      <div className={`dropdown__panel dropdown__header ${dropdownClasses}`} onClick={handleClick}>
        <div className='dropdown__header--info'>
          {icon && <span className='dropdown__icon'>{icon}</span>}
          {value?.label || 'Select...'}
        </div>
        <GoChevronDown className="dropdown__btn" />
      </div>
      {isOpen && <div className="dropdown__panel dropdown__content">
        {renderedOptions}
      </div> }
    </div>
  );
}

export default Dropdown;