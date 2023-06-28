export class CreateEvent {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly location: string,
    public readonly startDate: 'timestamp',
    public readonly endDate: 'timestamp',
    public readonly user_id: string,
  ) {}

  toString() {
    return JSON.stringify({
      title: this.title,
      description: this.description,
      location: this.location,
      startDate: this.startDate,
      endDate: this.endDate,
      user_id: this.user_id,
    });
  }
}
