function formatCreditCard (number: number) {
  const stringedNumber = String(number).split('');
  let result = [];
  for(let i = 0; i < stringedNumber.length; i+=4) {
    result.push(`${stringedNumber[i]}${stringedNumber[i+1]}${stringedNumber[i+2]}${stringedNumber[i+3]}`) 
  }

  return result.join(' ')
}

export default formatCreditCard;