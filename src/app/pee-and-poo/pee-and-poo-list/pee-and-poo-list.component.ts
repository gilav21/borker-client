import { IPeeAndPoo } from './../../models/IPeeAndPoo';
import { PeeAndPooService } from './../pee-and-poo.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-pee-and-poo-list',
  templateUrl: './pee-and-poo-list.component.html',
  styleUrls: ['./pee-and-poo-list.component.scss']
})
export class PeeAndPooListComponent implements OnInit, OnChanges {

  @Input() petId: string;

  peeAndPoops: IPeeAndPoo[] = [];

  isAdding: boolean = false;
  sortingDirection: number = -1;


  sortAscIcon;
  sortDescIcon;

  constructor(private peeAndPooService: PeeAndPooService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('petId') && this.petId) {
      this.peeAndPooService.getPetPeeAndPoo(this.petId).subscribe({
        next: (results: {message: string, peeAndPoops: IPeeAndPoo[]})=>  {
          console.log(results);
          this.peeAndPoops = results.peeAndPoops;
        },
        error: err=> {
          console.error('Error while bringing pee and poo', err);
        }
      });
    }
  }

  getData({sortBy = 'createdAt', direction = -1}: {sortBy?: string, direction?: number}) {
    this.peeAndPooService.getPetPeeAndPoo(this.petId, sortBy, direction).subscribe({
      next: (results: {message: string, peeAndPoops: IPeeAndPoo[]})=>  {
        this.peeAndPoops = results.peeAndPoops;
      },
      error: err=> {
        console.error('Error while bringing pee and poo', err);
      }
    });
  }

  ngOnInit(): void {
    this.sortAscIcon = faSortAsc;
    this.sortDescIcon = faSortDesc;
  }

  onAddEntry() {
    this.isAdding = true;
  }

  onEntryCreated(peeAndPoo: IPeeAndPoo) {
    this.isAdding = false;
    this.peeAndPoops.splice(0, 0, peeAndPoo);
  }

  toggleSort() {
    this.sortingDirection *=-1;
    this.getData({direction: this.sortingDirection});
  }

}
