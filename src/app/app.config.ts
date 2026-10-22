import {
  ApplicationConfig,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideStore } from '@ngrx/store';

import {
  enrolmentReducer
} from './app.enrolment.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),

    provideStore({
      enrolment: enrolmentReducer
    })
  ]
};