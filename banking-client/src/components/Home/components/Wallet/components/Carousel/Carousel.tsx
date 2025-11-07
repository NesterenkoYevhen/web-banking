import classes from './Carousel.module.scss';

import { useState, FC } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { ICreditCard } from '../../../../../../types/credit-card';
import { CAROUSEL_MARGIN, CAROUSEL_WIDTH } from '../../../../../../constants';

import CreditCard from './components/CreditCard/CreditCard';

interface ICarouselComponent {
  cards: ICreditCard[];
}

const Carousel: FC<ICarouselComponent> = ({ cards }) => {
  const [counter, setCounter] = useState(1);
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      setCounter(counter - 1);
      const newOffset = currentOffset + CAROUSEL_WIDTH + CAROUSEL_MARGIN;
      return Math.min(newOffset, 0);
    });
  };

  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      setCounter(counter + 1);
      const newOffset = currentOffset - CAROUSEL_WIDTH - CAROUSEL_MARGIN;
      const maxOffset = -(
        (CAROUSEL_MARGIN + CAROUSEL_WIDTH) *
        (cards.length - 1)
      );
      return Math.max(newOffset, maxOffset);
    });
  };

  const creditCards = cards.map((card) => {
    return <CreditCard key={card.id} card={card} />;
  });

  return (
    <div
      className={`${classes['carousel']} d-flex align-items-center justify-content-between`}
    >
      <button
        disabled={counter === 1 ? true : false}
        className={`${classes['carousel__arrow']} ${
          counter === 1 && classes['carousel__arrow--disabled']
        }`}
        onClick={handleLeftArrowClick}
      >
        <FaChevronLeft />
      </button>
      <div className={`${classes['carousel__window']}`}>
        <div className={`${classes['carousel__cards']}`}>
          <div
            className={`${classes['cards-container']}`}
            style={{ transform: `translateX(${offset}px)` }}
          >
            {creditCards}
          </div>
        </div>
      </div>
      <button
        disabled={counter === cards.length ? true : false}
        className={`${classes['carousel__arrow']} ${
          counter === cards.length && classes['carousel__arrow--disabled']
        }`}
        onClick={handleRightArrowClick}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
