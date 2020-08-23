export class AppError {
  constructor(private message: string, private statusCode = 400) {}
}
