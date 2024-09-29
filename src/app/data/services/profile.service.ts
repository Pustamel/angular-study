import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Profile, Pageable } from '../interfaces/profile.interface';
import { BASE_URL } from '../../helpers/pipe/consts';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseURL = BASE_URL;

  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([])

  constructor() {}

  getTestsAccount() {
    return this.http.get<Profile[]>(this.baseURL + '/account/test_accounts');
  }

  getShortListSubs(size: number) {
    return this.http
      .get<Pageable<Profile>>(
        this.baseURL + `/account/subscribers/?page=1&size=${size}`
      )
      .pipe(map((response) => response.items));
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseURL}/account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getProfileUser(id: string) {
    return this.http
      .get<Profile>(`${this.baseURL}/account/${id}`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getFilterProfiles(params: Record<string, any>) {
    return this.http
    .get<Pageable<Profile>>(`${this.baseURL}/account/accounts`, {params})
    .pipe(
      tap(res => this.filteredProfiles.set(res.items))
    )
  }

  updateProfileUser(data: Partial<NonNullable<Profile>>) {
    return this.http
      .patch<Profile>(`${this.baseURL}/account/me`, data)
      .pipe(tap((res) => this.me.set(res)));
  }

  uploadPhoto(image: File) {    
    const formData = new FormData();
    formData.append('image', image);
    return this.http
      .post<Profile>(`${this.baseURL}/account/upload_image`, formData)
      .pipe(tap((res) => this.me.set(res)));
  }
}
