import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { passwordBuffer } from 'src/lib/paswordBuffer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userName: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.users({
      where: { userName },
    });
    const passWordBuffer = passwordBuffer(pass);
    if (user[0]?.password !== passWordBuffer) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user[0].id, username: user[0].name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
