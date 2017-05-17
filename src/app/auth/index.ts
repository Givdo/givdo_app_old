import { NgModule } from '@angular/core';
import { Facebook as NativeFacebook } from '@ionic-native/facebook';
import { FacebookService as BrowserFacebook } from 'ngx-facebook';

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
    BrowserFacebook,
    NativeFacebook,
    AuthService,
    FacebookService,
  ],
})
export class AuthModule {}
