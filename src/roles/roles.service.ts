import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { EN_AdminRole } from "./entity/role.entity";
import { EN_User } from "../user/entity/user.entity";
import { CreateRoleDTO, UpdateRoleDTO } from "./entity/role.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(EN_AdminRole)
    private readonly roleRepo: Repository<EN_AdminRole>,
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
  ) {}

  async create(dto: CreateRoleDTO) {
    try {
      const existing = await this.roleRepo.findOne({ where: { name: dto.name } });
      if (existing) {
        return { success: false, message: "A role with this name already exists" };
      }

      const role = this.roleRepo.create({
        name:        dto.name,
        badge:       dto.badge ?? null,
        description: dto.description ?? null,
        permissions: dto.permissions ?? null,
      });
      const saved = await this.roleRepo.save(role);
      return { success: true, message: "Role created successfully", data: saved };
    } catch (error) {
      return error;
    }
  }

  async getAll(pagination: { page: number; limit: number; search?: string }) {
    try {
      const { page, limit, search } = pagination;
      const pageSize = limit > 0 ? limit : 1000000;
      const skip     = pageSize * (page - 1);

      const [data, total] = await this.roleRepo.findAndCount({
        take:  pageSize,
        skip,
        order: { created_at: "DESC" },
        where: search ? [{ name: Like(`%${search}%`) }] : undefined,
      });

      return { success: true, message: "Roles fetched successfully", data, count: total };
    } catch (error) {
      return error;
    }
  }

  async getById(id: number) {
    try {
      const role = await this.roleRepo.findOne({ where: { id } });
      if (!role) {
        return { success: false, message: `Role with id ${id} not found` };
      }
      return { success: true, message: "Role fetched successfully", data: role };
    } catch (error) {
      return error;
    }
  }

  async update(id: number, dto: UpdateRoleDTO) {
    try {
      const role = await this.roleRepo.findOne({ where: { id } });
      if (!role) {
        return { success: false, message: `Role with id ${id} not found` };
      }

      if (dto.name && dto.name !== role.name) {
        const nameConflict = await this.roleRepo.findOne({ where: { name: dto.name } });
        if (nameConflict) {
          return { success: false, message: "A role with this name already exists" };
        }
      }

      this.roleRepo.merge(role, dto);
      const saved = await this.roleRepo.save(role);
      return { success: true, message: "Role updated successfully", data: saved };
    } catch (error) {
      return error;
    }
  }

  async delete(ids: number[]) {
    try {
      const roles = await this.roleRepo.findBy({ id: In(ids) });
      if (roles.length === 0) {
        return { success: false, message: "No roles found to delete" };
      }

      // Block deletion if any users are still assigned to these roles
      const userCount = await this.userRepo
        .createQueryBuilder("u")
        .where("u.role_id IN (:...ids)", { ids })
        .getCount();

      if (userCount > 0) {
        const roleName = roles[0].name;
        return {
          success: false,
          userCount,
          message: `"${roleName}" is assigned to ${userCount} user${userCount !== 1 ? "s" : ""}. Remove this role from those users before deleting it.`,
        };
      }

      await this.roleRepo.remove(roles);
      return { success: true, message: "Role(s) deleted successfully", data: roles };
    } catch (error) {
      return error;
    }
  }
}
