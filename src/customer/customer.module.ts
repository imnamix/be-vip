import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EN_Customer } from "./entity/customer.entity";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

@Module({
  imports: [TypeOrmModule.forFeature([EN_Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
