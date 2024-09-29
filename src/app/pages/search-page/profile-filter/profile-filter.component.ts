import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { debounceTime, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filter.component.html',
  styleUrl: './profile-filter.component.scss',
})
export class ProfileFilterComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });
  constructor() {
    this.searchForm.valueChanges.pipe(
      debounceTime(800),
      switchMap((formValue) => this.profileService.getFilterProfiles(formValue)),
      takeUntilDestroyed()
    ).subscribe()
  }
}
