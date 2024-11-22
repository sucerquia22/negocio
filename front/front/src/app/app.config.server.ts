import { ApplicationConfig } from '@angular/core';



// Define primero `serverConfig`
const serverConfig: ApplicationConfig = {
  providers: [
    { provide: 'API_BASE_URL', useValue: 'http://localhost:3000/api' }, // URL del backend
  ],
};

// Combina `serverConfig` con `appConfig`

export const SERVER_CONFIG = {
  apiBaseUrl: 'http://localhost:3000/api', // URL base del backend
};