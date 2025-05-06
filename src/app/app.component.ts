import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RechargePlus';

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/signin' || currentRoute === '/signup'|| currentRoute === '/forgot-password' ||currentRoute.startsWith('/reset-password');;
  }
}
