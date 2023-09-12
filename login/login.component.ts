import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  // Define properties within loginUserData
  loginUserData = {
    email: '',
    password: ''
  };

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private dialog: MatDialog // Inject MatDialog here
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  loginUser(){
    this._auth.loginUser(this.loginForm.value.username, this.loginForm.value.password);
  }
  

  


   // Open the error dialog when there's an error
 //  this.openErrorDialog('An error occurred during login.');
  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message }, // Pass the error message to the dialog component
    });
  }
}
