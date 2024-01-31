import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  public static createSignatureError(message: string) {
    const name = message.split(' :: ')[0];
    let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (HttpStatus[name]) {
      statusCode = HttpStatus[name];
    }

    // Manejar casos específicos con un mapeo explícito
    const statusMapping: Record<string, HttpStatus> = {
      NOT_FOUND: HttpStatus.NOT_FOUND,
    };

    if (statusMapping[name]) {
      statusCode = statusMapping[name];
    }

    throw new HttpException(message, statusCode);
  }
}
