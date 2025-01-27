import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export default class ContactListComponent implements OnInit {

  //Almacenar los contactos
  contacts:any[] = [];

  //injectar contactService
  private contactService = inject(ContactService);

  ngOnInit(): void{
    this.contactService.list().subscribe((contacts: any) => {
      this.contacts = contacts;
    });
  }

}
