import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Clients } from "./entity/clients.entity";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Clients])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
