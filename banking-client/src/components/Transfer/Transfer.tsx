import classes from './Transfer.module.scss';

import { useEffect, useState, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState, useCreateTransferMutation, useFetchCardsQuery } from '../../store';
import { BsCreditCard2Front } from 'react-icons/bs';

import formatCreditCard from '../../helpers/formatCreditCard';
import { ITransfer } from '../../types/transfer';
import { IOption } from '../../types/option';
import { ASSIGNMENT_REGEX, NAME_REGEX, CREDIT_CARD_REGEX } from '../../constants';

import HeaderSecondary from '../hoc/Header/HeaderSecondary/HeaderSecondary';
import Input from '../../common/Input/Input';
import Dropdown from '../../common/Dropdown/Dropdown';
import Button from '../../common/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from '../../common/Loader/Loader';

const Transfer = () => {
  const { data: senderCards } = useFetchCardsQuery();
  const [createTransfer, createTransferData] = useCreateTransferMutation();

  const cardsOptions = senderCards!.map((card) => {
    return {
      label: formatCreditCard(card.number),
      value: String(card.number),
    };
  });

  const userInfo = useSelector((state: IRootState) => {
    return state.user;
  });

  const navigate = useNavigate();

  const [assignment, setAssignment] = useState('');
  const [validAssignment, setValidAssignment] = useState(false);
  const [amount, setAmount] = useState('');
  const [validAmount, setValidAmount] = useState(false);
  const [invalidAmountMsg, setInvalidAmountMsg] = useState('');
  const [senderName, setSenderName] = useState('');
  const [validSenderName, setValidSenderName] = useState(false);
  const [recepientName, setRecepientName] = useState('');
  const [validRecepientName, setValidRecepientName] = useState(false);
  const [senderCard, setSenderCard] = useState<IOption | null>(null);
  const [recepientCard, setRecepientCard] = useState('');
  const [validRecepientCard, setValidRecepientCard] = useState(false);
  const [validForm, setValidForm] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    setValidAssignment(ASSIGNMENT_REGEX.test(assignment));
  }, [assignment]);

  useEffect(() => {
    const selectedCard =
      senderCards!.find((card) => String(card.number) === senderCard?.value) || null;

    if (!selectedCard || +amount <= 0 || selectedCard.balance <= +amount) {
      setValidAmount(false);
      if (!selectedCard) {
        setInvalidAmountMsg(`You haven't selected a card`);
      } else if (selectedCard.balance <= +amount) {
        setInvalidAmountMsg(`There are not enough funds on the card`);
      } else {
        setInvalidAmountMsg(`Invalid amount`);
      }
    } else {
      setValidAmount(true);
    }
  }, [amount, senderCard, senderCards]);

  useEffect(() => {
    setValidSenderName(NAME_REGEX.test(senderName));
  }, [senderName]);

  useEffect(() => {
    setValidRecepientName(NAME_REGEX.test(recepientName));
  }, [recepientName]);

  useEffect(() => {
    setValidRecepientCard(CREDIT_CARD_REGEX.test(recepientCard));
  }, [recepientCard]);

  //! Form
  useEffect(() => {
    const formFieldsValidation = [
      validAssignment,
      validAmount,
      validSenderName,
      validRecepientName,
      validRecepientCard,
      senderCard
    ];
    setValidForm(formFieldsValidation.every((field) => !!field));
  }, [
    validAssignment,
    validAmount,
    validSenderName,
    validRecepientName,
    validRecepientCard,
    senderCard
  ]);

  const handleSelectSenderCard = (option: IOption) => {
    setSenderCard(option);
  };

  const goBack = () => navigate(-1);

  const onCreateTransfer = (e: SyntheticEvent) => {
    e.preventDefault();
    if(senderCard) {
      const transfer: ITransfer = {
        senderName,
        senderCardNumber: +senderCard.value,
        recepientName,
        recepientCardNumber: +recepientCard,
        assignment,
        amount: +amount
      }
      try {
        createTransfer(transfer)
        setShowModal(true);
      } catch(err) {
        console.error(err)
      }
    }
    
  }

  if(createTransferData.error) {
    return (
      <div className={`${classes['transfer']}`}>
        {createTransferData.isLoading && <Loader />}
        {showModal && <Modal onClose={handleCloseModal} name={recepientName} amount={+amount} date={new Date()} isSuccessTransfer={false} errorsResponse={createTransferData.error as any} />}
        <HeaderSecondary
          title="Transfer"
          name={userInfo.name}
          surname={userInfo.surname}
          gender={userInfo.gender}
        />
        <form
          className={`${classes['transfer-form']} d-flex justify-content-center`}
          onSubmit={onCreateTransfer}
        >
          <div className={`${classes['transfer-form__fields']}`}>
            <div
              className={`${classes['transfer-form__asignment-amount']} d-flex`}
            >
              <div className={`${classes['transfer-form__field']}`}>
                <Input
                  labelText="Assignment"
                  placeholder="Enter assignment..."
                  inputName="assignment"
                  value={assignment}
                  onChange={(e) => setAssignment(e.target.value)}
                  incorrect={
                    !validAssignment && assignment ? 'Invalid assignment' : null
                  }
                />
              </div>
              <div
                className={`${classes['transfer-form__field']} ${classes['transfer-form__amount']}`}
              >
                <Input
                  labelText="Amount"
                  placeholder="Enter amount..."
                  inputName="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  incorrect={!validAmount && amount ? invalidAmountMsg : null}
                />
              </div>
            </div>
            <div
              className={`${classes['transfer-form__sender-recepient-names']} d-flex`}
            >
              <div className={`${classes['transfer-form__field']}`}>
                <Input
                  labelText="Sender"
                  placeholder="Enter sender name..."
                  inputName="sender-name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  incorrect={
                    !validSenderName && senderName ? 'Invalid sender name' : null
                  }
                />
              </div>
              <div
                className={`${classes['transfer-form__field']} ${classes['transfer-form__recepient-name']}`}
              >
                <Input
                  labelText="Recepient"
                  placeholder="Enter recepient name..."
                  inputName="recepient-name"
                  value={recepientName}
                  onChange={(e) => setRecepientName(e.target.value)}
                  incorrect={
                    !validRecepientName && recepientName
                      ? 'Invalid recepient name'
                      : null
                  }
                />
              </div>
            </div>
            <div
              className={`${classes['transfer-form__sender-recepient-cards']} d-flex align-items-center`}
            >
              <div className={`${classes['transfer-form__field']}`}>
                <Dropdown
                  options={cardsOptions}
                  value={senderCard}
                  onChange={handleSelectSenderCard}
                  icon={<BsCreditCard2Front />}
                />
              </div>
              <div
                className={`${classes['transfer-form__field']} ${classes['transfer-form__recepient-card']}`}
              >
                <Input
                  type="number"
                  placeholder="Enter recepient card..."
                  inputName="recepient-name"
                  value={recepientCard}
                  onChange={(e) => setRecepientCard(e.target.value)}
                  incorrect={
                    !validRecepientCard && recepientCard
                      ? 'Invalid recepient card'
                      : null
                  }
                />
              </div>
            </div>
  
            <ul
              className={`${classes['transfer-info']} d-flex justify-content-between`}
            >
              <li className={`${classes['transfer-info__item']}`}>
                <h5
                  className={`title title--h5 ${classes['transfer-info__title']}`}
                >
                  Amount
                </h5>
                <h4
                  className={`title title--h4 ${classes['transfer-info__subtitle']}`}
                >
                  {`${amount || 0} UAH`}
                </h4>
              </li>
              <li>
                <h5
                  className={`title title--h5 ${classes['transfer-info__title']}`}
                >
                  Sender's fee
                </h5>
                <h4
                  className={`title title--h4 ${classes['transfer-info__subtitle']}`}
                >
                  0.00 UAH
                </h4>
              </li>
              <li>
                <h5
                  className={`title title--h5 ${classes['transfer-info__title']}`}
                >
                  Amount to be credited
                </h5>
                <h4
                  className={`title title--h4 ${classes['transfer-info__subtitle']}`}
                >
                  {`${amount || 0} UAH`}
                </h4>
              </li>
              <li>
                <h5
                  className={`title title--h5 ${classes['transfer-info__title']}`}
                >
                  Recipient's fee
                </h5>
                <h4
                  className={`title title--h4 ${classes['transfer-info__subtitle']}`}
                >
                  0.00 UAH
                </h4>
              </li>
            </ul>
  
            <div
              className={`${classes['transfer-form__controls']} d-flex justify-content-center`}
            >
              <div className={`${classes['transfer-form__control']}`}>
                <Button type="button" secondary onClick={goBack}>
                  Back
                </Button>
              </div>
              <div className={`${classes['transfer-form__control']}`}>
                <Button disabled={validForm ? false : true} type="submit" primary>
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`${classes['transfer']}`}>
      {showModal && <Modal onClose={handleCloseModal} name={recepientName} amount={+amount} date={new Date()} isSuccessTransfer={true} />}
      <HeaderSecondary
        title="Transfer"
        name={userInfo.name}
        surname={userInfo.surname}
        gender={userInfo.gender}
      />
      <form
        className={`${classes['transfer-form']} d-flex justify-content-center`}
        onSubmit={onCreateTransfer}
      >
        <div className={`${classes['transfer-form__fields']}`}>
          <div
            className={`${classes['transfer-form__asignment-amount']} d-flex`}
          >
            <div className={`${classes['transfer-form__field']}`}>
              <Input
                labelText="Assignment"
                placeholder="Enter assignment..."
                inputName="assignment"
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
                incorrect={
                  !validAssignment && assignment ? 'Invalid assignment' : null
                }
              />
            </div>
            <div
              className={`${classes['transfer-form__field']} ${classes['transfer-form__amount']}`}
            >
              <Input
                labelText="Amount"
                placeholder="Enter amount..."
                inputName="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                incorrect={!validAmount && amount ? invalidAmountMsg : null}
              />
            </div>
          </div>
          <div
            className={`${classes['transfer-form__sender-recepient-names']} d-flex`}
          >
            <div className={`${classes['transfer-form__field']}`}>
              <Input
                labelText="Sender"
                placeholder="Enter sender name..."
                inputName="sender-name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                incorrect={
                  !validSenderName && senderName ? 'Invalid sender name' : null
                }
              />
            </div>
            <div
              className={`${classes['transfer-form__field']} ${classes['transfer-form__recepient-name']}`}
            >
              <Input
                labelText="Recepient"
                placeholder="Enter recepient name..."
                inputName="recepient-name"
                value={recepientName}
                onChange={(e) => setRecepientName(e.target.value)}
                incorrect={
                  !validRecepientName && recepientName
                    ? 'Invalid recepient name'
                    : null
                }
              />
            </div>
          </div>
          <div
            className={`${classes['transfer-form__sender-recepient-cards']} d-flex align-items-center`}
          >
            <div className={`${classes['transfer-form__field']}`}>
              <Dropdown
                options={cardsOptions}
                value={senderCard}
                onChange={handleSelectSenderCard}
                icon={<BsCreditCard2Front />}
              />
            </div>
            <div
              className={`${classes['transfer-form__field']} ${classes['transfer-form__recepient-card']}`}
            >
              <Input
                type="number"
                placeholder="Enter recepient card..."
                inputName="recepient-name"
                value={recepientCard}
                onChange={(e) => setRecepientCard(e.target.value)}
                incorrect={
                  !validRecepientCard && recepientCard
                    ? 'Invalid recepient card'
                    : null
                }
              />
            </div>
          </div>

          <ul
            className={`${classes['transfer-info']} d-flex justify-content-between`}
          >
            <li className={`${classes['transfer-info__item']}`}>
              <h5
                className={`title title--h5 ${classes['transfer-info__title']}`}
              >
                Amount
              </h5>
              <h4
                className={`title title--h4 ${classes['transfer-info__subtitle']}`}
              >
                {`${amount || 0} UAH`}
              </h4>
            </li>
            <li>
              <h5
                className={`title title--h5 ${classes['transfer-info__title']}`}
              >
                Sender's fee
              </h5>
              <h4
                className={`title title--h4 ${classes['transfer-info__subtitle']}`}
              >
                0.00 UAH
              </h4>
            </li>
            <li>
              <h5
                className={`title title--h5 ${classes['transfer-info__title']}`}
              >
                Amount to be credited
              </h5>
              <h4
                className={`title title--h4 ${classes['transfer-info__subtitle']}`}
              >
                {`${amount || 0} UAH`}
              </h4>
            </li>
            <li>
              <h5
                className={`title title--h5 ${classes['transfer-info__title']}`}
              >
                Recipient's fee
              </h5>
              <h4
                className={`title title--h4 ${classes['transfer-info__subtitle']}`}
              >
                0.00 UAH
              </h4>
            </li>
          </ul>

          <div
            className={`${classes['transfer-form__controls']} d-flex justify-content-center`}
          >
            <div className={`${classes['transfer-form__control']}`}>
              <Button type="button" secondary onClick={goBack}>
                Back
              </Button>
            </div>
            <div className={`${classes['transfer-form__control']}`}>
              <Button disabled={validForm ? false : true} type="submit" primary>
                Transfer
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
