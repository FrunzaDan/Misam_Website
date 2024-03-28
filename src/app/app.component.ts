import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Notification } from './interfaces/notification';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './components/notification/notification.component';
import { Observable } from 'rxjs/internal/Observable';
import { Analytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    NotificationComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'Misam';

  notifications$!: Observable<Notification[]>;

  constructor(
    private notificationService: NotificationService,
    private analytics: Analytics
  ) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notifications$;
  }
}
