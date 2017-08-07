import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


// Givdo app
import { GivdoApp } from './app.component';

// Application modules
import { UserModule } from './user';
import { ErrorModule } from './error';
import { AuthModule } from './auth';
import { NotificationsModule } from './notifications';

import { reducer } from './store/reducer';
import { effects } from './store/effects';

import { createTranslateLoader } from './util/translate';

import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { WelcomePage } from '../pages/welcome/welcome';
import { ActivityPage } from '../pages/activity/activity';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NotificationItemComponent } from '../components/notification-item';

@NgModule({
  declarations: [
    GivdoApp,
    ActivityPage,
    ProfilePage,
    WelcomePage,
    FriendsPage,
    NotificationsPage,
    TabsPage,
    NotificationItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,

    StoreModule.provideStore(reducer),
    ...effects.map(e => EffectsModule.run(e)),
    StoreDevtoolsModule.instrumentStore({}),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),

    AuthModule,
    UserModule,
    ErrorModule,
    NotificationsModule,

    IonicModule.forRoot(GivdoApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GivdoApp,
    FriendsPage,
    ProfilePage,
    WelcomePage,
    ActivityPage,
    NotificationsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
