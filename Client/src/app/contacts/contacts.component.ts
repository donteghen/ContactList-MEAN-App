import { Observable } from 'rxjs';
import { Contact } from './../../contact';
import { ContactService } from './../services/contact.service';
import { MessageService } from './../services/message.service';
import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts:Contact[];
  creating:boolean = false;
  form:NgForm;
  constructor(private messageService:MessageService, private contService:ContactService) { }

  ngOnInit(): void {

    this.getContacts();
  }
 

  getContacts(){
    this.contService.getContacts().subscribe((data)=>{
      this.contacts = data;
      console.log(data)
    })
  }


  deleteContact(id:string){
    this.contService.deleteContact(id).subscribe((contact)=>{
      this.messageService.addmessages(`${contact.firstName} has been successfully deleted`);
    });
   // console.log("delete successful")
    this.getContacts();
    //console.log(this.contacts)
  }

  checkId(id:string){
    console.log(id);
  }
  
  // add form to template
  addContact(){
    this.creating = true;
  }
 //
 cancelContact(form:NgForm){
   form.resetForm();
   this.creating = false;
 }
  // submit saved form
  save(form:NgForm){
    if(form.valid){
     var newContact = new Contact( null,form.value.firstName, form.value.lastName, form.value.phoneNumber);
     this.contService.addContact(newContact).subscribe(data =>{
       this.messageService.addmessages("successfully added");
     })
      this.creating = false;
      this.getContacts();
    }
  }
}
