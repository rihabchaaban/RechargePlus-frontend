import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RechargePlus';

  constructor(public router: Router) {}

  isBackOffice(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
