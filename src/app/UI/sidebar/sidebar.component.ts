import { Component, inject } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { CommonModule } from '@angular/common';
import { Pageable, Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, SubscriberCardComponent, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getShortListSubs()
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'house',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chattik',
      link: 'chat'
    },
    {
      label: 'Поиск',
      icon: 'loupe',
      link: 'search'
    }
  ]
  constructor() {

  }
}
