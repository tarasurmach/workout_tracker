import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { WorkoutModule } from "./workout_plan/workout.module";
import { WorkoutSessionModule } from "./workout_session/workout_session.module";
import { WorkoutExerciseModule } from "./workout_exercise/workout_exercise.module";
import { ExerciseModule } from "./exercise/exercise.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    WorkoutModule,
    WorkoutSessionModule,
    WorkoutExerciseModule,
    ExerciseModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
