import { Controller, Post, UseGuards, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import LocalAuthGuard from "./guards/local-auth.guard";

@Controller()
export default class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post("signup")
    async signup(@Req() req) {
        const { username, password } = req.body;
        await this.authService.signup(username, password);
    }
}
