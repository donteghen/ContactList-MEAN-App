import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
messages: string[];
  constructor() { this.clearMessages() }

  addmessages(message:string){
    this.messages.push(message);
  }

  clearMessages(){
    this.messages = [];
  }
}
