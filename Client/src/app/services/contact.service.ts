import { Contact } from './../../contact';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

const url = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit{
  contacts:Contact[]
  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.getContacts();
  }
  // get contacts
  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(url +"/contacts")
    .pipe(catchError((error:Response)=>
    throwError(`Network error : ${error.statusText},  ${error.status}`)));
  }

  // get one contact
  getContact(id:string):Observable<Contact>{
    return this.http.get<Contact>(url +`/contacts/${id}`)
    .pipe(catchError((error:Response)=>
    throwError(`Network error : ${error.statusText},  ${error.status}`)));
  }

  // post a contact
  addContact(contact: Contact):Observable<Contact>{
    return this.http.post<Contact>(url + "/contact", contact)
    .pipe(catchError((error:Response)=>
    throwError(`Network error : ${error.statusText},  ${error.status}`)));
  }

  // update a contact
  update(contact:Contact):Observable<Contact>{
    
    return this.http.put<Contact>(url + `/contacts/${contact._id}`, contact)
    .pipe(catchError((error:Response)=>
    throwError(`Network error : ${error.statusText},  ${error.status}`)));
  }

  // delete a contact
  deleteContact(id:string):Observable<Contact>{
    return this.http.delete<Contact>(url + `/contact/${id}`)
    .pipe(catchError((error:Response)=>
    throwError(`Network error : ${error.statusText},  ${error.status}`)));
  }


}
