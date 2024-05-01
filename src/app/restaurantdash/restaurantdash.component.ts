import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-restaurantdash',
  templateUrl: './restaurantdash.component.html',
  styleUrls: ['./restaurantdash.component.scss'],
})
export class RestaurantdashComponent implements OnInit {
  allRestaurantData: any;
  myGroup!: FormGroup;
  page: number = 1;
  totalLength: any;
  restaurantModelObj: RestaurantData = new RestaurantData();
  showAdd!: boolean;
  showBtn!: boolean;
  userFilter: any = { name: '' };

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.myGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      services: ['', Validators.required],
    });
    this.getAllRestaurant();
  }

  // Get all restaurant Data
  getAllRestaurant() {
    return this.apiService.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
      console.log(this.allRestaurantData);
    });
  }

  clickAddResto() {
    this.myGroup.reset();
    this.showAdd = true;
    this.showBtn = false; // for update button
  }

  addrestaurant() {
    this.restaurantModelObj.name = this.myGroup.value.name;
    this.restaurantModelObj.email = this.myGroup.value.email;
    this.restaurantModelObj.address = this.myGroup.value.address;
    this.restaurantModelObj.mobile = this.myGroup.value.mobile;
    this.restaurantModelObj.services = this.myGroup.value.services;

    return this.apiService.postRestaurant(this.restaurantModelObj).subscribe(
      (data: any) => {
        console.log(data);
        this.toast.success({
          detail: 'Update Message',
          summary: 'Record Added Successfully',
          duration: 4000,
        });
        this.myGroup.reset();
        this.getAllRestaurant();
        // return data;
      },
      (err: any) => {
        console.log(err);
        return this.toast.error({
          detail: 'Error Message',
          summary: 'Something went wrong',
          duration: 4000,
        });
      }
    );
  }

  // Delete resto
  deleteResto(id: number) {
    this.apiService.deleteRestaurant(id).subscribe(
      () => {
        this.toast.info({
          detail: 'Delete Message',
          summary: 'Record Deleted Successfully',
          duration: 4000,
        });
        this.getAllRestaurant();
      },
      (err) => {
        return this.toast.error({
          detail: 'Error Message',
          summary: 'Something went wrong',
          duration: 4000,
        });
      }
    );
  }

  onEditResto(data: any) {
    this.restaurantModelObj.id = data.id;
    this.showAdd = false; // add hide
    this.showBtn = true;
    this.myGroup.controls['name'].setValue(data.name);
    this.myGroup.controls['email'].setValue(data.email);
    this.myGroup.controls['mobile'].setValue(data.mobile);
    this.myGroup.controls['address'].setValue(data.address);
    this.myGroup.controls['services'].setValue(data.services);
  }

  // Update Resto
  updateResto() {
    this.restaurantModelObj.name = this.myGroup.value.name;
    this.restaurantModelObj.email = this.myGroup.value.email;
    this.restaurantModelObj.address = this.myGroup.value.address;
    this.restaurantModelObj.mobile = this.myGroup.value.mobile;
    this.restaurantModelObj.services = this.myGroup.value.services;

    this.apiService
      .updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id)
      .subscribe(
        () => {
          this.toast.success({
            detail: 'Update Message',
            summary: 'Record Updated Successfully',
            duration: 4000,
          });
          this.myGroup.reset();
          this.getAllRestaurant();
        },
        (err) => {
          return this.toast.error({
            detail: 'Error Message',
            summary: 'Something went wrong',
            duration: 4000,
          });
        }
      );
  }

  // Logout
  logout() {
    this.toast.success({
      detail: 'Update Message',
      summary: 'Logout successfully',
      duration: 4000,
    });
  }
}
