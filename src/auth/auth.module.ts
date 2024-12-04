import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth/auth.controller";
import { AuthService } from "./services/auth/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/User.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
