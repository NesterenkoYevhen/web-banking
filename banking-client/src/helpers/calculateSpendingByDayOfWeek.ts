import { ITransaction } from "../types/transaction";

function calculateSpendingByDayOfWeek(transactions: ITransaction[]): {[key: string]: number} {
  const today = new Date();
  const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  const spendingByDayOfWeek: {[key: string]: number} = {
    'Mon': 0,
    'Tue': 0,
    'Wed': 0,
    'Thu': 0,
    'Fri': 0,
    'Sat': 0,
    'Sun': 0,
  };

  transactions.forEach(transaction => {
    if (new Date(transaction.date) >= lastSunday) {
      const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(new Date(transaction.date));
      if(transaction.type === 'TRANSFER_SENDER' && transaction.status !== 'REJECTED') {
        spendingByDayOfWeek[dayOfWeek] += transaction.amount;
      } 
    }
  });

  return spendingByDayOfWeek;
}

export default calculateSpendingByDayOfWeek;