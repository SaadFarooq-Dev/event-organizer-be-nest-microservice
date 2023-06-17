export class CreateUserEvent {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phoneNumber: string,
    public readonly role: string,
  ) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      role: this.role,
    });
  }
}
