import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'contacts', component:ContactsComponent},
  {path:'contacts/:id', component:ContactDetailsComponent},
  {path:'', pathMatch:'full', redirectTo:'/contacts'},
  {path:'**', component:ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
