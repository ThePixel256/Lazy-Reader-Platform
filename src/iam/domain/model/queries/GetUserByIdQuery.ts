export class GetUserByIdQuery {
  constructor(public readonly id: number) {
      if (id === null || id <= 0) {
          throw new Error('Invalid id');
      }
  }
}