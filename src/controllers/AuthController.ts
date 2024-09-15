import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { ReturnUserDTO } from '../dto/ReturnUserDTO';
import { LoginDTO } from '../dto/LoginDTO';
import { RegisterDTO } from '../dto/RegisterDTO';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("login")
    async login(@Body() body: LoginDTO): Promise<ReturnUserDTO> {
        return await this.authService.login(body);
    }

    @Post("register")
    async register(@Body() body: RegisterDTO): Promise<ReturnUserDTO> {
        return await this.authService.register(body);
    }
}
