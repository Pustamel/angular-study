import {Component, inject} from '@angular/core';
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interfaces/profile.interface";
import {ProfileCardComponent} from "../../UI/profile-card/profile-card.component";
import { ProfileFilterComponent } from './profile-filter/profile-filter.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFilterComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles
  constructor () {
    
  }
}
