import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { IPet } from 'src/app/models/IPet';
import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  pets: IPet[] = [];

  constructor(private mainService: MainService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.mainService.getPetsByUserId(this.loginService.loginDetails.user._id).subscribe({
      next: (results: { message: string, pets: IPet[] }) => {
        this.pets = results.pets;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  onPetClicked(pet: IPet) {
    this.router.navigate([`petPage/${pet._id}`]);
  }
}
