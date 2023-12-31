import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { METHOD_REGISTRATION } from 'src/enum/enum';
import { AuthService } from './auth.service';
import { config } from 'dotenv';

config();

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.CALL_BACK_URL_GOOGLE);

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService,
    private authService: AuthService
    ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:process.env.CALL_BACK_URL_GOOGLE,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails } = profile;
    const user = {
      email: emails[0].value,
      methodRegistration: METHOD_REGISTRATION.GOOGLE,
    };

    done(null, user);
  }
}
