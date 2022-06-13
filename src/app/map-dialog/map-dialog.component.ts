import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit, AfterViewInit{

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap

  styles = [{
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }];

  zoom = 15;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    styles: this.styles
  }


  // width = 400;
  // height = 400;

  constructor(private dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private detector: ChangeDetectorRef) {
        this.center = {
          lat: data.lat,
          lng: data.lng,
        }
     }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map.zoomChanged.subscribe(() => {
      this.zoom = this.map.zoom;
      this.detector.detectChanges();
    })
  }

  onMarkerClicked() {
    if (this.map.zoom !== 30) {
      this.zoom = 30;
      this.detector.detectChanges();
    }
    this.center = {...this.center};
  }

}
