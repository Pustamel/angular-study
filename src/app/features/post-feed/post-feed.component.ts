import { Component } from '@angular/core';
import { PostComponent } from "./UI/post/post.component";
import { InputComponent } from "./UI/input/input.component";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostComponent, InputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {

}
