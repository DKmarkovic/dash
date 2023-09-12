import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileSizePipe } from './file-size.pipe';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    SpecialEventsComponent,
    ErrorDialogComponent,
    HomeComponent,
    DocumentUploadComponent,
    MultipleFileUploadComponent,
    FileListComponent,
    FileSizePipe,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule,
    
  ],
  providers: [AuthService, AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }