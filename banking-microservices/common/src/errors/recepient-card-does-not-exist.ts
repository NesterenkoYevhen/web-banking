import { CustomError } from './custom-error';

export class RecepientCardDoesNotExist extends CustomError {
  statusCode = 400;

  constructor() {
    super("Recepient's card does not exist!");

    Object.setPrototypeOf(this, RecepientCardDoesNotExist.prototype);
  }

  serializeErrors() {
    return [{ message: "Recepient's card does not exist!" }];
  }
}