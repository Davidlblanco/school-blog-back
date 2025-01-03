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

    if (passWordDecoder !== pass || user.length > 1 || !user[0].active) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user[0].id,
      name: user[0].name,
      role: user[0].type,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }
}
