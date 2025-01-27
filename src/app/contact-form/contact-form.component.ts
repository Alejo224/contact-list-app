import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export default class ContactFormComponent {

  //injectar un formBuilder
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  //navegar hacia la lista de contacto 
  private router = inject(Router);

  //formulario .controlamos nuestro controles
  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });

  //METODO CREATE
  create(){
    console.log(this.form.value);
    const contact = this.form.value;
    this.contactService.create(contact)
      .subscribe(() => {
        this.router.navigate(['/']);
    });
  }

}
