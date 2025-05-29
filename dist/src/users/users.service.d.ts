import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userData: any): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
}
