import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: '[app-usuario-plistrow-admin-unrouted]',
  templateUrl: './usuario-plistrow-admin-unrouted.component.html',
  styleUrls: ['./usuario-plistrow-admin-unrouted.component.css']
})

export class UsuarioPlistRowAdminUnroutedComponent implements OnInit {

  @Input() oUsuario: IUsuario = null;  
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  
  strEntity: string = "usuario";
  strOperation: string = "plist";

  constructor(
    public oIconService: IconService
  ) { }

  ngOnInit() {
  }
  onSelection(id: number) {
    this.selection.emit(id);
  }
  flipValidateUser(id:number){
    //console.log("todo: flip validate user " + id);
  }
  flipActivateUser(id:number){
    //console.log("todo: flip activate user " + id);
  }

}
