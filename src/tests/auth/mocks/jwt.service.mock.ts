import { JwtService } from '@nestjs/jwt';
export class JwtServiceMock extends JwtService {
  sign(payload: any, options?: any): string {
    return 'token';
  }

  verify<T extends object = any>(token: string, options?: any): T {
    return 'verified' as any;
  }

  decode(token: string, options: any): null | {
    [key: string]: any;
  } | string {
    return 'decoded';
  }
}
