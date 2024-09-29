import { Component, inject } from '@angular/core';
import { UserShortInfoComponent } from '../../UI/user-short-info/user-short-info.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../UI/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../../UI/sidebar/subscriber-card/subscriber-card.component';
import { ImgUrlPipe } from '../../helpers/pipe/img-url.pipe';
import { PostFeedComponent } from '../../features/post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    UserShortInfoComponent,
    CommonModule,
    RouterLink,
    SvgIconComponent,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = toObservable(this.profileService.me);
  currentId = 'me'
  subscribers$ = this.profileService.getShortListSubs(6);
  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.currentId = id
      if (id === 'me') {
        return this.me$;
      }
      return this.profileService.getProfileUser(id);
    })
  );
}
