import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EN_Enquiry } from '../enquiry/entity/enquiry.entity';
import { EN_Events } from '../events/entity/events.entity';
import { EN_VipNumber } from '../vipNumbers/entity/vip-numbers.entity';
import { EN_User } from '../user/entity/user.entity';
import { EN_GeneralInquiry } from '../generalInquiry/entity/general-inquiry.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(EN_Enquiry)
    private readonly enquiryRepo: Repository<EN_Enquiry>,
    @InjectRepository(EN_Events)
    private readonly eventsRepo: Repository<EN_Events>,
    @InjectRepository(EN_VipNumber)
    private readonly vipRepo: Repository<EN_VipNumber>,
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
    @InjectRepository(EN_GeneralInquiry)
    private readonly generalInquiryRepo: Repository<EN_GeneralInquiry>,
  ) {}

  async getSummary() {
    const [
      totalEnquiries,
      pendingEnquiries,
      inProgressEnquiries,
      deliveredEnquiries,
      dispatchedEnquiries,
      cancelledEnquiries,
      totalEvents,
      totalVipNumbers,
      totalAdminUsers,
      totalGeneralInquiries,
      pendingGeneralInquiries,
      monthlyTrendRaw,
      inquiryStatusRaw,
      recentEnquiries,
    ] = await Promise.all([
      this.enquiryRepo.count(),
      this.enquiryRepo.count({ where: { status: 'Pending' } }),
      this.enquiryRepo.count({ where: { status: 'In Progress' } }),
      this.enquiryRepo.count({ where: { status: 'Delivered' } }),
      this.enquiryRepo.count({ where: { status: 'Dispatched' } }),
      this.enquiryRepo.count({ where: { status: 'Cancelled' } }),
      this.eventsRepo.count(),
      this.vipRepo.count(),
      this.userRepo.count(),
      this.generalInquiryRepo.count(),
      this.generalInquiryRepo.count({ where: { status: 'Pending' } }),

      // Monthly enquiry trend for last 12 months
      this.enquiryRepo.query(`
        SELECT
          YEAR(created_at)  AS year,
          MONTH(created_at) AS month,
          COUNT(*)          AS count
        FROM enquiry
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY YEAR(created_at), MONTH(created_at)
        ORDER BY year ASC, month ASC
      `),

      // Enquiry status breakdown
      this.enquiryRepo.query(`
        SELECT status, COUNT(*) AS count
        FROM enquiry
        GROUP BY status
        ORDER BY count DESC
      `),

      // 7 most recent enquiries
      this.enquiryRepo.find({
        select: ['id', 'name', 'mobile', 'status', 'inquiryType', 'created_at'],
        order: { created_at: 'DESC' },
        take: 7,
      }),
    ]);

    const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const monthlyTrend = monthlyTrendRaw.map((r: any) => ({
      month: MONTH_NAMES[Number(r.month) - 1],
      year:  Number(r.year),
      enquiries: Number(r.count),
    }));

    const inquiryStatusBreakdown = (inquiryStatusRaw as any[]).map(r => ({
      status: r.status || 'Unknown',
      count:  Number(r.count),
    }));

    return {
      success: true,
      data: {
        stats: {
          totalEnquiries,
          pendingEnquiries,
          inProgressEnquiries,
          deliveredEnquiries,
          dispatchedEnquiries,
          cancelledEnquiries,
          totalEvents,
          totalVipNumbers,
          totalAdminUsers,
          totalGeneralInquiries,
          pendingGeneralInquiries,
        },
        monthlyTrend,
        inquiryStatusBreakdown,
        recentEnquiries,
      },
    };
  }
}
