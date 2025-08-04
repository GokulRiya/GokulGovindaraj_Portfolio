import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Restores scroll to top on navigation
      anchorScrolling: 'enabled',           // Enables #anchor navigation
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
