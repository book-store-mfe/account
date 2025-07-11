import { Injectable, signal } from '@angular/core';
import { ProfileState } from '../profile-state'


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  name = ProfileState.name;
  email = ProfileState.email;

  constructor() { }
}
