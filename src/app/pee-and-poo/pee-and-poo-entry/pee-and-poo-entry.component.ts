import { MainService } from './../../services/main.service';
import { PeeAndPooService } from './../pee-and-poo.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IPeeAndPoo } from './../../models/IPeeAndPoo';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pee-and-poo-entry',
  templateUrl: './pee-and-poo-entry.component.html',
  styleUrls: ['./pee-and-poo-entry.component.scss']
})
export class PeeAndPooEntryComponent implements OnInit {

  @Input() peeAndPoo: IPeeAndPoo;
  @Input() petId: string;
  @Input() isReadOnly: boolean = true;
  @Input() disabled: boolean = false;

  @Output() entryCreated = new EventEmitter();

  showQualitySelector = false;
  type: 'Pee' | 'Poo';
  formGroup;

  mapMarkerIcon

  constructor(private formBuilder: FormBuilder, private peeAndPooService: PeeAndPooService, private mainService: MainService) {
    this.formGroup = this.formBuilder.group({
      quality: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      photos: new FormControl([]),
      description: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.peeAndPoo) {
      this.formGroup = this.formBuilder.group({
        quality: new FormControl(this.peeAndPoo.quality, Validators.required),
        type: new FormControl(this.peeAndPoo.type, Validators.required),
        photos: new FormControl(this.peeAndPoo.photos),
        description: new FormControl(this.peeAndPoo.description)
      });
    }
    this.formGroup.get('type').valueChanges.subscribe(event => {
      this.showQualitySelector = true;
      this.type = event;
    });
    this.mapMarkerIcon = faMapMarkerAlt;
  }

  onSaveEntry() {
    const values = this.formGroup.getRawValue();
    navigator.geolocation.getCurrentPosition(loc => {
      const peeAndPoo: IPeeAndPoo = {
        description: values.description,
        petId: this.petId,
        quality: values.quality,
        type: values.type,
        photos: null,
        location: `${loc.coords.latitude}:${loc.coords.longitude}`
      }
      this.peeAndPooService.createPeeAndPoo(peeAndPoo).subscribe((res: { message: string, id: string }) => {
        console.log('Created pee and poo :', res);
        peeAndPoo._id = res.id
        this.entryCreated.emit(peeAndPoo);
      });
    })
  }

  onOpenMap() {
    this.mainService.openMap(this.peeAndPoo.location);
  }

}
