import { BorkerSelectors } from 'src/app/redux/borker.types';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { IPet } from 'src/app/models/IPet';
import { MainService } from './../services/main.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  pets$: Observable<IPet[]>;

  constructor(private mainService: MainService,
    private loginService: LoginService,
    private store: Store<any>,
    private router: Router) { }

  ngOnInit(): void {
    this.pets$ = this.store.select(BorkerSelectors.selectPets);
    this.mainService.getPetsByUserId(this.loginService.loginDetails.user._id);
    // this.mainService.getPetsByUserId(this.loginService.loginDetails.user._id).subscribe({
    //   next: (results: { message: string, pets: IPet[] }) => {
    //     this.pets = results.pets;
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // })
  }

  onPetClicked(pet: IPet) {
    this.router.navigate([`petPage/${pet._id}`]);
  }
}
