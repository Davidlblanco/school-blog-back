import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload;

      const requiredRoles = this.getRoles(context);

      if (requiredRoles && !this.hasRole(payload.role, requiredRoles)) {
        throw new ForbiddenException('Insufficient role');
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private hasRole(userRoles: string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRoles);
  }

  // Get roles from custom metadata (e.g., @Roles() decorator)
  private getRoles(context: ExecutionContext): string[] {
    const handler = context.getHandler();
    const roles = Reflect.getMetadata('roles', handler);
    return roles ? roles : [];
  }
}
