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
  nameControl = new FormControl('', Validators.required);
  descControl = new FormControl('', Validators.required);
  autoCompleteOwners: IUserDetails[] = [];
  owners: IUserDetails[] = [];
  photos: File[] = [];


  isFormValid = false;

  @ViewChild('ownerInput') ownerInput;

  constructor(private mainService: MainService, private router: Router) {
  }

  ngOnInit(): void {
    this.nameControl.valueChanges.subscribe(val => {
      this.checkIsValid();
    });

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
    this.checkIsValid();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const ownerName = event.option.viewValue;
    this.owners.push(this.autoCompleteOwners.find(owner => `${owner.firstName} ${owner.lastName}` === ownerName));
    this.ownerControl.setValue(null);
    this.ownerInput.nativeElement.value = '';
    this.checkIsValid();
  }

  onAddClicked() {
    const newPet: IPet = {
      name: this.nameControl.value,
      owners: this.owners.map(owner => owner._id),
      photos: [],
      profilePhoto: '',
      description: this.descControl.value
    };
    this.mainService.addPet(newPet).subscribe({
      next: (results: any) => {
        console.log('Pet added');
        if (this.photos.length > 0) {
          this.mainService.uploadPetImages(results.petId, this.photos).subscribe({
            next: photos => {
              console.log('Photos added', photos);
              this.mainService.changeProfileImage(results.petId, photos[0]);
              this.router.navigate(['main']);
            },
            error: err => {
              console.error('Got an error while uploading photos', err);
            }
          });
        } else {
          this.router.navigate(['main']);
        }
      },
      error: err => {
        console.error('Error while adding pet', err);
        err.message;
      }
    });
  }

  checkIsValid() {
    this.isFormValid = this.nameControl.valid && this.owners && this.owners.length > 0;
  }

  onPhotoAdded(photo: File) {
    this.photos.push(photo);
  }

  onPhotoRemoved(photo: File) {
    const index = this.photos.indexOf(photo);
    if (index !== -1) {
      this.photos.splice(index, 1);
    }
  }

}
