import { NestFactory } from "@nestjs/core";
import { WsAdapter } from "@nestjs/platform-ws";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3001;

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  });

  app.useWebSocketAdapter(
    new WsAdapter(app, {
      // To handle messages in the [event, data] format
      messageParser: (data) => {
        const [event, payload] = JSON.parse(data.toString());
        return { event, data: payload };
      },
    }),
  );

  app.setGlobalPrefix("api");
  await app.listen(PORT);
}
bootstrap();
