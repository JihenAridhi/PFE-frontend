import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FooterComponent} from "./components/footer/footer.component";
import { NavComponent } from './components/nav/nav.component';
import {HomeComponent} from "./components/home/home.component";
import { NewsComponent } from './components/news/news.component';
import {ViewNewsComponent} from "./components/view-news/view-news.component";
import {EventsComponent} from "./components/events/events.component";
import {EventComponent} from "./components/event/event.component";
import {TeamsComponent} from "./components/teams/teams.component";
import {PublicationsComponent} from "./components/publications/publications.component";
import {TeacherResearcherComponent} from "./components/teacher-researcher/teacher-researcher.component";
import {DoctorsComponent} from "./components/doctors/doctors.component";
import {PhdStudentsComponent} from "./components/phd-students/phd-students.component";
import {AllComponent} from "./components/all/all.component";
import {PartnersComponent} from "./components/partners/partners.component";
import {LoginComponent} from "./components/login/login.component";
import {ContactComponent} from "./components/contact/contact.component";
import {SignupComponent} from "./components/signup/signup.component";
import {NavProfilComponent} from "./components/nav-profil/nav-profil.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {UpdateProfilComponent} from "./components/update-profil/update-profil.component";
import {FeedbackComponent} from "./components/feedback/feedback.component";
import {MembersComponent} from "./components/members/members.component";
import {AddArticleComponent} from "./components/add-article/add-article.component";
import {EditEventComponent} from "./components/edit-event/edit-event.component";
import {EditNewsComponent} from "./components/edit-news/edit-news.component";
import {RequestsComponent} from "./components/requests/requests.component";
import {AddNewsComponent} from "./components/add-news/add-news.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {LoginGuard} from "./guards/login.guard";





const routes: Routes = [
  {path: '', component: FooterComponent, children:
  [
    {path: 'home', component: HomeComponent},
    {path: '', component: NavComponent, children:
    [
      {path: 'news', component: NewsComponent},
      {path: 'view-news', component: ViewNewsComponent},
      {path: 'events', component: EventsComponent},
      {path: 'event', component: EventComponent},
      {path: 'teams', component: TeamsComponent},
      {path: 'publications', component: PublicationsComponent},
      {path: 'teacher-researcher', component: TeacherResearcherComponent},
      {path: 'doctors', component: DoctorsComponent},
      {path: 'phd-students', component: PhdStudentsComponent},
      {path: 'members', component: AllComponent},
      {path: 'partners', component: PartnersComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'profil', component: ProfilComponent},
    ]}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

  {path: 'account', component: NavProfilComponent, canActivate: [LoginGuard], children:
  [
    {path: 'profil', component: ProfilComponent, canActivateChild: [LoginGuard]},
    {path: 'update', component: UpdateProfilComponent, canActivateChild: [LoginGuard]},
    {path: 'requests', component: RequestsComponent, canActivateChild: [LoginGuard]},
    {path: 'members', component: MembersComponent, canActivateChild: [LoginGuard]},
    {path: 'add-article', component: AddArticleComponent, canActivateChild: [LoginGuard]},
    {path: 'edit-event', component: EditEventComponent, canActivateChild: [LoginGuard]},
    {path: 'edit-news', component: EditNewsComponent, canActivateChild: [LoginGuard]},
    {path: 'feedback', component: FeedbackComponent, canActivateChild: [LoginGuard]},
    {path: 'add-news', component: AddNewsComponent, canActivateChild: [LoginGuard]},
    {path: 'add-event', component: AddEventComponent, canActivateChild: [LoginGuard]},
  ]},


]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
