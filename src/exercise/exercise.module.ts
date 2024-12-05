import { Module } from "@nestjs/common";
import { ExerciseServiceService } from "./services/exercise/exercise.service.service";
import { ExerciseController } from "./controllers/exercise/exercise.controller";

@Module({
  providers: [ExerciseServiceService],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
