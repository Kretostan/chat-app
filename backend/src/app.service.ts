import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getUser(): { name: string, surname: string } {
    return { name: "John", surname: "Wick" };
  }

  healthCheck(): { status: string } {
    return { status: "ok" };
  }
}
