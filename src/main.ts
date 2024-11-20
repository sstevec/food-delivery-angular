import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent,
  {
    providers: [
      ...appConfig.providers,  // Spread providers from appConfig
      provideHttpClient()      // Add HttpClient provider
    ]
  })
  .catch((err) => console.error(err));
