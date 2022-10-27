import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraService } from 'src/app/service/compra.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { MetadataService } from 'src/app/service/metadata.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { Constants } from 'src/app/model/constants';

@Component({
  selector: 'app-compra-remove-admin-routed',
  templateUrl: './compra-remove-admin-routed.component.html',
  styleUrls: ['./compra-remove-admin-routed.component.css']
})
export class CompraRemoveAdminRoutedComponent implements OnInit {

  strEntity: string = Constants.ENTITIES.purchase
  strOperation: string = Constants.OPERATIONS.remove
  id: number = 0;
  oUserSession: IUsuario;

  constructor(
    private oCompraService: CompraService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    public oMetadataService: MetadataService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    this.id = this.oActivatedRoute.snapshot.params.id
  }

  ngOnInit(): void { }

  removeOne() {
    this.oCompraService.removeOne(this.id).subscribe((id: number) => {
      let strResult: string = '';
      if (id) {
        strResult = this.oMetadataService.getName('the' + this.strEntity) + " con id = " + this.id + " se ha eliminado.";
      } else {
        strResult = 'Error en el borrado de ' + this.oMetadataService.getName('the' + this.strEntity).toLowerCase();
      }
      this.openPopup(strResult);
    })
  }

  goBack() {
    this.oLocation.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<string> = new Subject<string>();

  openPopup(str: string): void {
    this.eventsSubjectShowPopup.next(str);
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/plist']);
  }

}
