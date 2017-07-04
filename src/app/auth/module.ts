import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FacebookProvider } from '../../providers/facebook';

import { AuthEffects } from './effects/login';
import { AuthService } from './services/auth';
import { TokenService } from './services/token';
import { FacebookService } from './services/facebook';

@NgModule({
  declarations: [],

  imports: [
    EffectsModule.run(AuthEffects),
  ],

  providers: [
    AuthService,
    TokenService,
    FacebookProvider,
    FacebookService,
  ],
})
export class AuthModule {}
