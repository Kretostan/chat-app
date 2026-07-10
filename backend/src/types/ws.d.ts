import { AuthUser } from "shared";
import { WebSocket } from "ws";

declare module "ws" {
  interface WebSocket {
    user?: AuthUser;
  }
}
