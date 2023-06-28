import { IsNotEmpty, IsString } from 'class-validator';

export class AddEventAttendeeDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  event_id: string;
}
