import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  // id: string
  // date: Date

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  // file: Buffer | null

  // filePath: string | null

  // active: boolean

  @IsNotEmpty()
  creator_id: string;

  //   @IsEmail()
  //   email: string;

  //   @IsNotEmpty()
  //   @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  //     message:
  //       'Password must contain at least one letter, one number, and one special character',
  //   })
  //   password: string;

  //   @IsNotEmpty()
  //   name: string;

  //   @IsNotEmpty()
  //   userName: string;

  //   @IsEnum(['ADMIN', 'TEACHER', 'STUDENT'], {
  //     message: 'Type must be either ADMIN, TEACHER, or STUDENT',
  //   })
  //   type: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

// id?: string
// date?: Date | string
// title: string
// content: string
// file?: Buffer | null
// filePath?: string | null
// active?: boolean
// creator: UserCreateNestedOneWithoutArticlesInput
