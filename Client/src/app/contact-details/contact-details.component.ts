import { Contact } from './../../contact';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
contact = new Contact();
form : FormGroup;

submitted:boolean =false;
  constructor(private activeRoute: ActivatedRoute, private contService:ContactService, private router:Router) { }

  ngOnInit(): void { 
    this.form = new FormGroup({
      _id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });
  this.getContact();
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }

    getContact(){
       
      var id: Observable<string> = this.activeRoute.params.pipe(map(c => c.id));
      id.subscribe(id =>{
          const myid = id;
          console.log(myid);
          this.contService.getContact(myid).subscribe(data =>{             
          Object.assign(this.contact, data);
          this.form.patchValue({
            _id:this.contact._id,
            firstName : this.contact.firstName,
            lastName:this.contact.lastName,
            phoneNumber:this.contact.phoneNumber
          }) 
        })
      });
    }

    save(){
      
      if(this.form.valid){
        
        this.submitted = true;
        this.contService.update(this.form.value).subscribe(()=>{
          console.log("successfully updated")
       })
       this.router.navigateByUrl('/contacts');
      }
    }
}
