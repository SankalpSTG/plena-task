import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessControlService } from 'src/modules/access-control/access-control.service';
import { LogsService } from 'src/modules/logs/logs.service';

@Injectable()
export default class AccessKeyGuard implements CanActivate {
  constructor(
    private readonly accessControlService: AccessControlService,
    private readonly logsService: LogsService
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
    const rateLimit = await this.accessControlService.getRateLimit(token)
    if(rateLimit == 0){
      this.logsService.sendLogEvent({
        key: token,
        type: "invalid-key-error",
      })
      throw new UnauthorizedException("invalid key provided")
    }
    const success = await this.accessControlService.updateKeyUsage(token, rateLimit)
    if(!success){
      this.logsService.sendLogEvent({
        key: token,
        type: "too-many-requests",
      })
      throw new HttpException("too many requests", HttpStatus.TOO_MANY_REQUESTS)
    }
    this.logsService.sendLogEvent({
      key: token,
      type: "key-used",
    })
    request.accessKey = token;
    return true;
  }

  private extractAccessKeyFromRequest(req: any): string | null {
    const token = req.headers['x-api-key'];
    if (typeof token == 'string' && token.length > 0) return token;
    return null;
  }
}
