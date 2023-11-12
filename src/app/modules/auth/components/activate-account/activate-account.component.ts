import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit, OnDestroy {
  sub = new Subscription();
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      const token = params['token'];
      this.authService.activate(token).subscribe({
        next: (response) => {
          this.notifierService.notify('success', response.message);
          this.router.navigate(['/auth']);
        },
        error: (response) => {
          this.error = response.error.message;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
