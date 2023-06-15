import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth.const';
import { AuthService } from '../auth.service';
import { CustomRequest } from '@/types/api.d';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: CustomRequest = context.switchToHttp().getRequest();
    const user = await this.authService.validateToken(request.headers);

    request.userAccount = user.account;
    request.userId = user.user_id;

    return true;
  }
}
