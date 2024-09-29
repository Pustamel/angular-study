import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { UserShortInfoComponent } from '../../UI/user-short-info/user-short-info.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgIconComponent } from '../../UI/svg-icon/svg-icon.component';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { firstValueFrom } from 'rxjs';
import { PhotoComponent } from './photo/photo.component';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    UserShortInfoComponent,
    RouterLink,
    ReactiveFormsModule,
    SvgIconComponent,
    PhotoComponent,
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  showStack = signal<string[]>([]);

  @ViewChild(PhotoComponent) photoLoader: any;

  constructor() {
    effect(
      () => {
        const me = this.profileService.me();
        if (me) {
          me.stack && this.showStack.set(me.stack);
          this.form.patchValue({ ...me, stack: this.joinStack(me.stack) });
        }
      },
      { allowSignalWrites: true }
    );
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.photoLoader.avatar) {
      firstValueFrom(this.profileService.uploadPhoto(this.photoLoader.avatar));
    }

    firstValueFrom(
      this.profileService.updateProfileUser({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack as string),
      } as NonNullable<Profile>)
    );
  }

  splitStack(stack: string): string[] {
    if (!stack) return [];
    return stack.split(',');
  }

  joinStack(stack: null | string[]) {
    return stack ? stack.join(',') : '';
  }
}
