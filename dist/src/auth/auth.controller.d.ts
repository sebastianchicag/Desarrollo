import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<import("../users/interfaces/user.interface").User>;
    login(body: any): Promise<{
        access_token: string;
        user: {
            name: any;
            email: any;
        };
    }>;
}
