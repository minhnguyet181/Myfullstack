import { IsString,IsNotEmpty,IsEmail,Matches,Length,MaxLength } from "class-validator";

export class CreateUserDto {
  id:number;
  @IsString()
  @Length(4,50)
  name: string;
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50,{ message: 'Email must not exceed 50 characters.' })
  email: string;
  @IsNotEmpty()
  @Length(8, 32)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must include lowercase, uppercase, and special characters.',
  })
  password: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  address :string;
  }
  