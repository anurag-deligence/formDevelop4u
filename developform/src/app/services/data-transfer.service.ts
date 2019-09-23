import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(private http: HttpClient) { }

  registerProjectData(projectDetailsRegister, projectFile) {
    let headers = new HttpHeaders();
    //headers = headers.append('Content-Type', 'undefined');
    let formData = new FormData();
    formData.append("data", JSON.stringify(projectDetailsRegister));
    formData.append('file', projectFile);

    return this.http.post('http://localhost:3000/details', formData);
  }

}
