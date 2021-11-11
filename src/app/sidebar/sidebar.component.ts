import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  cryptoData: any = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getCrypto().subscribe(data => {
      this.cryptoData = data;
      console.log(this.cryptoData.coins);
    })
  }

}