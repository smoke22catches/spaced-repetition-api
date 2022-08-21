import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { validatePassword } from 'src/users/users.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user) {
            const passwordValid = await validatePassword(user, password);

            if (passwordValid) {
                const { password, ...result } = user;
                return result;
            }

            return null;
        }

        return null;
    }

    login(user: any) {
        const payload = { username: user.name, sub: user.userId }
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async signup(username: string, password: string) {
        return await this.usersService.add(username, password);
    }
}
