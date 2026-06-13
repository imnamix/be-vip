"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const body_parser_1 = require("body-parser");
const morgan = require("morgan");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({
        frameguard: {
            action: "deny",
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                frameAncestors: ["'none'"],
            },
        },
    }), morgan("tiny"));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("API Documentation")
        .setDescription("API documentation for Pritam-Group")
        .setVersion("1.0")
        .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "Authorization")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api-docs", app, document);
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: [
            "Set-cookie, X-Requested-With,content-type, Origin, Accept, x-access-token, Authorization, baggage, Connection, Host",
        ],
    });
    app.use((0, body_parser_1.json)({ limit: "450mb" }));
    app.use((0, body_parser_1.urlencoded)({ limit: "450mb", extended: true }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map