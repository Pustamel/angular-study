import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Profile, Pageable } from '../interfaces/profile.interface';
import { BASE_URL } from '../../helpers/pipe/consts';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseURL = BASE_URL;

  constructor() {}

  getTestsAccount() {
    return this.http.get<Profile[]>(this.baseURL + '/account/test_accounts');
  }

  getShortListSubs() {
    return this.http.get<Pageable<Profile>>(
      this.baseURL + '/account/subscribers?page=1&size=3'
    ).pipe(
      map(response => response.items)
    )
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseURL}/account/me`);
  }
}
