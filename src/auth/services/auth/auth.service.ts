import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { hash } from "bcrypt";
import NewUserDto from "../../DTO/NewUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../user/entity/User.entity";
import { Repository } from "typeorm";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async createNewUser(userData: NewUserDto) {
    const { username, email, password, password2 } = userData;
    const alreadyExists = await this.userRepo.findOne({
      where: [{ username }, { email }],
    });
    if (alreadyExists) {
      throw new ConflictException("User with such credentials already exists");
    }
    const isSamePassword = password === password2;
    if (!isSamePassword) {
      throw new BadRequestException("Passwords don't match");
    }
    const hashedPassword = await hash(password, 10);
    const newUserResult = this.userRepo.create({
      username,
      email,
      password: hashedPassword,
    });
    return await this.userRepo.save(newUserResult);
  }
  async getUsers() {
    return await this.userRepo.find();
  }
  signAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>("JWT_ACCESS_LIFETIME"),
    });
  }
  signRefreshToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>("JWT_REFRESH_LIFETIME"),
    });
  }
  async signTokens(userId: number, username: string) {
    return await Promise.all([
      this.signAccessToken({ userId, username }),
      this.signRefreshToken({ userId }),
    ]);
  }
}
