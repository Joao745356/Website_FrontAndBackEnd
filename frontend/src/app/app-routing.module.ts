import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { DonorDashboardComponent } from './components/pages/donor-dashboard/donor-dashboard.component';
import { PartnerDashboardComponent } from './components/pages/partner-dashboard/partner-dashboard.component';
import { AuthGuardGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/pages/register-donor/register.component';

import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { InstituitionsScrollablePageComponent } from './components/pages/instituitions-scrollable-page/instituitions-scrollable-page.component';

import { DonorDonationHistoryComponent } from './components/pages/donor-donation-history/donor-donation-history.component';
import { PartnerDonationHistoryComponent } from './components/pages/partner-donation-history/partner-donation-history.component';
import { DonationDetailPartnerComponent } from './components/pages/donation-detail-partner/donation-detail-partner.component';
import { DonationDetailDonorComponent } from './components/pages/donation-detail-donor/donation-detail-donor.component';
import { DonorCouponsComponent } from './components/pages/donor-coupons/donor-coupons.component';
import { DonationRequestsViewComponent } from './components/pages/donation-requests-view/donation-requests-view.component';
import { DonationRequestsDetailComponent } from './components/pages/donation-requests-detail/donation-requests-detail.component';
import { RegisterChooseComponent } from './components/pages/register-choose/register-choose.component';
import { RegisterPartnerComponent } from './components/pages/register-partner/register-partner.component';
import { CollectionPoint } from './models/collectionPoint';
import { FAQComponent } from './components/pages/faq/faq.component';
import { MakeDonationRequestComponent } from './components/pages/make-donation-request/make-donation-request.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';

import { ForgotCrendentialsComponent } from './components/pages/forgot-crendentials/forgot-crendentials.component';
import { ResetComponent } from './components/pages/reset/reset.component';

import { CollectionPointsComponent } from './components/pages/collection-points/collection-points.component';


const routes: Routes = [
  {path: 'reset/:token', component:ResetComponent},
  {path: 'forgotCredentials', component:ForgotCrendentialsComponent},
  {path: 'Contacts', component:ContactsComponent},
  {path: 'makeDonationRequest', component:MakeDonationRequestComponent, data:{role: "donor"}, canActivate: [AuthGuardGuard]},//rota para fazer donationRequests
  {path:'', component:HomepageComponent},//rota para a homepage
  {path: 'donorHome', component:DonorDashboardComponent}, //rota para donorHomepage
  {path:'FAQ', component:FAQComponent},
  {path:'donorHomepage', component:DonorDashboardComponent},
  {path: 'register', component: RegisterChooseComponent}, 
  {path: 'collectionPoints', component:CollectionPoint}, //rota para mostrar os collectionPoints num mapa, ou em extenso, whatever we have time for 
  {path: 'PartnerInstituitions', component:InstituitionsScrollablePageComponent}, // rota para partnerViews
  {path: 'login', component: LoginComponent},
  {path: 'registerDonor', component: RegisterComponent}, // registerComponent is for donors only :)
  {path: 'registerPartner', component: RegisterPartnerComponent},
  {path: 'donor-dashboard', component: DonorDashboardComponent, data:{role: "donor"}, canActivate: [AuthGuardGuard]},
  {path: 'partner-dashboard', component: PartnerDashboardComponent,data:{role: "partner"}, canActivate: [AuthGuardGuard] },
  {path: 'donor/donation-history', component: DonorDonationHistoryComponent, data:{role: "donor"}, canActivate: [AuthGuardGuard] },
  {path: 'partner/donation-history', component: PartnerDonationHistoryComponent, data:{role: "partner"}, canActivate: [AuthGuardGuard] },
  {path: 'partner/donation-details/:id', component: DonationDetailPartnerComponent, data:{role: "partner"}, canActivate: [AuthGuardGuard] },
  {path: 'donor/donation-details/:id', component: DonationDetailDonorComponent, data:{role: "donor"}, canActivate: [AuthGuardGuard] },
  {path: 'coupon-store', component: DonorCouponsComponent, data:{role: "donor"}, canActivate: [AuthGuardGuard] },
  {path: 'donor/donation-requests', component: DonationRequestsViewComponent, data:{role: "donor"}, canActivate: [AuthGuardGuard]},
  {path: 'donor/donation-requests/:id', component: DonationRequestsDetailComponent, data:{role: "donor"}, canActivate: [AuthGuardGuard]},
  {path: 'collection-points', component:CollectionPointsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
