import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { libro } from 'src/app/Models/libro';
import { LibroService } from 'src/app/services/libro.service';
import { DeleteLibroComponent } from '../dialogs/delete-libro/delete-libro.component';
import { EditLibroComponent } from '../dialogs/edit-libro/edit-libro.component';

@Component({
  selector: 'app-list-libros',
  templateUrl: './list-libros.component.html',
  styleUrls: ['./list-libros.component.css']
})
export class ListLibrosComponent implements OnInit {

  dataSource: MatTableDataSource<libro>;
  displayedColumns: string[] = ['titulo', 'ano', 'genero', 'numeroPaginas', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private libroService: LibroService, public dialog: MatDialog, private toastr: ToastrService) {

    this.dataSource = new MatTableDataSource<libro>();
    this.obtenerLibros();
  }

  ngOnInit(): void {
  }

  obtenerLibros() {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {
        console.log("error obteniendo todos los libros", e)
      }
    });
  }

  editarLibro(obj: libro) {
    const dialogRef = this.dialog.open(EditLibroComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const libro = result as libro;
        this.libroService.updateLibro(libro.id!, libro).subscribe({
          next: (data) => {
            this.toastr.success("Exito", String(data));
            this.obtenerLibros();
          },
          error: (e) => {
            if (typeof e.error.errors == 'undefined') this.toastr.error("Error", String(e.error));
            else Object.keys(e.error.errors).forEach(keys => this.toastr.error("Error", e.error.errors[keys].toString()));
          }
        });
      }
    });
  }

  borrarLibro(obj: libro) {
    console.log(obj)
    const dialogRef = this.dialog.open(DeleteLibroComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const libro = obj as libro;
        this.libroService.deleteLibro(libro.id!).subscribe({
          next: (data) => {
            this.toastr.success("Exito", String(data));
            this.obtenerLibros();
          },
          error: (e) => {
            if (typeof e.error.errors == 'undefined') this.toastr.error("Error", String(e.error));
            else Object.keys(e.error.errors).forEach(keys => this.toastr.error("Error", e.error.errors[keys].toString()));
          }
        });
      }
    });
  }

}
