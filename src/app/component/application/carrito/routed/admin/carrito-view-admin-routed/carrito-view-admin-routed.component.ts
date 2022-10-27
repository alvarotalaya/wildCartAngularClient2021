import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from 'src/app/service/metadata.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { Constants } from 'src/app/model/constants';
@Component({
  selector: 'app-carrito-view-admin-routed',
  templateUrl: './carrito-view-admin-routed.component.html',
  styleUrls: ['./carrito-view-admin-routed.component.css']
})

export class CarritoViewAdminRoutedComponent implements OnInit {

  strEntity: string = Constants.ENTITIES.cart;
  strOperation: string = Constants.OPERATIONS.view;
  id: number = null;  
  oUserSession: IUsuario;

  constructor(

    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
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

  ngOnInit() { }

}