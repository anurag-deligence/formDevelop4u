import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';
import { DataTransferService } from "../../services/data-transfer.service";
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.css']
})
export class RegisterProjectComponent implements OnInit {
  @ViewChild('projectRegisterLR', { static: false }) projectRegisterLR: NgForm;
  projectFile: File;
  projectRegisterDetails = {
    projectType: '',
    budget: '',
    timeline: '',
    getStarted: '',
    locationPref: '',
    technologyPref: '',
    projectDetails: '',
    name: '',
    email: '',
    position: '',
    organization: '',
    location: ''
  }
  constructor(private ngFlashMessageService: NgFlashMessageService,
    private dataTransferService: DataTransferService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }

  updatePhoto(event) {
    console.log(event);
    this.projectFile = <File>event.target.files[0];
  }

  projectRegister() {
    console.log(this.projectRegisterLR.status)
    if (this.projectRegisterLR.status == "VALID") {
      this.ngxService.startLoader('loader-01');
      this.projectRegisterDetails.projectType = this.projectRegisterLR.value.projectType;
      this.projectRegisterDetails.budget = this.projectRegisterLR.value.budget;
      this.projectRegisterDetails.timeline = this.projectRegisterLR.value.timeline;
      this.projectRegisterDetails.getStarted = this.projectRegisterLR.value.getStarted;
      this.projectRegisterDetails.locationPref = this.projectRegisterLR.value.locationPref;
      this.projectRegisterDetails.technologyPref = this.projectRegisterLR.value.technologyPref;
      this.projectRegisterDetails.projectDetails = this.projectRegisterLR.value.projectDetails;
      this.projectRegisterDetails.name = this.projectRegisterLR.value.name;
      this.projectRegisterDetails.email = this.projectRegisterLR.value.email;
      this.projectRegisterDetails.position = this.projectRegisterLR.value.position;
      this.projectRegisterDetails.organization = this.projectRegisterLR.value.organization;
      this.projectRegisterDetails.location = this.projectRegisterLR.value.location;
      this.dataTransferService.registerProjectData(this.projectRegisterDetails, this.projectFile).subscribe(

        (response: any) => {
          this.ngxService.stopLoader('loader-01');
          if (response.status === true)
            Swal.fire("Mail sent")
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
