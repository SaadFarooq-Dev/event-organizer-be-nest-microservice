import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  title: string;

  @IsNotEmpty()
  startDate: 'timestamp';

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
