import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from "./UI/profile-card/profile-card.component";
import {ProfileService} from "./data/services/profile.service";
import {Profile} from "./data/interfaces/profile.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'study-angular';
  profileService = inject(ProfileService)

  ngOnInit() {
    // this.profileService.getMe().subscribe(val => {})
  }
}
