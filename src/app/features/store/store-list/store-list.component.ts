import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../core/services/store.service';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css'],
})
export class StoreListComponent implements OnInit {
  rewards: any[] = [];

  constructor(private storeService: StoreService) {}

  async ngOnInit() {
    this.rewards = await this.storeService.getRewards();
  }

  async buy(rewardId: string, price: number) {
    const childId = '10366cd3-0066-463b-8936-b713a2fcbe27';
    await this.storeService.purchaseReward(childId, rewardId, price);
    alert('Compra realizada com sucesso!');
  }
}
