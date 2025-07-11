import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, inject, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../environments/environment';
import { ProfileStateService } from '@bookstore-app/shared-lib';


@Component({
  selector: 'app-account-form',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {

  profile = inject(ProfileStateService)

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  })

  async ngOnInit() {
    try {
      this.form.patchValue({
        name: this.profile.name(),
        email: this.profile.email(),
      });

      this.form.controls.name.valueChanges.subscribe(name => {
        if (name) this.profile.name.set(name);
      })
      this.form.controls.email.valueChanges.subscribe(email => {
        if (email) this.profile.email.set(email);
      })
    } catch (err) {
      console.log('load error', { err });
    }
  }

}
