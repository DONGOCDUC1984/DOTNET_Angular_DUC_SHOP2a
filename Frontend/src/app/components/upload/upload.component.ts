import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  url = environment.apiBaseUrl + '/file';
  progress!: number;
  message!: string;
  tokenHeader: any = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  uploadFile(files: any) {
    if (files.length == 0) {
      return;
    }
    var fileToUpload = <File>files[0];
    var formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http
      .post(this.url, formData, {
        reportProgress: true,
        observe: 'events',
        headers: this.tokenHeader,
      })
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }
}
