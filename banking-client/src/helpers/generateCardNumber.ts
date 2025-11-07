function generateCardNumber(type: string): string {
  let cardNumber = '';
  if (type === 'VISA') {
    cardNumber += '4';
    cardNumber += Math.floor(Math.random() * 5) + 1;
  } else if (type === 'MASTER_CARD') {
    cardNumber += '5';
    cardNumber += Math.floor(Math.random() * 5) + 1;
  }
  for (let i = 0; i < 14; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  return cardNumber;
}

export default generateCardNumber;