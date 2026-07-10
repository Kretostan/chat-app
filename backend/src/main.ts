import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3001;

  // FIX: Usunąć ??
  // FIX: Usunąć .env.example i zrobić .env.development jako ten przykładowy z domyślnymi wartościami
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  });


  app.setGlobalPrefix("api");
  await app.listen(PORT);
}
bootstrap();
