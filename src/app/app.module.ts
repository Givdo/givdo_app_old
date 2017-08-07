import { StoreModule } from '@ngrx/store';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { GivdoApp } from './app.component';

// Application modules
import { AuthModule } from './auth';
import { UserModule } from './user';
import { UiModule } from './ui';
import { UtilModule } from './util';
import { NotificationsModule } from './notifications'

import { reducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { createTranslateLoader } from './util/translate';

import { TabsPage } from '../pages/tabs/tabs';
import { QuizPage } from '../pages/quiz/quiz';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { WelcomePage } from '../pages/welcome/welcome';
import { ActivityPage } from '../pages/activity/activity';
import { NotificationsPage } from '../pages/notifications/notifications';
import { OrganizationModalPage } from '../pages/organization-modal/organization-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NotificationItemComponent } from '../components/notification-item';
import { QuizComponent } from '../components/quiz/quiz';

@NgModule({
  declarations: [
    GivdoApp,
    QuizPage,
    ActivityPage,
    ProfilePage,
    WelcomePage,
    FriendsPage,
    NotificationsPage,
    OrganizationModalPage,
    TabsPage,
    NotificationItemComponent,
    QuizComponent,
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

    UtilModule,
    AuthModule,
    UserModule,
    UiModule,
    NotificationsModule,

    IonicModule.forRoot(GivdoApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GivdoApp,
    QuizPage,
    FriendsPage,
    ProfilePage,
    WelcomePage,
    ActivityPage,
    NotificationsPage,
    OrganizationModalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
