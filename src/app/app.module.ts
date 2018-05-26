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
import { activityService } from '../providers/activity.service';
import { friendsService } from '../providers/friends.service';
import { UserService } from '../providers/userService.service';
import { OrganizationService } from '../providers/organization.service';


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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    OrganizationService,
    activityService,
    friendsService
  ]
})
export class AppModule {}
