import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export default class AccessKeyGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractAccessKeyFromRequest(request);
    if (!token) {
      throw new HttpException(
        'Failed To Authenticate User',
        HttpStatus.UNAUTHORIZED,
      );
    }
    request.accessKey = token;
    return true;
  }

  private extractAccessKeyFromRequest(req: any): string | null {
    const token = req.headers['x-api-key'];
    if (typeof token == 'string' && token.length > 0) return token;
    return null;
  }
}
