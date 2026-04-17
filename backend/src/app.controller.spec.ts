import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe("getUser", () => {
    it('should return object with user name and surname', () => {
      const appController = app.get(AppController);
      expect(appController.getUser()).toBe({ name: "John", surname: "Wick" });
    });
  });
});
