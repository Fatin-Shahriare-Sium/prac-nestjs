import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: "#ALLAHISALMIGHTY",
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    if (!payload.role) {
      throw new UnauthorizedException({
        msg: "You have not permissions",
        success: false
      })
    }
    return { userId: payload.id, useremail: payload.email, role: payload.role };
  }
}