import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //inyectar dependencia
  private httpClient = inject(HttpClient);
  
  // - - - FUNCIONES - - -
  
  //listar todos los contactos
  list (){
    return this.httpClient.get<Contact[]>('http://localhost:8080/api/contacts');
  }

  //obtener contacto por id
  get (id: number){
    return this.httpClient.get<Contact>(`http://localhost:8080/api/contacts/${id}`);
  }

  //crear contacto
  create (contact: Contact){
    return this.httpClient.post<Contact>("http://localhost:8080/api/contacts", contact);
  }

  //actualizar contacto
  update (id: number, contact: Contact){
    return this.httpClient.put<Contact>(`http://localhost:8080/api/contacts/${id}`, contact);
  }

  //borrar contacto
  delete (id: number){
    return this.httpClient.delete<void>(`http://localhost:8080/api/contacts/${id}`);
  }
}
