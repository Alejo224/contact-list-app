import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../interfaces/contact.interface';


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export default class ContactListComponent implements OnInit {

  //Almacenar los contactos
  contacts:Contact[] = [];

  //injectar contactService
  private contactService = inject(ContactService);

  ngOnInit(): void{
    this.contactService.list().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

}
