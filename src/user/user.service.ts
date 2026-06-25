import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { EN_User } from "./entity/user.entity";
import { In, Like, Repository } from "typeorm";
import { UtilityHelper } from "../shared/services/utility.helper";
import { EN_AdminRole } from "../roles/entity/role.entity";
import * as bcrypt from "bcrypt";
import { UserDTO } from "./entity/user.dto";
import { UpdateUserDTO } from "./entity/update.dto";
import { deleteUserDTO } from "./entity/deleteUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EN_User) private readonly userRepo: Repository<EN_User>,
    @InjectRepository(EN_AdminRole) private readonly roleRepo: Repository<EN_AdminRole>,
    private readonly utilityHelper: UtilityHelper
  ) {}

  async create(obj: UserDTO) {
    try {
      const { password, role, email, phone, ...rest } = obj;

      if (!email) {
        return { success: false, message: "Email is required" };
      }

      const existingUser = await this.userRepo.findOne({
        where: [{ email }, { phone }],
      });

      if (existingUser) {
        return { success: false, message: "User Already Exists" };
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const existingRole = role
        ? await this.roleRepo.findOne({ where: { id: role } })
        : null;

      const user = this.userRepo.create({
        email,
        password: hashPassword,
        role: existingRole ?? undefined,
        roleName: (rest as any).roleName ?? existingRole?.name ?? null,
        phone,
        ...rest,
      });
      await this.userRepo.save(user);

      const newUser = await this.userRepo.findOne({
        where: { email },
        relations: ["role"],
      });

      if (newUser) {
        return { success: true, message: "User Added Successfully", data: newUser };
      }
      return { success: false, message: "Error while creating User" };
    } catch (error) {
      return error;
    }
  }

  async getAllUsers(pagination: { page: number; limit: number; search: string }) {
    try {
      const { page, limit, search } = pagination;
      let pageSize = 1000000;
      let skip = 0;
      if (page) {
        if (limit && limit > 0) {
          pageSize = limit;
          skip = limit * (page - 1);
        }
      }

      const [data, total] = await this.userRepo.findAndCount({
        take: pageSize,
        skip,
        relations: ["role"],
        order: { created_at: "DESC" },
        where: search
          ? [
              { name: Like(`%${search}%`) },
              { phone: Like(`%${search}%`) },
              { email: Like(`%${search}%`) },
            ]
          : null,
      });

      return { count: total, data, message: "User List Fetched Successfully" };
    } catch (error) {
      return error;
    }
  }

  async getUserById(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["role"],
    });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: number, updatedData: UpdateUserDTO) {
    try {
      const { role, email, phone, password, ...rest } = updatedData as any;
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      if (email && user.email !== email) {
        const existingEmail = await this.userRepo.findOne({ where: { email } });
        if (existingEmail) {
          return { success: false, message: "User's Email ID Already Exists" };
        }
      }

      if (phone && user.phone !== phone) {
        const existingPhone = await this.userRepo.findOne({ where: { phone } });
        if (existingPhone) {
          return { success: false, message: "User's Phone Number Already Exists" };
        }
      }

      const existingRole = role
        ? await this.roleRepo.findOne({ where: { id: role } })
        : undefined;

      const newData: any = {
        role: existingRole ?? undefined,
        roleName: updatedData.roleName ?? existingRole?.name ?? undefined,
        email,
        phone,
        ...rest,
      };

      if (password) {
        newData.password = await bcrypt.hash(password, 10);
      }

      this.userRepo.merge(user, newData);
      await this.userRepo.save(user);

      const updatedUser = await this.userRepo.findOne({
        where: { id },
        relations: ["role"],
      });
      return { success: true, message: "User Updated Successfully", data: updatedUser };
    } catch (error) {
      return error;
    }
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'password'],
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) throw new HttpException('Current password is incorrect', HttpStatus.BAD_REQUEST);

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userRepo.update(userId, { password: hashed });
    return { success: true, message: 'Password updated successfully' };
  }

  async deleteUser(id: number[]) {
    try {
      const users = await this.userRepo.findBy({ id: In(id) });
      if (users.length === 0) {
        throw new HttpException("Users not found", HttpStatus.NOT_FOUND);
      }
      await this.userRepo.delete(id);
      return { success: true, message: "User Deleted Successfully", data: users };
    } catch (error) {
      return error;
    }
  }
}
