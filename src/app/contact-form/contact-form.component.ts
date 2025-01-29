import { Contact } from './../interfaces/contact.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export default class ContactFormComponent implements OnInit {

  // Inyectar dependencias
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Formulario reactivo
  form?: FormGroup;

  // Atributo para hacer dinámico el texto
  contact?: Contact;

  // Array para almacenar errores
  errors: {mensaje: string, campo: string}[] = [];

  ngOnInit(): void {
    // Obtener el ID del contacto desde la ruta
    const id = this.route.snapshot.paramMap.get('id');

    // Verificar si existe el ID
    if (id) {
      this.contactService.get(parseInt(id)).subscribe(contact => {
        this.contact = contact; // Inicializar el atributo para cambiar el texto
        this.form = this.fb.group({
          name: [contact.name, [Validators.required]],
          email: [contact.email, [Validators.required, Validators.email]],
        });
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]], // Campo obligatorio
        email: ['', [Validators.required, Validators.email]], // Campo obligatorio y formato de email
      });
    }
  }

  // Método para guardar el contacto
  save() {
    // Validar si el formulario es inválido
    if (this.form?.invalid) {
      this.errors = [{ mensaje: 'Por favor, completa todos los campos requeridos. O verifique tu email.', campo: 'general' }];
      return;
    }
  
    // Obtener los valores del formulario
    const contactForm = this.form!.value;
    let request: Observable<Contact>;
  
    // Determinar si es una actualización o creación
    if (this.contact) {
      request = this.contactService.update(this.contact.id, contactForm);
    } else {
      request = this.contactService.create(contactForm);
    }
  
    // Realizar la solicitud
    request.subscribe({
      next: () => {
        this.errors = []; // Limpiar errores si la solicitud es exitosa
        this.router.navigate(['/']); // Navegar a la lista de contactos
      },
      error: (response) =>{
        // Manejar errores de la API
        if (response.status === 400 && response.error.errores) {
          // Asignar los errores específicos de la API
          this.errors = response.error.errores;
        } else {
          // Mostrar un mensaje genérico solo si no hay errores específicos
          this.errors = [{ mensaje: 'Ocurrió un error inesperado. Inténtalo de nuevo.', campo: 'general' }];
        }
      }
    });
  }
}