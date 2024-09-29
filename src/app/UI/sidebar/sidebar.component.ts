import { Component, inject, signal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipe/img-url.pipe';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    CommonModule,
    ImgUrlPipe,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getShortListSubs(3);
  me = this.profileService.me;
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'house',
      link: '/profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chattik',
      link: 'chat',
    },
    {
      label: 'Поиск',
      icon: 'loupe',
      link: 'search',
    },
  ];
  constructor() {}

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
