import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export default class ContactListComponent implements OnInit {

  //injectar contactService
  private contactService = inject(ContactService);

  ngOnInit(): void{
    this.contactService.list().subscribe(contacts => {
      console.log(contacts);
    })
  }

}
