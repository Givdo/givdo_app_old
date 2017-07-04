import { NgModule } from '@angular/core';

import { FacebookProvider } from '../../providers/facebook';

import { AuthService } from './services/auth';
import { TokenService } from './services/token';
import { FacebookService } from './services/facebook';

@NgModule({
  declarations: [],

  imports: [],

  providers: [
    AuthService,
    TokenService,
    FacebookProvider,
    FacebookService,
  ],
})
export class AuthModule {}
