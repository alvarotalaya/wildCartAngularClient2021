import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetadataService } from 'src/app/service/metadata.service';
import { Location } from '@angular/common';
import { Constants } from 'src/app/model/constants';

@Component({
  selector: 'app-comment-view-guest-routed',
  templateUrl: './comment-view-guest-routed.component.html',
  styleUrls: ['./comment-view-guest-routed.component.css']
})

export class CommentViewGuestRoutedComponent implements OnInit {

  strProfile: string = Constants.PROFILES.guest;
  strEntity: string = Constants.ENTITIES.product
  strOperation: string = Constants.OPERATIONS.view
  id: number = null;  

  constructor(
    private oActivatedRoute: ActivatedRoute,    
    protected oMetadataService: MetadataService,
    protected oLocation: Location
  ) {    
    this.id = this.oActivatedRoute.snapshot.params.id
  }

  ngOnInit() { }


}