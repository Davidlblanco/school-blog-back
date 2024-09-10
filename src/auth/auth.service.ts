import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { passwordDecoder } from 'src/lib/paswordDecoder';

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

    const passWordDecoder = passwordDecoder(user[0]?.password);

    if (passWordDecoder !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user[0].id, username: user[0].name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
