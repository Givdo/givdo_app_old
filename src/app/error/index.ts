import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';

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
    FacebookService,
  ],
})
export class AuthModule {}
