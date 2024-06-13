import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HousingApiService } from './housing-api.service';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    HttpClientModule,
    RouterModule,
  ],
  providers: [HousingApiService],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
