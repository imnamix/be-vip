import { EN_User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { UtilityHelper } from "../shared/services/utility.helper";
import { EN_Role } from "./entity/role.entity";
import { EN_Permission } from "./entity/permission.entity";
import { UserDTO } from "./entity/user.dto";
import { UpdateUserDTO } from "./entity/update.dto";
export declare class UserService {
    private readonly userRepo;
    private readonly roleRepo;
    private readonly permissionRepo;
    private readonly utilityHelper;
    constructor(userRepo: Repository<EN_User>, roleRepo: Repository<EN_Role>, permissionRepo: Repository<EN_Permission>, utilityHelper: UtilityHelper);
    create(obj: UserDTO): Promise<any>;
    getAllUsers(pagination: {
        page: number;
        limit: number;
        search: string;
    }): Promise<any>;
    getUserById(userId: number): Promise<EN_User>;
    updateUser(id: number, updatedData: UpdateUserDTO): Promise<any>;
    deleteUser(id: number[]): Promise<any>;
}
