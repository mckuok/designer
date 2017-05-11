import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {GlobalCacheService} from "./global/global.cache.service";

platformBrowserDynamic().bootstrapModule(AppModule);
