import { HttpStatus } from '@nestjs/common';

export default class Message<T> {
  private message: string;
  private code: HttpStatus;
  private isSuccess: boolean;
  private data: T;

  public setCode(code: HttpStatus) {
    this.code = code;
  }

  public setMessage(message: string) {
    this.message = message;
  }

  public setIsSuccess(isSuccess: boolean) {
    this.isSuccess = isSuccess;
  }

  public setData(data: T) {
    this.data = data;
  }
}
