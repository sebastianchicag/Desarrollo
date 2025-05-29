import { IsEmail, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  position?: string;

  @IsOptional()
  department?: string;

  @IsOptional()
  @IsDateString()
  hireDate?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;
}
