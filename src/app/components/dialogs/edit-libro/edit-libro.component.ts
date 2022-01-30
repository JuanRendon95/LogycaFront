import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { libro } from 'src/app/Models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-edit-libro',
  templateUrl: './edit-libro.component.html',
  styleUrls: ['./edit-libro.component.css']
})
export class EditLibroComponent implements OnInit {

  formEditLibro: FormGroup;

  constructor(private formbuiler: FormBuilder, private libroService: LibroService, private toastr: ToastrService, public dialogRef: MatDialogRef<EditLibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: libro) {}

  ngOnInit(): void {
    this.validarFormulario();
    this.formEditLibro.setValue(this.data);
  }

  validarFormulario(): void {
    this.formEditLibro = this.formbuiler.group({
      id:['',''],
      titulo: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4)]],
      genero: ['', [Validators.required]],
      numeroPaginas: ['', [Validators.required]]
    });
  }

  actualizarLibro() {
    this.dialogRef.close(Object.assign(new libro(), this.formEditLibro.value));
  }

}
