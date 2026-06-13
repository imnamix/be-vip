import { UserService } from "./user.service";
import { UserDTO } from "./entity/user.dto";
import { UpdateUserDTO } from "./entity/update.dto";
import { deleteUserDTO } from "./entity/deleteUser.dto";
export declare class UserController {
    service: UserService;
    constructor(service: UserService);
    create(obj: UserDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    getAllUsers(page: number, limit: number, search: string): Promise<{
        success: boolean;
        message: any;
        data: any;
        count: any;
    }>;
    getById(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/user.entity").EN_User;
    }>;
    update(id: number, updatedData: UpdateUserDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
    delete(userDto: deleteUserDTO): Promise<any>;
}
