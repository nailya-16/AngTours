import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { MessageService } from 'primeng/api';

function initializeApp(config: ConfigService) {
  return config.loadPromise();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      },
      translation: {
        dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNamesMin: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        today: 'Текущая дата',
        clear: 'Очистить'
      }
    }),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAppInitializer(() => initializeApp(inject(ConfigService))),
    MessageService
  ]
};
