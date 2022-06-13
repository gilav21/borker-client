import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss']
})
export class UploadPhotosComponent implements OnInit {

  @Input() singlePhoto: boolean = false;
  @Output() photoAdded = new EventEmitter<File>();
  @Output() photoRemoved = new EventEmitter<File>();
  photos: {filePath: string, name: string, file?: File}[] = [];

  hoveredPhoto = null;



  constructor() { }

  ngOnInit(): void {
  }

  onFileInput(event) {
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      for (let i =0; i< files.length; i++) {
        const fileIndex = this.photos.findIndex(photo => photo.name === files[i].name);
        if (fileIndex === -1) {
          const reader = new FileReader();
          reader.onload= () => {
            this.photos.push({name: files[i].name, filePath: reader.result as string, file: files[i]});
            this.photoAdded.emit(files[i]);
          }
          reader.readAsDataURL(files[i]);
        }
      }

    }
  }

  onRemovePhoto(index) {
    this.photoRemoved.emit(this.photos[index].file);
    this.photos.splice(index, 1);
  }

}
