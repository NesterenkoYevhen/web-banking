function cutCardNumber(cardNumber: string): string {
  return `*${cardNumber.split('').slice(12).join('')}`
}

export default cutCardNumber