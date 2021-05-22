import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isDev = !environment.production;
  public menuItems: MenuItem[] = [];
  public noAuthItems: MenuItem[] = [];

  constructor(private auth: AuthenticationService) { }

  public ngOnInit(): void {
    if (this.isDev) {
      this.noAuthItems.push({
        label: 'Test api',
        routerLink: ['/grot/test']
      });
    }

    this.auth.user.subscribe(user => {
      const menuItems = [];
      if (user.id && user.jwtToken) {
        menuItems.push({
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          routerLink: ['/auth/logout']
        });
      } else {
        menuItems.push({
          label: 'Register',
          icon: 'pi pi-fw pi-pencil',
          routerLink: ['/auth/register']
        });
        menuItems.push({
          label: 'Login',
          routerLink: ['/auth/login']
        });
      }

      this.menuItems = [...this.noAuthItems, ...menuItems];
    });
  }

}
