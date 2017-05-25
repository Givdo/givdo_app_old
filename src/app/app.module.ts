import { StoreModule } from '@ngrx/store';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { GivdoApp } from './app.component';

// Application modules
import { UserModule } from './user';
import { UiModule } from './ui';
import { AuthModule } from './auth';
import { NotificationsModule } from './notifications';

import { reducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    UiModule,
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
