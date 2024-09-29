import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/pipe/img-url.pipe";

@Component({
  selector: 'app-user-short-info',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './user-short-info.component.html',
  styleUrl: './user-short-info.component.scss'
})
export class UserShortInfoComponent {
 @Input() profile!: Profile;
}
