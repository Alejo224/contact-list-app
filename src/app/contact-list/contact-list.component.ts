import { Contact } from './../interfaces/contact.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';



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
    this.loadAll();
  }

  //metodo para mostrarlos contactos creados
  loadAll(){
    this.contactService.list().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  //metodo borrar
  deleteContact(contact: Contact){
    this.contactService.delete(contact.id).subscribe(() => {
      //Actualiazar la data que visualiza el ususario
      this.loadAll();
    });
  }

}
