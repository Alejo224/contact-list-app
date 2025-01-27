import { Contact } from './../interfaces/contact.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export default class ContactFormComponent implements OnInit{

  //injectar un formBuilder
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  //navegar hacia la lista de contacto 
  private router = inject(Router);
  //dependencia
  private route = inject(ActivatedRoute);

  //formulario .controlamos nuestro controles tipo opciona
  form?: FormGroup;

  //atributo para hacer dinamico el texto
  contact?: Contact;

  ngOnInit(): void{
    //para poder acceder a los datos que varian que podria ser el id y entre otros
    const id = this.route.snapshot.paramMap.get('id');
    
    //verificarion si existe el id
    if (id){
      this.contactService.get(parseInt(id)).subscribe(contact =>{
        this.contact = contact; //inicializamos el atributo para cambiar el texto
        this.form = this.fb.group({
          name: [contact.name, [Validators.required]],
          email: [contact.email, [Validators.required]],
        });
      })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
      });
    }
    
  }


  //METODO save
  save(){
    // console.log(this.form.value);
    const contactForm = this.form!.value;
    
    //analisis
    if (this.contact){
      this.contactService.update(this.contact.id, contactForm)
      .subscribe(() => {
        this.router.navigate(['/']);
    });  
    } else{
      this.contactService.create(contactForm)
      .subscribe(() => {
        this.router.navigate(['/']);
    });
    }

    
  }

}
