import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  data: any;
  constructor(private http: HttpClient) { }

  registerProjectData(projectDetailsRegister, id, projectFile) {
    let formData = new FormData();
    formData.append("data", JSON.stringify(projectDetailsRegister));
    formData.append('file', projectFile);
    formData.append('id', id)
    return this.http.post('http://localhost:3000/details', formData);
  }

  getListData() {
    return this.http.get('http://localhost:3000/getlisted')
  }

  deleteData(id) {
    return this.http.post('http://localhost:3000/deleteDetail', id)
  }

  getMap() {
    return this.http.get('http://localhost:3000/getMap');
  }

  setProjectData(data) {
    this.data = data;
  }

  getProjectData() {
    return this.data;
  }
}
