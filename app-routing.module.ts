import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';
import { FileListComponent } from './file-list/file-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
  {path: 'special', component: SpecialEventsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'upload-file', component: DocumentUploadComponent,  data: {role: 'ROLE_USER'}},
  {path: 'show-files', component: FileListComponent},
  {path: 'upload-files', component: MultipleFileUploadComponent, canActivate: [AuthGuard], data:{role : 'ROLE_ADMIN'}  // Only users with 'admin' role can access
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }