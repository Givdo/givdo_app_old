import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FacebookProvider } from '../../providers/facebook';

import { AuthEffects } from './effects/login';
import { AuthService } from './services/auth';
import { FacebookService } from './services/facebook';

@NgModule({
  declarations: [],

  imports: [
    EffectsModule.run(AuthEffects),
  ],

  providers: [
    AuthService,
    FacebookProvider,
    FacebookService,
  ],
})
export class AuthModule {}
