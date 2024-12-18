import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { PollingComponent } from './app/polling-component/polling-component.component';

bootstrapApplication(PollingComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));
