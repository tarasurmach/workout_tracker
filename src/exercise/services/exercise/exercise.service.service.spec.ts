import { Test, TestingModule } from "@nestjs/testing";
import { ExerciseServiceService } from "./exercise.service.service";

describe("ExerciseServiceService", () => {
  let service: ExerciseServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseServiceService],
    }).compile();

    service = module.get<ExerciseServiceService>(ExerciseServiceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
