import { CustomError } from './custom-error';

export class InsufficientFunds extends CustomError {
  statusCode = 400;

  constructor() {
    super("Insufficient funds! Please top up your account.");

    Object.setPrototypeOf(this, InsufficientFunds.prototype);
  }

  serializeErrors() {
    return [{ message: "Insufficient funds! Please top up your account" }];
  }
}