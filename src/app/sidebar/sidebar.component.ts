import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActiveCryptoService } from '../active-crypto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentCrypto!: string;
  subscription!: Subscription;
  searchText!: string;
  cryptoData: any = [];
  filteredData: any[] = [];

  constructor(private data: DataService, private crypto: ActiveCryptoService) {}

  ngOnInit(): void {
    this.subscription = this.crypto.currentCrypto.subscribe(
      (data) => (this.currentCrypto = data)
    );
    this.data.getCrypto().subscribe((data) => {
      this.cryptoData = data;
      this.filteredData = this.cryptoData.coins;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newCrypto(crypto: string) {
    this.crypto.changeCrypto(crypto);
  }

  onKey(event: any) {
    const inputValue = event.target.value;
    this.filteredData = this.handleSearch(this.cryptoData.coins, inputValue);
  }

  handleSearch = (arr: any[], searchInput: string) => {
    return arr.filter((value) => {
      const searchStr = searchInput.toLowerCase();
      const nameMatches = value.id.toLowerCase().includes(searchStr);
      const daysMatches = value.name.toString().includes(searchStr);

      return nameMatches || daysMatches;
    });
  };
}
