import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RecordRTCComponent } from './record-rtc/record-rtc.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'record-rtc', component: RecordRTCComponent}
];

export const routing = RouterModule.forRoot(routes);
