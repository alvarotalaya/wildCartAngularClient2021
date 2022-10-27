import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MetadataService } from 'src/app/service/metadata.service';
import { debounceTime } from 'rxjs/operators';
import { PaginationService } from 'src/app/service/pagination.service';
import { CarritoService } from 'src/app/service/carrito.service';
import { ICarrito, ICarritoPage } from 'src/app/model/carrito-interfaces';
import { IOrder } from 'src/app/model/model-interfaces';
import { Constants } from 'src/app/model/constants';

@Component({
  selector: 'app-carrito-cplist-user-unrouted',
  templateUrl: './carrito-plist-user-unrouted.component.html',
  styleUrls: ['./carrito-plist-user-unrouted.component.css'],
})

export class CarritoPlistUserUnroutedComponent implements OnInit {
  @Input() id_producto: number = null;
  @Input() id_usuario: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Input() id_tipousuario_session: number = null;
  @Output() selection = new EventEmitter<number>();
  @Output() addCarritoEE = new EventEmitter<number>();

  strEntity: string = Constants.ENTITIES.cart;
  strOperation: string = Constants.OPERATIONS.plist;
  aCarritos: ICarrito[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  aPaginationBar: string[];
  nPageSize: number = 10;
  strSortField: string = "";
  strSortDirection: string = "";
  strFilter: string = "";
  strFilteredMessage: string = "";
  subjectFilter = new Subject();
  nTotal: number = 0;

  constructor(
    private oPaginationService: PaginationService,
    private oCarritoService: CarritoService,
    public oMetadataService: MetadataService,
  ) { }

  ngOnInit(): void {
    this.subjectFilter
      .pipe(debounceTime(1000))
      .subscribe(() => this.getPage());
    this.nPage = 1;
    this.getPage();
  }

  getPage = () => {
    this.oCarritoService
      .getPage(this.nPage, this.nPageSize, this.strSortField, this.strSortDirection, this.strFilter, this.id_producto, this.id_usuario)
      .subscribe((oPage: ICarritoPage) => {
        this.strFilteredMessage = this.oMetadataService.getFilterMsg(this.strFilter, 'usuario', this.id_usuario, 'producto', this.id_producto);
        this.aCarritos = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.nTotalPages = oPage.totalPages;
        this.aPaginationBar = this.oPaginationService.pagination(
          this.nTotalPages,
          this.nPage
        );
        if (this.nPage > this.nTotalPages) {
          this.nPage = this.nTotalPages;
          this.getPage();
        }
        this.getTotalCarrito4User();
      });
  };

  onSetPage = (nPage: number) => {
    this.nPage = nPage;
    this.getPage();
    return false;
  }

  onSetRpp(nRpp: number) {
    this.nPageSize = nRpp;
    this.getPage();
  }

  onSetFilter(strFilter: string) {
    this.strFilter = strFilter;
    this.getPage();
  }

  onSetOrder(order: IOrder) {
    this.strSortField = order.sortField;
    this.strSortDirection = order.sortDirection;
    this.getPage();
  }

  onSelection(id: number) {
    this.selection.emit(id);
  }

  onAddCarrito(id_producto: number) {
    this.getPage();
    this.addCarritoEE.emit(id_producto);
  }

  getTotalCarrito4User() {
    this.oCarritoService.getTotalCarrito4User().subscribe((nTotal: number) => {
      this.nTotal = nTotal;
    });
  }
  
}
