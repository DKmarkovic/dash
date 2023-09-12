import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-document-upload', // Replace 'app-document-upload' with your desired selector
  templateUrl: './document-upload.component.html', // Update the path to your HTML template
  styleUrls: ['./document-upload.component.css'], // Update the paths to your CSS styles
})
export class DocumentUploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();

      formData.append("file", this.file, this.file.name);

      const upload$ = this.http.post('http://localhost:3000/api/upload-file', formData);

      this.status = "uploading";

      upload$.subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = "fail";
          console.error('Upload error:', error);
        },
      });
    }
  }
}