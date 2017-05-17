import { Http } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { GivdoApp } from './app.component';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { UiModule } from './ui';

import { reducer } from './app.reducer';
import { createTranslateLoader } from './util/translate';

import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { WelcomePage } from '../pages/welcome/welcome';
import { ActivityPage } from '../pages/activity/activity';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    GivdoApp,
    ActivityPage,
    ProfilePage,
    WelcomePage,
    FriendsPage,
    NotificationsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,

    StoreLogMonitorModule,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
