import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../auth/decorators/permission.decorator';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard, PermissionGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @Permission('Dashboard', 'read')
  getSummary() {
    return this.dashboardService.getSummary();
  }
}
