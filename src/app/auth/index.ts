import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FacebookProvider } from '../app.providers';

import { AuthEffects } from './effects';
import { AuthService } from './auth.service';
import { FacebookService } from './facebook.service';

@NgModule({
  declarations: [

  ],

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
