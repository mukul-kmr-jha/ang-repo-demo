import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// INFO ADD THE ROUTES TO server/routes/index.ts to access urls in build
const routes: Routes = [
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
