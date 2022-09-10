import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-cdetail-unrouted',
  templateUrl: './usuario-cdetail-unrouted.component.html',
  styleUrls: ['./usuario-cdetail-unrouted.component.css']
})
export class UsuarioCDetailUnroutedComponent implements OnInit {

  @Input() id: number = null;  
  
  oUsuario: IUsuario;

  strEntity: string = "usuario"
  strOperation: string = "view"
  strTitleSingular:string= "usuario"

  constructor(
    private oUsuarioService: UsuarioService,
    public oIconService: IconService
  ) {
    
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne = () => {
    this.oUsuarioService
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oUsuario = oData;
      });
  };

}
