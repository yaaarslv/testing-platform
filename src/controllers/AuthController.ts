import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { ReturnUserDTO } from '../dto/ReturnUserDTO';
import { LoginDTO } from '../dto/LoginDTO';
import { RegisterDTO } from '../dto/RegisterDTO';
import { GetInviteLinkDTO } from '../dto/GetInviteLinkDTO';

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

    @Post("get_invite_link")
    async getInviteLink(@Body() body: GetInviteLinkDTO): Promise<string> {
        return await this.authService.getInviteLink(body);
    }

    @Get("check_invite_link/:link")
    async checkInviteLink(@Param("link") link: string): Promise<any> {
        return await this.authService.checkInviteLink(link);
    }
}
