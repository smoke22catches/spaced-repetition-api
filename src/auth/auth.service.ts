import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user) {
            const passwordValid = await user.validatePassword(password);

            if (passwordValid) {
                const { password, ...result } = user;
                return result;
            }

            return null;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.name, sub: user.userId }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
