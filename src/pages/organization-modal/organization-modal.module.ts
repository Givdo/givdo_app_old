import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizationModalPage } from './organization-modal';

@NgModule({
  declarations: [
    OrganizationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganizationModalPage),
  ],
  exports: [
    OrganizationModalPage
  ]
})
export class OrganizationModalPageModule {}
