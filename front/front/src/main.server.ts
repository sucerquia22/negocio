import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { SERVER_CONFIG } from './app/app.config.server';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
      { provide: 'API_BASE_URL', useValue: SERVER_CONFIG.apiBaseUrl },
    ],
  });
}
