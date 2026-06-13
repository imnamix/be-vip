import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json, urlencoded } from "body-parser";
import * as morgan from "morgan";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      frameguard: {
        action: "deny", // This sets X-Frame-Options to DENY
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameAncestors: ["'none'"], // This sets CSP frame-ancestors to 'none'
        },
      },
    }),
    morgan("tiny")
  );

  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("API documentation for Pritam-Group")
    .setVersion("1.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "Authorization"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
  // app.enableCors();
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: [
      "Set-cookie, X-Requested-With,content-type, Origin, Accept, x-access-token, Authorization, baggage, Connection, Host",
    ],
  });

  app.use(json({ limit: "450mb" }));
  app.use(urlencoded({ limit: "450mb", extended: true }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
