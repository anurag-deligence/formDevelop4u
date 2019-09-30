import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';
import { DataTransferService } from "../../services/data-transfer.service";
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.css']
})
export class RegisterProjectComponent implements OnInit {
  id: any;
  projectRegisterLR: FormGroup;
  detail: any;
  projectFile: File;
  constructor(private ngFlashMessageService: NgFlashMessageService,
    private dataTransferService: DataTransferService,
    private ngxService: NgxUiLoaderService,
    private dataService: DataTransferService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    if (this.id !== undefined) {
      var allData = this.dataService.getProjectData();
      for (let data of allData) {
        if (data._id == this.id)
          this.detail = data;
      }
      console.log("filename", this.detail.filename);
      var { projectType, budget, timeline, getStarted, locationPref, technologyPref, projectDetails, filename, name, email, position, organization, location } = this.detail;
    }
    this.projectRegisterLR = new FormGroup({
      'projectType': new FormControl(projectType, Validators.required),
      'budget': new FormControl(budget, Validators.required),
      'timeline': new FormControl(timeline, Validators.required),
      'getStarted': new FormControl(getStarted, Validators.required),
      'locationPref': new FormControl(locationPref),
      'technologyPref': new FormControl(technologyPref),
      'projectDetails': new FormControl(projectDetails, Validators.required),
      'filename': new FormControl(filename),
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'position': new FormControl(position, Validators.required),
      'organization': new FormControl(organization, Validators.required),
      'location': new FormControl(location, Validators.required)
    });
  }

  updateFile(event) {
    this.projectFile = <File>event.target.files[0];
    console.log(this.projectFile)
  }

  projectRegister() {
    if (this.projectRegisterLR.status == "VALID") {
      window.scroll(0, 0);
      this.ngxService.startLoader('loader-01');
      console.log(this.id);
      this.dataTransferService.registerProjectData(this.projectRegisterLR.value, this.id, this.projectFile).subscribe(
        (response: any) => {
          this.ngxService.stopLoader('loader-01');
          if (response.status === true) {
            this.router.navigate([''])
            Swal.fire("Mail sent");
          }
          else
            Swal.fire("Something Wrong..")
        },
        (error) => {
          console.log(error)
        }
      )
    }
    else {
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please fill all the required fields"],
        dismissible: true,
        timeout: false,
        type: 'danger'
      });
    }
  }

}
