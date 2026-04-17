import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): { name: string, surname: string } {
    return { name: "John", surname: "Wick" };
  }

  healthCheck(): { status: string } {
    return { status: "ok" };
  }
}
