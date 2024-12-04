import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: +configService.get("POSTGRES_PORT"),
        password: configService.get("POSTGRES_PASSWORD"),
        username: configService.get("POSTGRES_USER"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        database: configService.get("POSTGRES_DB"),
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
