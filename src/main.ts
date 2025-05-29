import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // 👈 importante
});