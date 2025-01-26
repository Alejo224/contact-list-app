import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //inyectar dependencia
  private httpClient = inject(HttpClient);
  
  // - - - FUNCIONES - - -
  
  //listar todos los contactos
  list (){
    return this.httpClient.get('http://localhost:8080/api/contacts');
  }

  //obtener contacto por id
  get (id: number){
    return this.httpClient.get(`http://localhost:8080/api/contacts/${id}`);
  }

  //crear contacto
  create (contact: any){
    return this.httpClient.post('http://localhost:808/api/contacts/', contact);
  }

  //actualizar contacto
  update (id: number, contact: any){
    return this.httpClient.put(`http://localhost:8080/api/contacts/${id}`, contact);
  }

  //borrar contacto
  delete (id: number){
    return this.httpClient.delete(`http://localhost:8080/api/contacts/${id}`);
  }


}
