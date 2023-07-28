import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RerouteComponent } from './reroute/reroute.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'code/:id',
    component: RerouteComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    RerouteComponent
  ],
  exports: [
    RerouteComponent
  ],
})
export class RerouteModule {}
