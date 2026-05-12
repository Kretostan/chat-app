import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUser(): { name: string, surname: string } {
    return this.appService.getUser();
  }

  @Get("/health")
  checkHealth(): object {
    return this.appService.healthCheck();
  }
}
