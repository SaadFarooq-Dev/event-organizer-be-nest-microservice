export class CreateEvent {
  constructor(
    public readonly title: string,
    public readonly startDate: 'timestamp',
    public readonly user_id: string,
  ) {}

  toString() {
    return JSON.stringify({
      title: this.title,
      startDate: this.startDate,
      user_id: this.user_id,
    });
  }
}
