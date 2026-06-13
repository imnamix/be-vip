"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const utility_helper_1 = require("../shared/services/utility.helper");
const role_entity_1 = require("./entity/role.entity");
const permission_entity_1 = require("./entity/permission.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepo, roleRepo, permissionRepo, utilityHelper) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.permissionRepo = permissionRepo;
        this.utilityHelper = utilityHelper;
    }
    async create(obj) {
        try {
            const { password, role, email, phone, ...rest } = obj;
            if (!email) {
                return { success: false, message: "Email is required" };
            }
            const existingUser = await this.userRepo.findOne({
                where: [{ email: email }, { phone: phone }],
            });
            if (existingUser) {
                return {
                    success: false,
                    message: "User Already Exists",
                };
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const existingRole = await this.roleRepo.findOne({
                where: { role: role },
                relations: ["permissions"],
            });
            if (!existingRole) {
                throw new Error("Role not found");
            }
            const user = this.userRepo.create({
                email: email,
                password: hashPassword,
                role: existingRole,
                phone: phone,
                ...rest,
            });
            await this.userRepo.save(user);
            const newUser = await this.userRepo.findOne({
                where: { email: obj.email },
                relations: ["role", "role.permissions"],
            });
            if (newUser) {
                return {
                    success: true,
                    message: "User Added Successfully",
                    data: newUser,
                };
            }
            return {
                success: false,
                message: "Error while creating User",
            };
        }
        catch (error) {
            return error;
        }
    }
    async getAllUsers(pagination) {
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
                skip: skip,
                relations: ["role", "role.permissions"],
                order: { created_at: "DESC" },
                where: search
                    ? [
                        { name: (0, typeorm_2.Like)(`%${search}%`) },
                        { phone: (0, typeorm_2.Like)(`%${search}%`) },
                        { email: (0, typeorm_2.Like)(`%${search}%`) },
                    ]
                    : null,
            });
            return {
                count: total,
                data: data,
                message: "User List Fetched Successfully",
            };
        }
        catch (error) {
            return error;
        }
    }
    async getUserById(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ["role", "role.permissions"],
        });
        if (!user) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async updateUser(id, updatedData) {
        try {
            const { role, email, phone, ...rest } = updatedData;
            const user = await this.userRepo.findOne({ where: { id } });
            if (!user) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
            if (email && user.email !== email) {
                const existingEmail = await this.userRepo.findOne({
                    where: { email },
                });
                if (existingEmail) {
                    return {
                        success: false,
                        message: "User's Email ID Already Exists",
                    };
                }
            }
            if (phone && user.phone !== phone) {
                const existingPhone = await this.userRepo.findOne({
                    where: { phone },
                });
                if (existingPhone) {
                    return {
                        success: false,
                        message: "User's Phone Number Already Exists",
                    };
                }
            }
            const existingRole = await this.roleRepo.findOne({
                where: { role: role },
                relations: ["permissions"],
            });
            const newData = {
                role: existingRole,
                email: email,
                phone: phone,
                ...rest,
            };
            this.userRepo.merge(user, newData);
            await this.userRepo.save(user);
            const updatedUser = await this.userRepo.findOne({
                where: { email: email },
                relations: ["role", "role.permissions"],
            });
            return {
                success: true,
                message: "User Updated Successfully",
                data: updatedUser,
            };
        }
        catch (error) {
            return error;
        }
    }
    async deleteUser(id) {
        try {
            const users = await this.userRepo.findBy({ id: (0, typeorm_2.In)(id) });
            if (users.length === 0) {
                throw new common_1.HttpException("Users not found", common_1.HttpStatus.NOT_FOUND);
            }
            await this.userRepo.delete(id);
            return {
                success: true,
                message: "User Deleted Successfully",
                data: users,
            };
        }
        catch (error) {
            return error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.EN_User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.EN_Role)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.EN_Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        utility_helper_1.UtilityHelper])
], UserService);
//# sourceMappingURL=user.service.js.map