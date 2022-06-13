import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quality-selector',
  templateUrl: './quality-selector.component.html',
  styleUrls: ['./quality-selector.component.scss']
})
export class QualitySelectorComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() type: 'Pee' | 'Poo';
  @Input() isReadOnly = true;
  constructor() { }

  ngOnInit(): void {
  }

}
