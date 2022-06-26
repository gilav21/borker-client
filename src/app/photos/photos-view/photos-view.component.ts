import { IPet } from 'src/app/models/IPet';
import { PhotosService } from './../photos.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Component({
  selector: 'app-photos-view',
  templateUrl: './photos-view.component.html',
  styleUrls: ['./photos-view.component.scss']
})
export class PhotosViewComponent implements OnInit, OnChanges {

  @Input() pet: IPet;
  @Input() photos: { filePath?: string, photoId?: string, name: string, file?: File }[] = [];
  @Input() isViewOnly = false;

  @Output() photoRemoved = new EventEmitter();
  hoveredPhoto = null;

  constructor(private photosService: PhotosService, private env: EnviromentService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('photos')) {
      this.photos = this.photos.map(photo => {
        if (photo.photoId) {
          photo.filePath = this.env.GET_PET_IMAGE + photo.photoId
        }
        return photo;
      });
    }
  }

  ngOnInit(): void {
  }

  openPhotoDialog(index) {
    const photoId = this.photos[index].photoId;
    this.photosService.openPhotoDialog(photoId, index === 0, index === this.photos.length - 1, this.pet).afterClosed().subscribe((results: string) => {
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
