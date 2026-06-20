import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Contact } from "./entity/contact.entity";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Contact])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
