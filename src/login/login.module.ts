import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedModule } from "../shared/shared.module";
import { EN_User } from "../user/entity/user.entity";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { EmailService } from "../EmailService/mailService";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([EN_User]),
    SharedModule,
    JwtModule.register({
      secret: "your-secret-key", // or use an environment variable
      signOptions: { expiresIn: "60m" }, // JWT expiration time
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, EmailService],
})
export class LoginModule {}
