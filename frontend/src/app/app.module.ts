import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonorDashboardComponent } from './components/pages/donor-dashboard/donor-dashboard.component';
import { PartnerDashboardComponent } from './components/pages/partner-dashboard/partner-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/pages/register-donor/register.component';

import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { InstituitionsScrollablePageComponent } from './components/pages/instituitions-scrollable-page/instituitions-scrollable-page.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';

import { DonorDonationHistoryComponent } from './components/pages/donor-donation-history/donor-donation-history.component';
import { PartnerDonationHistoryComponent } from './components/pages/partner-donation-history/partner-donation-history.component';
import { DonationDetailPartnerComponent } from './components/pages/donation-detail-partner/donation-detail-partner.component';
import { DonationDetailDonorComponent } from './components/pages/donation-detail-donor/donation-detail-donor.component';
import { DonorCouponsComponent } from './components/pages/donor-coupons/donor-coupons.component';
import { DonationRequestsViewComponent } from './components/pages/donation-requests-view/donation-requests-view.component';
import { DonationRequestsDetailComponent } from './components/pages/donation-requests-detail/donation-requests-detail.component';
import { RegisterChooseComponent } from './components/pages/register-choose/register-choose.component';
import { RegisterPartnerComponent } from './components/pages/register-partner/register-partner.component';
import { FAQComponent } from './components/pages/faq/faq.component';
import { MakeDonationRequestComponent } from './components/pages/make-donation-request/make-donation-request.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { CollectionPointsComponent } from './components/pages/collection-points/collection-points.component';
import { DateNotBeforeTodayDirective } from './directives/dateNotBeforeToday';
import { ForgotCrendentialsComponent } from './components/pages/forgot-crendentials/forgot-crendentials.component';
import { ResetComponent } from './components/pages/reset/reset.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DonorDashboardComponent,
    PartnerDashboardComponent,
    RegisterComponent,

    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    InstituitionsScrollablePageComponent,
    HomepageComponent,

    DonorDonationHistoryComponent,
    PartnerDonationHistoryComponent,
    DonationDetailPartnerComponent,
    DonationDetailDonorComponent,
    DonorCouponsComponent,
    DonationRequestsViewComponent,
    DonationRequestsDetailComponent,
    RegisterChooseComponent,
    RegisterPartnerComponent,
    FAQComponent,
    MakeDonationRequestComponent,
    ContactsComponent,
    CollectionPointsComponent,

    DateNotBeforeTodayDirective,
      ForgotCrendentialsComponent,
      ResetComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
