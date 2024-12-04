import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import IsEqualTo from "../../utils/decorators/validation/IsEqualTo";

class SignUpDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(30)
  @MinLength(8)
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEqualTo<SignUpDTO>("password", { message: "Passwords don't match" })
  @IsString()
  password2: string;
}
export default SignUpDTO;
