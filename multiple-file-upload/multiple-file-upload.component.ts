import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.css']
})
export class MultipleFileUploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  files: File[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const files = event.target.files;

    if (files.length) {
      this.status = "initial";
      this.files = files;
    }
  }

  onUpload() {
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append("files", file, file.name);
      });

      const upload$ = this.http.post('http://localhost:3000/api/upload-files', formData);

      this.status = "uploading";

      upload$.subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = 'fail';
          console.error('Upload error:', error);
          // You can handle the error here or rethrow it if needed
          // return throwError(() => error);
        },
      });
    }
  }
}
