// file-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDataService {
  private uploadedFilesSubject = new BehaviorSubject<File[]>([]);
  uploadedFiles$ = this.uploadedFilesSubject.asObservable();

  updateUploadedFiles(files: File[]) {
    this.uploadedFilesSubject.next(files);
  }
}
