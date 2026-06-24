import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { EN_GeneralInquiry } from "./entity/general-inquiry.entity";
import { GeneralInquiryDTO } from "./entity/general-inquiry.dto";

@Injectable()
export class GeneralInquiryService {
  constructor(
    @InjectRepository(EN_GeneralInquiry)
    private readonly repo: Repository<EN_GeneralInquiry>
  ) {}

  async create(payload: GeneralInquiryDTO) {
    try {
      const record = this.repo.create({
        name: payload.name,
        mobile: payload.mobile,
        message: payload.message ?? null,
        lookingFor: payload.lookingFor ?? null,
        status: "Pending",
      });
      const saved = await this.repo.save(record);
      return { success: true, message: "Inquiry submitted successfully", data: saved };
    } catch (error) {
      throw error;
    }
  }

  async getAll(params: { page: number; limit: number; search?: string; status?: string }) {
    try {
      const { page, limit, search, status } = params;
      const pageSize = limit > 0 ? limit : 1000000;
      const skip = limit > 0 ? limit * (page - 1) : 0;

      let where: any = null;
      if (status && search) {
        where = [
          { name: Like(`%${search}%`), status },
          { mobile: Like(`%${search}%`), status },
        ];
      } else if (status) {
        where = { status };
      } else if (search) {
        where = [{ name: Like(`%${search}%`) }, { mobile: Like(`%${search}%`) }];
      }

      const [data, count] = await this.repo.findAndCount({
        take: pageSize,
        skip,
        order: { created_at: "DESC" },
        where,
      });
      return { success: true, message: "Records fetched successfully", data, count };
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    const record = await this.repo.findOne({ where: { id: Number(id) } });
    if (!record) throw new HttpException(`General inquiry ${id} not found`, HttpStatus.NOT_FOUND);
    return record;
  }

  async update(id: number, payload: Partial<GeneralInquiryDTO>) {
    await this.repo.update(Number(id), payload);
    return this.repo.findOne({ where: { id: Number(id) } });
  }

  async delete(ids: number[]) {
    const records = await this.repo.findBy({ id: In(ids) });
    if (records.length === 0) throw new HttpException(`No records found`, HttpStatus.NOT_FOUND);
    await this.repo.delete(ids);
    return { success: true, message: "Deleted successfully", data: records };
  }
}
