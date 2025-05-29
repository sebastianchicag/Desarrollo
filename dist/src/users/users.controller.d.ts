import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: any): Promise<import("./interfaces/user.interface").User>;
    findAll(): Promise<import("./interfaces/user.interface").User[]>;
    crearUsuarioDePrueba(): Promise<import("./interfaces/user.interface").User>;
}
