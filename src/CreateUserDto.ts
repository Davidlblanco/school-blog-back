import { IsEmail, IsNotEmpty, Matches, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character',
  })
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userName: string;

  @IsEnum(['ADMIN', 'TEACHER', 'STUDENT'], {
    message: 'Type must be either ADMIN, TEACHER, or STUDENT',
  })
  type: 'ADMIN' | 'TEACHER' | 'STUDENT';
}
