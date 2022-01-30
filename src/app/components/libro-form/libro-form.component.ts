import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { libro } from 'src/app/Models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css']
})
export class LibroFormComponent implements OnInit {

  formLibro: FormGroup;

  constructor(private formbuiler: FormBuilder, private libroService: LibroService, private toastr: ToastrService) {
    this.validarFormulario();
  }

  ngOnInit(): void {
  }

  validarFormulario(): void {
    this.formLibro = this.formbuiler.group({
      titulo: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4)]],
      genero: ['', [Validators.required]],
      numeroPaginas: ['', [Validators.required]]
    });
  }


  guardarLibro(obj: any) {
    this.libroService.saveLibro(obj.value as libro).subscribe({
      next: (data) => {
        this.toastr.success("Exito", String(data));
        this.formLibro.reset();
      },
      error: (e) => {
        if (typeof e.error.errors == 'undefined') this.toastr.error("Error", String(e.error));
        else Object.keys(e.error.errors).forEach(keys => this.toastr.error("Error", e.error.errors[keys].toString()));
      }
    });
  }
}
