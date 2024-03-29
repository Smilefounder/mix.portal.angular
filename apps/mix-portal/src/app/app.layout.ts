import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { InitStep } from '@mix-spa/mix.lib';
import { AuthApiService, TenancyApiService } from '@mix-spa/mix.share';
import { TuiRootModule } from '@taiga-ui/core';
import { filter } from 'rxjs';

@Component({
  selector: 'mix-spa-root',
  template: `
    <tui-root>
      <div *ngIf="!isLoading; else loading" class="main-page">
        <router-outlet></router-outlet>
      </div>

      <ng-container ngProjectAs="tuiOverContent"> </ng-container>
      <ng-container ngProjectAs="tuiOverDialogs"> </ng-container>
      <ng-container ngProjectAs="tuiOverAlerts"> </ng-container>
      <ng-container ngProjectAs="tuiOverPortals"> </ng-container>
      <ng-container ngProjectAs="tuiOverHints"> </ng-container>
    </tui-root>

    <ng-template #loading>
      <div class="wrapper loading-box">
        <img src="assets/images/loading.svg" width="80px" />
      </div>
    </ng-template>
  `,
  styles: [
    `
      .wrapper {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        flex-direction: column;
        display: flex;
      }

      .loading-box {
        align-items: center;
        justify-content: center;
      }

      .main-page {
        width: 100vw;
        height: 100vh;
        overflow: auto;
      }
    `
  ],
  standalone: true,
  imports: [CommonModule, TuiRootModule, RouterModule]
})
export class AppComponent {
  public isLoading = true;

  constructor(
    private tenantApi: TenancyApiService,
    private route: Router,
    private auth: AuthApiService,
    private activeRoute: ActivatedRoute
  ) {
    this.checkSystem();
    this.setupHeader();
  }

  private checkSystem(): void {
    this.tenantApi.getInitStatus().subscribe((res: InitStep) => {
      if (res === InitStep.Blank) {
        this.route.navigateByUrl('/init');
        this.isLoading = false;
        return;
      } else {
        this.initAuthorization();
      }
    });
  }

  private initAuthorization(): void {
    this.auth.fetchUserInfo().subscribe({
      next: res => {
        this.auth.user$.next(res);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private setupHeader(): void {
    this.route.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(v => {
      console.log(this.activeRoute.snapshot);
    });
  }
}
