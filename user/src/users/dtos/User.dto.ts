import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ROLES } from 'src/typeorm/user.entity';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(ROLES)
  role: ROLES;
}
