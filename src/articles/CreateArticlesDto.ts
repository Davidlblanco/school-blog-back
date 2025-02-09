import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  creator_id?: string;

  @IsOptional()
  file?: any;

  @IsOptional()
  filePath?: string;

  @IsOptional()
  @IsBoolean() // Validates that the value is a boolean
  active?: boolean = true; // Default value can be defined here
}
