import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { AccessControlService } from 'src/modules/access-control/access-control.service';

@Injectable()
export default class AccessKeyGuard implements CanActivate {
  constructor(
    @Inject()
    private readonly accessControlService: AccessControlService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractAccessKeyFromRequest(request);
    if (!token) {
      throw new HttpException(
        'Failed To Authenticate User',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.accessControlService.updateKeyUsage(token)
    request.accessKey = token;
    return true;
  }

  private extractAccessKeyFromRequest(req: any): string | null {
    const token = req.headers['x-api-key'];
    if (typeof token == 'string' && token.length > 0) return token;
    return null;
  }
}
