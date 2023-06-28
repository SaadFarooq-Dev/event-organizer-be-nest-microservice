import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  title: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  startDate: 'timestamp';

  @IsNotEmpty()
  endDate: 'timestamp';
}
