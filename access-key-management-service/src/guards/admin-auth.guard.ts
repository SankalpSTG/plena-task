import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);
    if (!token) {
      throw new HttpException("Failed To Authenticate User", HttpStatus.UNAUTHORIZED);
    }
    try {
      const decoded = this.decodeWithAdminToken(token)
      if (!decoded) throw new HttpException("An Error Occured", HttpStatus.UNAUTHORIZED);
      request.user = decoded;
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException("Failed To Authenticate User", HttpStatus.UNAUTHORIZED);
    }
  }

  private extractJwtFromRequest(req: any): string | null {
    const { authorization } = req.headers;
    let token = "";
    if (authorization && authorization.length > 0) token = authorization.split(" ")[1];
    if (token.length === 0) return null;
    return token;
  }
  private decodeWithAdminToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
      });
    } catch (error: any) {
      return null;
    }
  }
}
