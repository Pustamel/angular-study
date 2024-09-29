import { Component, effect, inject, signal } from '@angular/core';
import { SvgIconComponent } from '../../../UI/svg-icon/svg-icon.component';
import { DndDirective } from '../../../helpers/directives/dnd.directive';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { ImgUrlPipe } from '../../../helpers/pipe/img-url.pipe';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [SvgIconComponent, DndDirective, FormsModule, ImgUrlPipe],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
})
export class PhotoComponent {
  preview = signal('/assets/imgs/default-image.png');
  profileService = inject(ProfileService);
  avatar: File | null = null;

  constructor() {
    effect(
      () => {
        const avatarUrl = this.profileService.me()?.avatarUrl;
          const imgPipe = new ImgUrlPipe()
          if(avatarUrl) {
            this.preview.set(imgPipe.transform(avatarUrl));
          }
        
      },
      { allowSignalWrites: true }
    );
  }

  fileHandler(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const file = files ? files[0] : null;
    this.readerFile(file);
  }

  onFileDropped(file: File) {
    this.readerFile(file);
  }

  readerFile(file: null | File) {
    if (!file || !file.type.match('image')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      this.preview.set(
        event.target?.result?.toString() ?? '/assets/imgs/default-image.png'
      );
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
