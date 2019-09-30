import { Component, OnInit } from '@angular/core';
import { DataTransferService } from "../../services/data-transfer.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-listed',
  templateUrl: './get-listed.component.html',
  styleUrls: ['./get-listed.component.css']
})
export class GetListedComponent implements OnInit {
  details: any;
  constructor(private dataService: DataTransferService,
    private router: Router) { }

  ngOnInit() {
    console.log("running");
    this.dataService.getListData().subscribe(
      (response: any) => {
        console.log(response.msg)
        if (response.status === true) {
          this.dataService.setProjectData(response.msg);
          this.details = response.msg;
        }
      },
      (error) => { console.log(error); }
    )
  }

  deleteData(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.dataService.deleteData({ id: id }).subscribe(
          (response: any) => {
            console.log(response)
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
            this.ngOnInit();
          },
          (error) => { console.log(error) }
        )
      }
    })
  }

  editData(id) {
    this.router.navigate(['/registerproject', id])
  }

  fun() {
    this.dataService.getMap().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
