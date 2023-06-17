export class GetUserEvent {
  constructor(public readonly id: number) {}

  toString() {
    return JSON.stringify({
      id: this.id,
    });
  }
}
