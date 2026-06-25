import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { EN_Enquiry } from '../enquiry/entity/enquiry.entity';
import { EN_Events } from '../events/entity/events.entity';
import { EN_VipNumber } from '../vipNumbers/entity/vip-numbers.entity';
import { EN_User } from '../user/entity/user.entity';
import { EN_GeneralInquiry } from '../generalInquiry/entity/general-inquiry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EN_Enquiry,
      EN_Events,
      EN_VipNumber,
      EN_User,
      EN_GeneralInquiry,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
