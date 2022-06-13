import { IPet } from 'src/app/models/IPet';
import { PhotosService } from './../photos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photos-view',
  templateUrl: './photos-view.component.html',
  styleUrls: ['./photos-view.component.scss']
})
export class PhotosViewComponent implements OnInit {

  @Input() pet: IPet;
  @Input() photos: { filePath: string, name: string, file?: File }[] = [];
  @Input() isViewOnly = false;

  @Output() photoRemoved = new EventEmitter();
  hoveredPhoto = null;

  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
  }

  openPhotoDialog(index) {
    const url = this.photos[index].filePath;
    this.photosService.openPhotoDialog(url, index === 0, index === this.photos.length - 1, this.pet).afterClosed().subscribe((results: string) => {
      if (results === 'prev') {
        if (index > 0) {
          this.openPhotoDialog(index - 1);
        }
      } else if (results === 'next') {
        if (index < this.photos.length) {
          this.openPhotoDialog(index + 1);
        }
      }
    });
  }

}
