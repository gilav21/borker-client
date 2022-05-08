import { Router } from '@angular/router';
import { IPet } from 'src/app/models/IPet';
import { IUserDetails } from './../../../models/ILoginDetails';
import { MainService } from './../../../services/main.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {

  formGroup: FormGroup;
  ownerControl = new FormControl();
  nameControl = new FormControl();
  autoCompleteOwners: IUserDetails[] = [];
  owners: IUserDetails[] = [];


  @ViewChild('ownerInput') ownerInput;

  constructor(private mainService: MainService, private router: Router) {
  }

  ngOnInit(): void {
    this.ownerControl.valueChanges.subscribe(val => {
      this.mainService.getUsersBy(val).subscribe((results: { message: string, users: IUserDetails[] }) => {
        this.autoCompleteOwners = results.users;
      });
    });
  }

  removeOwner(owner) {
    const index = this.owners.indexOf(owner);
    if (index !== -1) {
      this.owners.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const ownerName = event.option.viewValue;
    this.owners.push(this.autoCompleteOwners.find(owner => `${owner.firstName} ${owner.lastName}` === ownerName));
    this.ownerControl.setValue(null);
    this.ownerInput.nativeElement.value ='';
  }

  onAddClicked() {
    const newPet: IPet = {
      name: this.nameControl.value,
      owners: this.owners.map(owner => owner._id),
      photos: []
    };
    this.mainService.addPet(newPet).subscribe({
      next: results => {
        console.log('Pet added');
        this.router.navigate(['main']);
      },
      error: err => {
        console.error('Error while adding pet', err);
        err.message;
      }
    });
  }

}
