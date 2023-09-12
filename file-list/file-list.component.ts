import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  files: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch the list of files from the backend API
    this.http
      .get<{ files: string[] }>('http://localhost:3000/api/uploaded-files')
      .pipe(
        catchError((error) => {
          console.error('Error fetching files:', error);
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        this.files = response.files;
      });
  }
}
