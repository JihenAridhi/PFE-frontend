import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {FooterComponent} from "./components/footer/footer.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {NewsComponent} from "./components/news/news.component";
import {EventsComponent} from "./components/events/events.component";
import {ViewNewsComponent} from "./components/view-news/view-news.component";
import {EventComponent} from "./components/event/event.component";
import {TeamsComponent} from "./components/teams/teams.component";
import {PublicationsComponent} from "./components/publications/publications.component";
import {ContactComponent} from "./components/contact/contact.component";
import {TeacherResearcherComponent} from "./components/teacher-researcher/teacher-researcher.component";
import {DoctorsComponent} from "./components/doctors/doctors.component";
import {PhdStudentsComponent} from "./components/phd-students/phd-students.component";
import {AllComponent} from "./components/all/all.component";
import {PartnersComponent} from "./components/partners/partners.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {NavProfilComponent} from "./components/nav-profil/nav-profil.component";
import {UpdateProfilComponent} from "./components/update-profil/update-profil.component";
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MembersComponent } from './components/members/members.component';
import {AddArticleComponent} from "./components/add-article/add-article.component";
import {EditNewsComponent} from "./components/edit-news/edit-news.component";
import {EditEventComponent} from "./components/edit-event/edit-event.component";
import { RequestsComponent } from './components/requests/requests.component';
import {AddNewsComponent} from "./components/add-news/add-news.component";
import {AddEventComponent} from "./components/add-event/add-event.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NewsComponent,
    EventsComponent,
    ViewNewsComponent,
    EventComponent,
    TeamsComponent,
    PublicationsComponent,
    ContactComponent,
    TeacherResearcherComponent,
    DoctorsComponent,
    PhdStudentsComponent,
    AllComponent,
    PartnersComponent,
    ProfilComponent,
    NavProfilComponent,
    UpdateProfilComponent,
    FeedbackComponent,
    AddArticleComponent,
    EditNewsComponent,
    EditEventComponent,
    MembersComponent,
    AddNewsComponent,
    AddEventComponent,
    RequestsComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
